console.log(await listTaskSpaces());
const task = await takeOverTaskSpace(0);
console.log('tabs', await task.tabs());
const page = task.userPage();
console.log('USER PAGE', page.label);
console.log(await page.snapshot());
