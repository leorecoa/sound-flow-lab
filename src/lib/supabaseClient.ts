import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase URL and Anon Key are required.')
}

// Cria e exporta o cliente Supabase.
// Este cliente pode ser usado tanto no lado do cliente quanto no servidor (em API Routes).
export const supabase = createClient(supabaseUrl, supabaseAnonKey)