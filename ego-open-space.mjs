const task = await claimTaskSpace(0);
const tabs = await task.tabs();
const page = tabs.length ? await task.adopt(tabs[0].page) : null;
console.log({ taskSpaceId: task.spaceId, tabs, page: page?.label });
