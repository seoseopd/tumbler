const { spawnSync } = require('node:child_process');
const { copyFileSync, mkdirSync } = require('node:fs');
const path = require('node:path');

const sharedSource = path.join(process.cwd(), 'shared', 'gemini-result.js');
const gasDirectory = path.join(process.cwd(), 'gas');
mkdirSync(gasDirectory, { recursive: true });
copyFileSync(sharedSource, path.join(gasDirectory, 'gemini-result.js'));

const result = spawnSync('npx --yes @google/clasp@3.4.1 push --force', {
  shell: true,
  encoding: 'utf8',
});
const output = `${result.stdout ?? ''}${result.stderr ?? ''}`;

if (output.includes('Pushed') || output.includes('Script is already up to date')) {
  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
  console.log('\uADF8\uAE00\uC5D0 \uCF54\uB4DC\uB97C \uC62C\uB838\uC2B5\uB2C8\uB2E4.');
} else if (output.includes('invalid_grant')) {
  console.error('\uAD6C\uAE00 \uB85C\uADF8\uC778\uC774 \uB9CC\uB8CC\uB410\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4. npm.cmd run gas:login\uC744 \uB2E4\uC2DC \uD558\uC138\uC694.');
  process.exitCode = 1;
} else {
  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
  if (result.error) console.error(result.error.message);
  if (result.status === 0) console.error('Google에 코드를 올렸다는 응답이 없습니다.');
  process.exitCode = result.status || 1;
}