import { createClient } from '@supabase/supabase-js'
import { Database } from './types'

const supabase = createClient<Database>(
    'https://mllifwgowjoivrxplnbq.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sbGlmd2dvd2pvaXZyeHBsbmJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY4MjcyMTMsImV4cCI6MjA0MjQwMzIxM30.wDaUIGxpaMiS-UAfwo0_qaf9UdaghqXeF3v9C2ggeiA'
)

export { supabase }
