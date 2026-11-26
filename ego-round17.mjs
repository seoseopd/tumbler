const task = await taskSpace(0);
const drive = task.page('p2');
console.log(await drive.snapshot({scope:'full_page'}));
