/** @format */
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { db: { schema: 'next_auth' } }
);
const { data, error } = await supabase.from('accounts').select('users (*)');
console.log(data, error);
