const { spawnSync } = require('node:child_process');

const webAppUrl = process.env.GAS_WEBAPP_URL;
if (!webAppUrl) {
  console.error('.env\uC5D0 \uC6F9\uC571 \uC8FC\uC18C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uBA3C\uC800 npm.cmd run gas:deploy\uB97C \uC2E4\uD589\uD558\uC138\uC694.');
  process.exit(1);
}

const deploymentId = /^https:\/\/script\.google\.com\/macros\/s\/(AKfyc[A-Za-z0-9_-]+)\/exec(?:\?.*)?$/.exec(webAppUrl)?.[1];
if (!deploymentId) {
  console.error('\uAD6C\uAE00 \uAD8C\uD55C \uC2B9\uC778 \uCC3D\uC744 \uC5F4\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.');
  process.exit(1);
}

const url = `https://script.google.com/macros/s/${deploymentId}/exec?authuser=0`;
let result;
if (process.platform === 'win32') {
  result = spawnSync('cmd.exe', ['/d', '/s', '/c', `start "" "${url}"`], {
    windowsVerbatimArguments: true,
    stdio: 'ignore',
  });
} else {
  result = spawnSync(process.platform === 'darwin' ? 'open' : 'xdg-open', [url], { stdio: 'ignore' });
}

if (result.error || result.status !== 0) {
  console.error('\uAD6C\uAE00 \uAD8C\uD55C \uC2B9\uC778 \uCC3D\uC744 \uC5F4\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.');
  process.exitCode = 1;
}