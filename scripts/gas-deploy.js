const { spawnSync } = require('node:child_process');
const { existsSync, readFileSync, writeFileSync } = require('node:fs');

if (process.env.GAS_WEBAPP_URL) {
  console.log('\uC774\uBBF8 \uC6F9\uC571 \uC8FC\uC18C\uAC00 \uC788\uC2B5\uB2C8\uB2E4. npm.cmd run gas:redeploy\uB97C \uC4F0\uC138\uC694.');
  process.exit(0);
}

const result = spawnSync('npx --yes @google/clasp@3.4.1 deploy', {
  shell: true,
  encoding: 'utf8',
});
const deployments = [...(result.stdout ?? '').matchAll(/^Deployed (AKfyc[A-Za-z0-9_-]+) @(?:\d+|HEAD)\s*$/gm)];

if (result.status !== 0 || deployments.length !== 1) {
  console.error('\uC6F9\uC571 \uBC88\uD638\uB97C \uCC3E\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4. \uB85C\uADF8\uC778\uC774 \uB9CC\uB8CC\uB410\uC73C\uBA74 npm.cmd run gas:login\uC744 \uB2E4\uC2DC \uD558\uC138\uC694.');
  process.exitCode = 1;
} else {
  const envPath = '.env';
  const existing = existsSync(envPath) ? readFileSync(envPath, 'utf8') : '';
  const newline = existing.includes('\r\n') ? '\r\n' : '\n';
  const lines = existing ? existing.split(/\r?\n/) : [];
  if (existing.endsWith('\n')) lines.pop();
  const values = {
    GAS_WEBAPP_URL: `https://script.google.com/macros/s/${deployments[0][1]}/exec`,
    STORAGE_MODE: 'live',
  };
  const seen = new Set();
  const updated = lines.map((line) => {
    const match = /^\s*(GAS_WEBAPP_URL|STORAGE_MODE)\s*=/.exec(line);
    if (!match) return line;
    seen.add(match[1]);
    return `${match[1]}=${values[match[1]]}`;
  });

  for (const [key, value] of Object.entries(values)) {
    if (!seen.has(key)) updated.push(`${key}=${value}`);
  }

  writeFileSync(envPath, `${updated.join(newline)}${newline}`, 'utf8');
  console.log('.env\uC5D0 \uC6F9\uC571 \uC8FC\uC18C\uB97C \uC801\uC5C8\uC2B5\uB2C8\uB2E4.');
  console.log('\uB2E4\uC74C: npm.cmd run gas:open');
}