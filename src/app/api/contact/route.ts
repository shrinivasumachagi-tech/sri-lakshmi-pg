import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { sanitizeInput } from '@/lib/utils';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (message.length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters' },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin.from('contact_requests').insert([
      {
        name: sanitizeInput(name),
        email: sanitizeInput(email),
        message: sanitizeInput(message),
      },
    ]);

    if (error) {
      console.error('Contact insert error:', error);
      return NextResponse.json(
        { error: 'Database error: ' + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('Contact API error:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
