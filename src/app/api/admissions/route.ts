import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { generateAdmissionId, sanitizeInput } from '@/lib/utils';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      full_name,
      email,
      phone,
      whatsapp,
      dob,
      parent_name,
      parent_phone,
      address,
      college_name,
      course_name,
      room_type,
      stay_duration,
      id_proof_url,
      photo_url,
    } = body;

    if (!full_name || !email || !phone || !whatsapp || !dob || !parent_name || !parent_phone || !address || !college_name || !course_name || !room_type || !stay_duration) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const admissionId = generateAdmissionId();

    const { error } = await supabaseAdmin.from('applicants').insert([
      {
        admission_id: admissionId,
        full_name: sanitizeInput(full_name),
        email: email,
        phone: phone,
        whatsapp: whatsapp,
        date_of_birth: dob,
        parent_name: sanitizeInput(parent_name),
        parent_phone: parent_phone,
        address: sanitizeInput(address),
        college_name: sanitizeInput(college_name),
        course_name: sanitizeInput(course_name),
        room_type: room_type,
        stay_duration: stay_duration,
        id_proof_url: id_proof_url || null,
        photo_url: photo_url || null,
        status: 'pending',
      },
    ]);

    if (error) {
      console.error('[API] Database insert error:', error.message, error.code);
      return NextResponse.json(
        { error: 'Database error: ' + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      id: admissionId,
      message: 'Admission submitted successfully',
    });
  } catch (e) {
    console.error('[API] Admission error:', e);
    const msg = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
