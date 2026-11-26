const task = await taskSpace(0);
const page = task.page('p1');
console.log('BEFORE', await page.snapshot());
await page.goto('http://127.0.0.1:4185');
console.log('AFTER', await page.snapshot());
