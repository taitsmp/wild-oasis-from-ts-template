import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jzptqqkrumyqqdyctwjx.supabase.co';

if (!process.env.SUPABASE_KEY) {
  throw new Error('SUPABASE_KEY environment variable is not defined');
}

const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
