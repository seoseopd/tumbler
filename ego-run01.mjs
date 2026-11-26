console.log(await listTaskSpaces());
const spaces = await listTaskSpaces();
const entry = spaces.find(s => s.id === 0);
const task = entry?.ownership === 'user' ? await claimTaskSpace(0) : await taskSpace(0);
console.log('TABS', await task.tabs());
