// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://vwavxfqplapjoofwbbrt.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3YXZ4ZnFwbGFwam9vZndiYnJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwMDU5MDUsImV4cCI6MjA1ODU4MTkwNX0.psz7IYvLKGqbFF2LtVq8rKR9GXLkKN07SkmluHk_tZ4";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);