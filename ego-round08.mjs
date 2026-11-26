const task = await taskSpace(0);
const drive = await task.newPage();
console.log('P2', drive.label);
await drive.goto('https://drive.google.com');
console.log(await drive.snapshot());
