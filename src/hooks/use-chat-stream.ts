import { useState } from 'react';

export function useChatStream() {
  const [isTyping, setIsTyping] = useState(false);

  const streamCompletion = async (
    messages: { role: string; content: string }[],
    systemPrompt: string,
    onChunk: (chunk: string) => void
  ) => {
    setIsTyping(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages, systemPrompt }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to fetch completion');
      }

      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let leftover = '';

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value, { stream: !done });
        const combined = leftover + chunkValue;

        const lines = combined.split('\n');
        leftover = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed) continue;

          if (trimmed.startsWith('data:')) {
            const dataStr = trimmed.replace(/^data:\s*/, '');
            if (dataStr === '[DONE]') continue;

            try {
              const data = JSON.parse(dataStr);
              const content = data.choices?.[0]?.delta?.content || '';
              if (content) onChunk(content);
            } catch (e) {
              // If it fails to parse, it might be a partial JSON despite being a full line?
              // Unusual for SSE but we'll prepend it back to leftover
              leftover = line + '\n' + leftover;
            }
          } else {
            // Non-SSE response (like mock or error)
            // Only stream if we're sure it's not partial SSE
            if (!combined.includes('data:')) {
               onChunk(line + '\n');
            }
          }
        }
      }

      // Handle remaining leftover if it's not SSE
      if (leftover && !leftover.includes('data:')) {
        onChunk(leftover);
      }

    } catch (error: any) {
      console.error('Streaming error:', error);
      onChunk(`\n\n*Error: ${error.message || 'Failed to connect to the wisdom server.'}*`);
    } finally {
      setIsTyping(false);
    }
  };

  return { streamCompletion, isTyping };
}
