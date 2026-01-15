
import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load env vars
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function importPrenoms() {
  const filePath = path.join(process.cwd(), 'lib/data/prenoms.csv');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const lines = fileContent.split('\n');

  console.log(`📂 Found ${lines.length} lines. Starting parsing...`);

  let currentNames: string[] = [];
  let insertedCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line.length < 2 || line.startsWith('"Name') || line === '"A"' || line === '"B"' || /^[A-Z]$/.test(line.replace(/"/g, ''))) continue;

    // Remove quotes
    const cleanLine = line.replace(/"/g, '');

    // Check if line is just a continuation of names (ends with comma)
    if (cleanLine.endsWith(',')) {
      const parts = cleanLine.split(',').map(s => s.trim()).filter(s => s);
      currentNames.push(...parts);
    } else {
      // This line likely contains the metadata (Origin, Meaning, Spiritual)
      // It might look like: "Aron, Arran                  Hebrew                 Light Bringer      Radiating God's Light"
      
      // Strategy: Split by multiple spaces
      const parts = cleanLine.split(/\s{2,}/);
      
      if (parts.length >= 2) {
        // Last part is likely Spiritual
        // Second to last is Meaning
        // Third to last is Origin
        // The rest at the start are names
        
        let namesPart = parts[0];
        let origin = parts.length > 1 ? parts[1] : "Unknown";
        let meaning = parts.length > 2 ? parts[2] : "";
        let spiritual = parts.length > 3 ? parts[3] : "";

        // If namesPart has commas, split it
        const lineNames = namesPart.split(',').map(s => s.trim()).filter(s => s);
        currentNames.push(...lineNames);

        // Now we have a full block: names + metadata
        // Insert each name with this metadata
        const records = currentNames.map(name => ({
          name: name,
          origin: origin,
          meaning: meaning,
          spiritual: spiritual
        }));

        const { error } = await supabase.from('prenoms').insert(records);
        
        if (error) {
          console.error(`❌ Error inserting ${currentNames.join(', ')}:`, error.message);
        } else {
          insertedCount += records.length;
          process.stdout.write(`\r✅ Inserted ${insertedCount} names...`);
        }

        // Reset for next block
        currentNames = [];
      } else {
        // Fallback: just names?
        const parts = cleanLine.split(',').map(s => s.trim()).filter(s => s);
        currentNames.push(...parts);
      }
    }
  }

  console.log(`\n✨ Finished! Total names inserted: ${insertedCount}`);
}

importPrenoms().catch(console.error);
