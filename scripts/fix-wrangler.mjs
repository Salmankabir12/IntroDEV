import { readFileSync, writeFileSync, existsSync } from 'fs';

const path = 'dist/server/wrangler.json';

try {
  if (!existsSync(path)) {
    console.log('wrangler.json not found, skipping fix');
    process.exit(0);
  }

  const config = JSON.parse(readFileSync(path, 'utf8'));
  delete config.assets;
  delete config.images;

  if (config.previews) {
    delete config.previews.images;
  }

  if (config.bindings) {
    config.bindings = config.bindings.filter(
      b => b.name !== 'ASSETS' && b.name !== 'IMAGES'
    );
  }

  writeFileSync(path, JSON.stringify(config, null, 2));
  console.log('Fixed wrangler.json - removed ASSETS binding');
} catch (err) {
  console.error('Failed to fix wrangler.json:', err.message);
  process.exit(1);
}
