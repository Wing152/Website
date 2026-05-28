import { NextRequest, NextResponse } from 'next/server';

// Remove edge runtime to ensure environment variables are handled normally in this sandbox
// export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { messages, systemPrompt } = await req.json();

    const groqApiKey = process.env.GROQ_API_KEY;

    if (!groqApiKey) {
      console.error('GROQ_API_KEY is missing in process.env');
      // Last resort: try to read from .env.local manually if process.env failed
      // (sometimes happens in certain environments if not restarted)
      return NextResponse.json({ error: 'AI configuration missing' }, { status: 500 });
    }

    console.log('Initiating Groq chat completion with model: llama-3.3-70b-versatile');

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${groqApiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Groq API error:', errorData);
      return NextResponse.json({
        error: errorData.error?.message || 'Groq API returned an error'
      }, { status: response.status });
    }

    // Return the stream directly
    return new NextResponse(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error: any) {
    console.error('Chat API Route Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
