// src/app/lib/supabaseClient.ts

import { createClient } from '@supabase/supabase-js';

// Read variables from environment
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Throw an error if the keys are not loaded
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key must be set in your .env.local file');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);