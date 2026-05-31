import { NextResponse } from 'next/server';
import { pgKnowledgeBase } from '@/data/knowledge-base';

const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

function buildSystemPrompt(): string {
  const kb = pgKnowledgeBase;

  return `You are the AI assistant for Sri Lakshmi Ladies PG, located in Davangere, Karnataka, India. You ONLY answer questions related to this PG accommodation. If a user asks anything unrelated, politely redirect them back to PG-related topics.

RULES:
- Detect the user's language automatically.
- If the user writes in Kannada, respond entirely in Kannada.
- If the user writes in English, respond entirely in English.
- Never fabricate information. Only use the data provided below.
- Keep answers concise and helpful (2-4 sentences max unless asked for details).
- If you don't know something specific (like exact rent amounts), say "Please contact us at +91 98441 27319 for current pricing."
- Be warm, friendly, and professional.

KNOWLEDGE BASE:

ABOUT:
- Name: ${kb.about.name}
- Location: ${kb.about.location}
- Type: ${kb.about.type}
- Description: ${kb.about.description}
- Mission: ${kb.about.mission}
- Years of Trust: ${kb.about.yearsOfTrust}

ROOM TYPES:
${kb.roomTypes.map((r) => `- ${r.type} (${r.label}): ${r.description}`).join('\n')}

RENT & PAYMENT:
- Rent varies by room type and duration. Contact for current pricing.
- Payment Basis: ${kb.rent.paymentBasis}
- Payment Due: ${kb.rent.paymentDue}
- Accepted Methods: ${kb.rent.paymentMethods.join(', ')}

FOOD:
- Type: ${kb.food.type}
- Meals per day: ${kb.food.mealsPerDay}
${kb.food.meals.map((m) => `  - ${m.name}: ${m.description}`).join('\n')}
- Special diets: ${kb.food.specialDiet}

FACILITIES:
${kb.facilities.map((f) => `- ${f}`).join('\n')}

HOUSE RULES:
- Check-in: ${kb.houseRules.checkIn}
- Check-out: ${kb.houseRules.checkOut}
- Visitor Hours: ${kb.houseRules.visitorHours}
- Visitor Policy: ${kb.houseRules.visitorPolicy}
- Gate Closing Time: ${kb.houseRules.gateClosingTime}
- Late Entry: ${kb.houseRules.lateEntry}

CONTACT:
- Address: ${kb.contact.address}
- Phone: ${kb.contact.phone1}, ${kb.contact.phone2}
- WhatsApp: ${kb.contact.whatsapp}
- Email: ${kb.contact.email}
- Visiting Hours: ${kb.contact.visitingHours}

ADMISSION PROCESS:
${kb.admissionProcess.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}
- Documents needed: ${kb.admissionProcess.documents.join(', ')}
- Accepted formats: ${kb.admissionProcess.acceptedFormats}
- Note: ${kb.admissionProcess.note}

STAY DURATIONS: ${kb.stayDurations.join(', ')}`;
}

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Messages array is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Gemini API key not configured' }, { status: 500 });
    }

    const contents = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: buildSystemPrompt() }],
        },
        contents,
        generationConfig: {
          temperature: 0.7,
          topP: 0.9,
          topK: 40,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('[Chat API] Gemini error:', err);
      return NextResponse.json({ error: 'Failed to get response from AI' }, { status: 502 });
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return NextResponse.json({ error: 'Empty response from AI' }, { status: 502 });
    }

    return NextResponse.json({ reply: text });
  } catch (e) {
    console.error('[Chat API] Error:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
