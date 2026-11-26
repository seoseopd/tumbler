const { spawnSync } = require('node:child_process');
const { existsSync, mkdirSync } = require('node:fs');

if (existsSync('.clasp.json')) {
  console.log('\uC774\uBBF8 \uD504\uB85C\uC81D\uD2B8\uAC00 \uC788\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uB9CC\uB4E4\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.');
  process.exit(0);
}

mkdirSync('gas', { recursive: true });
const result = spawnSync(
  'npx --yes @google/clasp@3.4.1 create --type standalone --title tumbler-factory --rootDir gas',
  { shell: true, encoding: 'utf8' },
);

if (result.stdout) process.stdout.write(result.stdout);
if (result.stderr) process.stderr.write(result.stderr);

if (existsSync('.clasp.json')) {
  console.log('\uD504\uB85C\uC81D\uD2B8\uB97C \uB9CC\uB4E4\uC5C8\uC2B5\uB2C8\uB2E4.');
} else {
  if (result.error) console.error(result.error.message);
  process.exitCode = result.status ?? 1;
}