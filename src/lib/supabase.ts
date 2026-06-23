import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ─── Database Types ────────────────────────────────────────────────────────────

export interface UserProfile {
  id: string
  email: string
  display_name: string | null
  avatar_url: string | null
  created_at: string
}

export interface Planet {
  id: string
  user_id: string
  name: string
  category: string
  color: string
  health_score: number
  streak_days: number
  total_days_active: number
  created_at: string
  last_active_at: string | null
}

export interface DailyLog {
  id: string
  planet_id: string
  user_id: string
  note: string | null
  minutes_spent: number
  created_at: string
}

export type Database = {
  public: {
    Tables: {
      profiles: { Row: UserProfile }
      planets: { Row: Planet }
      daily_logs: { Row: DailyLog }
    }
  }
}
