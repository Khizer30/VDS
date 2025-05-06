import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseURL: string = process.env.NEXT_PUBLIC_SUPBASE_URL!;
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_KEY!;

const supabase: SupabaseClient = createClient(supabaseURL, supabaseKey);
const auth = supabase.auth;

export { supabase, auth };