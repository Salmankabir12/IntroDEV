import { readFileSync, writeFileSync, existsSync } from 'fs';

const path = 'dist/server/wrangler.json';

if (existsSync(path)) {
  const config = JSON.parse(readFileSync(path, 'utf8'));
  delete config.assets;
  if (config.bindings) {
    config.bindings = config.bindings.filter(b => b.name !== 'ASSETS');
  }
  writeFileSync(path, JSON.stringify(config, null, 2));
  console.log('Fixed wrangler.json - removed ASSETS binding');
  console.log('Current config:', JSON.stringify(config, null, 2));
}
