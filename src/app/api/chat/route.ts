import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { messages, systemPrompt } = await req.json();

    const groqApiKey = process.env.GROQ_API_KEY;

    // If no API key, return a mock streaming response for development
    if (!groqApiKey) {
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          // Extract mentor name from system prompt (rough heuristic for mock)
          const nameMatch = systemPrompt.match(/You are ([^.]+)\./);
          const name = nameMatch ? nameMatch[1] : "Your Mentor";

          const text = `I am ${name}. While my full cognitive link is currently in a simplified state, I am here to guide you with the wisdom I possess. Reflect on your path and tell me, what is the most important question on your mind right now?`;

          const words = text.split(' ');
          for (const word of words) {
            controller.enqueue(encoder.encode(word + ' '));
            await new Promise(r => setTimeout(r, 50));
          }
          controller.close();
        },
      });
      return new NextResponse(stream);
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${groqApiKey}`,
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    return new NextResponse(response.body);
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json({ error: 'Failed to fetch chat completion' }, { status: 500 });
  }
}
