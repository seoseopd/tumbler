const task = await taskSpace(0);
const app = task.page('p1');
await app.goto('http://127.0.0.1:4185/settings');
console.log('SETTINGS', await app.snapshot());
const drive = await task.newPage('p2');
await drive.goto('https://drive.google.com');
console.log('DRIVE', await drive.snapshot());
