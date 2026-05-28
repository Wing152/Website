import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { responses } = await req.json();
    const groqApiKey = process.env.GROQ_API_KEY;

    if (!groqApiKey) {
      // Improved fallback logic based on onboarding responses
      const { goals = [], interests = [] } = responses;
      const mentorIds = new Set<string>();

      if (interests.includes('Philosophy') || interests.includes('Psychology')) mentorIds.add('marcus-aurelius');
      if (interests.includes('Art & Culture') || interests.includes('History')) mentorIds.add('leonardo-da-vinci');
      if (interests.includes('Technology') || goals.includes('Scientific Understanding')) mentorIds.add('marie-curie');
      if (goals.includes('Strategic Mastery') || goals.includes('Career Growth')) mentorIds.add('sun-tzu');
      if (goals.includes('Wealth Creation') || interests.includes('Economics')) mentorIds.add('steve-jobs');

      // Ensure we have 3
      const allMentors = ['marcus-aurelius', 'leonardo-da-vinci', 'marie-curie', 'sun-tzu', 'steve-jobs'];
      for (const id of allMentors) {
        if (mentorIds.size < 3) mentorIds.add(id);
      }

      const recommendedMentorIds = Array.from(mentorIds).slice(0, 3);

      return NextResponse.json({
        recommendedMentorIds,
        reasoning: "Our analysis suggests these mentors align perfectly with your background in " + interests.join(', ') + " and your goals of " + goals.join(', ') + "."
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
