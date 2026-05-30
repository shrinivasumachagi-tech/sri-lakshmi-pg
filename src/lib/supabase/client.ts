import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl) console.error('[Supabase] MISSING NEXT_PUBLIC_SUPABASE_URL');
if (!supabaseKey) console.error('[Supabase] MISSING NEXT_PUBLIC_SUPABASE_ANON_KEY');

console.log('[Supabase] Client initialized with URL:', supabaseUrl ? supabaseUrl.slice(0, 20) + '...' : 'MISSING');

export const supabase = createBrowserClient(supabaseUrl, supabaseKey);
