import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jzptqqkrumyqqdyctwjx.supabase.co';

const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6cHRxcWtydW15cXFkeWN0d2p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk1ODc2NTEsImV4cCI6MjAwNTE2MzY1MX0.8QSjoow91v-vuDX11PnVNeEwryVTVXhH79elfPrlZg8';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
