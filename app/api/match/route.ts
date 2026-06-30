import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { Answers, MatchResult } from "@/lib/types";

const MATCH_SCHEMA = {
  type: "object",
  properties: {
    matches: {
      type: "array",
      minItems: 12,
      maxItems: 12,
      items: {
        type: "object",
        properties: {
          university: { type: "string" },
          country: { type: "string" },
          course: { type: "string" },
          matchPercent: { type: "number" },
          tuitionPerYearINR: { type: "number" },
          placementPercent: { type: "number" },
          qsRank: { type: "number" },
          reason: { type: "string" },
        },
        required: [
          "university",
          "country",
          "course",
          "matchPercent",
          "tuitionPerYearINR",
          "placementPercent",
          "qsRank",
          "reason",
        ],
        additionalProperties: false,
      },
    },
  },
  required: ["matches"],
  additionalProperties: false,
} as const;

function buildPrompt(answers: Answers): string {
  return `A student is looking for study-abroad university matches. Their profile:
- Current qualification: ${answers.qualification ?? "not specified"}
- English test status: ${answers.ielts ?? "not specified"}
- Field of study: ${answers.field ?? "not specified"}
- Countries open to: ${answers.countries.join(", ") || "any"}
- Annual budget: ₹${answers.budget}L (tuition + living combined)
- Priorities, most important first: ${answers.priorities.join(", ")}
- Planned start: ${answers.timeline ?? "not specified"}

Recommend exactly 12 real universities that fit this profile, ranked by how well they match
(matchPercent, highest first). For each, give the course/program name, approximate annual
tuition in INR, an approximate graduate placement percentage, an approximate QS world ranking,
and a 1-2 sentence reason explaining why it fits this specific student's profile and priorities.`;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY is not configured on the server." },
      { status: 500 }
    );
  }

  let answers: Answers;
  try {
    const body = await req.json();
    answers = body.answers;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const client = new OpenAI({ apiKey });
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  try {
    const completion = await client.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content:
            "You are Ally, a study-abroad matching assistant. Respond only with the requested JSON.",
        },
        { role: "user", content: buildPrompt(answers) },
      ],
      response_format: {
        type: "json_schema",
        json_schema: { name: "university_matches", schema: MATCH_SCHEMA, strict: true },
      },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json({ error: "Empty response from model." }, { status: 502 });
    }

    const parsed = JSON.parse(content) as { matches: MatchResult[] };
    if (!Array.isArray(parsed.matches) || parsed.matches.length !== 12) {
      return NextResponse.json(
        { error: "Model did not return exactly 12 matches." },
        { status: 502 }
      );
    }

    const matches = [...parsed.matches].sort((a, b) => b.matchPercent - a.matchPercent);
    return NextResponse.json({ matches });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error calling OpenAI.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
