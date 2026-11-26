const task = await claimTaskSpace(0);
console.log('tabs', await task.tabs());
