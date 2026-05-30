import { supabase } from './client';
import { supabaseAdmin } from './admin';

export async function submitContact(data: { name: string; email: string; message: string }) {
  const { error } = await supabase.from('contact_requests').insert([
    { name: data.name, email: data.email, message: data.message },
  ]);
  return { error };
}

export async function getGalleryImages() {
  const { data, error } = await supabaseAdmin
    .from('gallery_images')
    .select('*')
    .order('sort_order', { ascending: true });
  return { data: data || [], error };
}

export async function getFaqEntries() {
  const { data, error } = await supabaseAdmin
    .from('faq_entries')
    .select('*')
    .order('sort_order', { ascending: true });
  return { data: data || [], error };
}

export async function getAdmissions() {
  const { data, error } = await supabaseAdmin
    .from('applicants')
    .select('*')
    .order('created_at', { ascending: false });
  return { data: data || [], error };
}

export async function deleteAdmission(id: string) {
  const { error } = await supabaseAdmin.from('applicants').delete().eq('id', id);
  return { error };
}

export async function loginAdmin(email: string, password: string) {
  const { data, error } = await supabaseAdmin.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

export async function logoutAdmin() {
  const { error } = await supabaseAdmin.auth.signOut();
  return { error };
}
