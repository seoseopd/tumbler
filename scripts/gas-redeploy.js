const { spawnSync } = require('node:child_process');

const webAppUrl = process.env.GAS_WEBAPP_URL;
if (!webAppUrl) {
  console.error('.env\uC5D0 \uC6F9\uC571 \uC8FC\uC18C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uBA3C\uC800 npm.cmd run gas:deploy\uB97C \uC2E4\uD589\uD558\uC138\uC694.');
  process.exit(1);
}

const deploymentId = /\/s\/(AKfyc[A-Za-z0-9_-]+)\/exec(?:[?#].*)?$/.exec(webAppUrl)?.[1];
if (!deploymentId) {
  console.error('\uC6F9\uC571\uC744 \uBC14\uAFB8\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4. \uB85C\uADF8\uC778\uC774 \uB9CC\uB8CC\uB410\uC73C\uBA74 npm.cmd run gas:login\uC744 \uB2E4\uC2DC \uD558\uACE0 gas:push\uBD80\uD130 \uB2E4\uC2DC \uD558\uC138\uC694.');
  process.exit(1);
}

const result = spawnSync(`npx --yes @google/clasp@3.4.1 deploy --deploymentId ${deploymentId}`, {
  shell: true,
  encoding: 'utf8',
});
const deployments = [...(result.stdout ?? '').matchAll(/^Deployed (AKfyc[A-Za-z0-9_-]+) @(?:\d+|HEAD)\s*$/gm)];

if (result.status === 0 && deployments.length === 1 && deployments[0][1] === deploymentId) {
  console.log('\uAC19\uC740 \uC6F9\uC571\uC744 \uC0C8 \uBC84\uC804\uC73C\uB85C \uBC14\uAFB8\uC5C8\uC2B5\uB2C8\uB2E4. \uC8FC\uC18C\uB294 \uADF8\uB300\uB85C\uC785\uB2C8\uB2E4.');
} else {
  console.error('\uC6F9\uC571\uC744 \uBC14\uAFB8\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4. \uB85C\uADF8\uC778\uC774 \uB9CC\uB8CC\uB410\uC73C\uBA74 npm.cmd run gas:login\uC744 \uB2E4\uC2DC \uD558\uACE0 gas:push\uBD80\uD130 \uB2E4\uC2DC \uD558\uC138\uC694.');
  process.exitCode = 1;
}