import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ybhjakbugzwggilllges.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InliaGpha2J1Z3p3Z2dpbGxsZ2VzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzNDc1NzcsImV4cCI6MjA4ODkyMzU3N30.EtSzriSAf7Wt8PRF6HVhr_QNzzrVv6OnykNZYepK6V8";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});