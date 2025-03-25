
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://trwszabbwpuvylmkyumw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyd3N6YWJid3B1dnlsbWt5dW13Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4NjMzMzAsImV4cCI6MjA1ODQzOTMzMH0.BHYDukZLZ4ElULSk8YX6DiDnu0l_GYsvqRfXoLcOO_M";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storage: localStorage
  }
});
