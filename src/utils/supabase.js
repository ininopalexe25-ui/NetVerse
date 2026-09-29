import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env?.VITE_SUPABASE_URL || 'https://xbefztsnmpzlnrokneva.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_LOvrb6TpVvGFa4Og2YJiNQ_fTxBdnT8';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
