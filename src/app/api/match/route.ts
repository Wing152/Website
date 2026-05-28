import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { responses } = await req.json();
    const groqApiKey = process.env.GROQ_API_KEY;

    if (!groqApiKey) {
      // Fallback logic if no API key
      return NextResponse.json({
        recommendedMentorIds: ['marcus-aurelius', 'leonardo-da-vinci', 'marie-curie'],
        reasoning: "Matched based on your pursuit of wisdom and multi-disciplinary interests."
      });
    }

    const prompt = `Analyze these user onboarding responses and recommend exactly 3 mentors from this list: [marcus-aurelius, leonardo-da-vinci, marie-curie, sun-tzu, steve-jobs].
    User Responses: ${JSON.stringify(responses)}
    Return ONLY a JSON object with 'recommendedMentorIds' (array of IDs) and 'reasoning' (string).`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${groqApiKey}`,
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: "json_object" }
      }),
    });

    const data = await response.json();
    const result = JSON.parse(data.choices[0].message.content);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Matching error:', error);
    return NextResponse.json({
      recommendedMentorIds: ['marcus-aurelius', 'leonardo-da-vinci', 'marie-curie'],
      reasoning: "Default match due to system analysis delay."
    });
  }
}
