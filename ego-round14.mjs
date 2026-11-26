const task = await taskSpace(0);
const sheet = task.page('p3');
await sheet.click('text=gemini_results', {label: 'Open gemini_results sheet'});
console.log('SHEET', await sheet.snapshot());
const app = task.page('p1');
await app.goto('http://127.0.0.1:4185/');
await app.click('text=사진 등록', {label: 'Open photo registration form'});
console.log('REG', await app.snapshot());
