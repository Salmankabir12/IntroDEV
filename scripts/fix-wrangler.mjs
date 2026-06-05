import { unlinkSync, existsSync } from 'fs';
import { join } from 'path';

const path = join('dist', 'server', 'wrangler.json');
const pathAlt = join('dist', '_worker.js', 'wrangler.json');

try {
  for (const p of [path, pathAlt]) {
    if (existsSync(p)) {
      unlinkSync(p);
      console.log(`Deleted ${p} for Pages compatibility`);
    }
  }
} catch (err) {
  console.error('Failed to delete wrangler.json:', err.message);
  process.exit(1);
}
