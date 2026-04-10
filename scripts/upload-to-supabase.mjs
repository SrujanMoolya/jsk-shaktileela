/**
 * upload-to-supabase.mjs
 * Signs in as admin, then uploads all images/videos from public/img 
 * to Supabase Storage and updates the database with permanent URLs.
 *
 * Usage:
 *   node scripts/upload-to-supabase.mjs
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync, readdirSync } from 'fs';
import { join, extname, dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '..', '.env') });

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const ANON_KEY    = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASS  = process.env.ADMIN_PASSWORD;

if (!SUPABASE_URL || !ANON_KEY) {
  console.error('❌  Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY in .env');
  process.exit(1);
}
if (!ADMIN_EMAIL || !ADMIN_PASS) {
  console.error('❌  Missing ADMIN_EMAIL or ADMIN_PASSWORD in .env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, ANON_KEY);

const IMG_DIR = join(__dirname, '..', 'public', 'img');
const BUCKET  = 'media';

async function signIn() {
  console.log(`🔑  Signing in as ${ADMIN_EMAIL}...`);
  const { error } = await supabase.auth.signInWithPassword({
    email: ADMIN_EMAIL,
    password: ADMIN_PASS,
  });
  if (error) {
    console.error('❌  Login failed:', error.message);
    process.exit(1);
  }
  console.log('✅  Signed in successfully.\n');
}

async function uploadFile(filename) {
  const filePath = join(IMG_DIR, filename);
  const buffer   = readFileSync(filePath);
  const ext      = extname(filename).toLowerCase().slice(1);
  const contentType = ext === 'mp4' ? 'video/mp4' : 'image/jpeg';

  // Sanitize: spaces → dashes, remove special chars
  const safe = filename.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9._-]/g, '');
  const storagePath = `img/${safe}`;

  process.stdout.write(`⬆️   ${filename.padEnd(50)} `);

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, buffer, { contentType, upsert: true });

  if (error) {
    console.log(`❌  ${error.message}`);
    return null;
  }

  const { data: { publicUrl } } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(storagePath);

  console.log('✅');
  return { localName: filename, publicUrl };
}

async function updateDatabase(urlMap) {
  console.log('\n📦  Updating database records...\n');

  // Build a lookup: localName → publicUrl
  // e.g. "7.jpeg" → "https://...supabase.co/storage/.../img/7.jpeg"
  const lookup = {};
  for (const { localName, publicUrl } of urlMap) {
    lookup[localName] = publicUrl;
  }

  // Characters
  const { data: chars } = await supabase.from('characters').select('id, name, image_url');
  for (const c of chars ?? []) {
    if (!c.image_url) continue;
    const fname  = c.image_url.replace('/img/', '');
    const newUrl = lookup[fname];
    if (newUrl) {
      await supabase.from('characters').update({ image_url: newUrl }).eq('id', c.id);
      console.log(`  🎭  Character  "${c.name}" updated`);
    }
  }

  // Gallery
  const { data: gallery } = await supabase.from('gallery').select('id, label, image_url');
  for (const g of gallery ?? []) {
    if (!g.image_url) continue;
    const fname  = g.image_url.replace('/img/', '');
    const newUrl = lookup[fname];
    if (newUrl) {
      await supabase.from('gallery').update({ image_url: newUrl }).eq('id', g.id);
      console.log(`  🖼️   Gallery   "${g.label}" updated`);
    }
  }

  // Events (photos array + video_link)
  const { data: events } = await supabase.from('events').select('id, name, photos, video_link');
  for (const e of events ?? []) {
    const updates = {};

    if (e.photos?.length) {
      updates.photos = e.photos.map(p => {
        const fname = p.replace('/img/', '');
        return lookup[fname] ?? p;
      });
    }

    if (e.video_link?.startsWith('/img/')) {
      const fname = e.video_link.replace('/img/', '');
      if (lookup[fname]) updates.video_link = lookup[fname];
    }

    if (Object.keys(updates).length) {
      await supabase.from('events').update(updates).eq('id', e.id);
      console.log(`  📅  Event     "${e.name}" updated`);
    }
  }
}

async function main() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  Shakti Leela – Upload images to Supabase');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  await signIn();

  const files   = readdirSync(IMG_DIR);
  const results = [];

  console.log(`📂  Found ${files.length} files in public/img\n`);

  for (const filename of files) {
    const result = await uploadFile(filename);
    if (result) results.push(result);
  }

  await updateDatabase(results);

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`  ✅  ${results.length}/${files.length} files uploaded`);
  console.log(`  🔄  All DB records updated with Supabase URLs`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
}

main().catch(console.error);
