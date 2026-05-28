import { useState } from 'react';
import { Message } from '@/types';

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

      if (!response.ok) throw new Error('Failed to fetch completion');
      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);

        // Handle SSE data format if it's coming from real Groq API
        if (chunkValue.includes('data: ')) {
          const lines = chunkValue.split('\n');
          for (const line of lines) {
            if (line.startsWith('data: ') && line !== 'data: [DONE]') {
              try {
                const data = JSON.parse(line.slice(6));
                const content = data.choices[0]?.delta?.content || '';
                if (content) onChunk(content);
              } catch (e) {
                console.error('Error parsing SSE', e);
              }
            }
          }
        } else {
          // Plain text chunk for mock
          onChunk(chunkValue);
        }
      }
    } catch (error) {
      console.error('Streaming error:', error);
      onChunk("\n\n*Error: Failed to connect to the wisdom server. Please check your connection.*");
    } finally {
      setIsTyping(false);
    }
  };

  return { streamCompletion, isTyping };
}
