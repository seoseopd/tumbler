const task = await taskSpace(0);
const sheet = task.page('p1');
await sheet.click('text=gemini_results', {label:'Open gemini_results results'});
const app = task.page('p2');
await app.goto('http://127.0.0.1:4185/');
console.log('HOME', await app.snapshot());
await task.handOff();
