const task = await taskSpace(0);
const app = task.page('p1');
console.log(await app.snapshot({scope:'full_page'}));
