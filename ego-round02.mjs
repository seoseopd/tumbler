const task = await taskSpace(0);
console.log('TABS', await task.tabs());
const tabs = await task.tabs();
const page = await task.adopt(tabs[0].page);
console.log('PAGE', page.label, await page.snapshot());
