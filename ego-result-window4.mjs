const task = await taskSpace(0);
const sheet = task.page('p3');
await sheet.click('text=gemini_results', {label: 'Show gemini_results data'});
console.log('selected sheet tab');
const app=task.page('p1');
console.log(await app.snapshot({scope:'full_page'}));
