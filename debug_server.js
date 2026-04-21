import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

try {
  console.log('--- DB TEST ---');
  const dbPath = join(__dirname, 'server', 'db.js');
  console.log('Importing db from:', dbPath);
  // We use dynamic import for ESM
  const { default: db } = await import('./server/db.js');
  console.log('DB loaded successfully');
  
  console.log('--- APP TEST ---');
  const { default: app } = await import('./server/server.js');
  console.log('Server entry imported');
} catch (err) {
  console.error('CRASH ON STARTUP:');
  console.error(err);
  fs.writeFileSync('crash.log', err.stack);
}
