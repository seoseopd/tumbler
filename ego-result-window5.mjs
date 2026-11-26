const task = await claimTaskSpace(0);
const tabs = await task.tabs();
console.log('tabs', tabs);
const sheetInfo = tabs.find(x => x.title.includes('Google Sheets'));
const appInfo = tabs.find(x => x.title.includes('텀블러 공장 제조품질관리'));
if (sheetInfo) {
  const sheet = task.page(sheetInfo.label);
  await sheet.click('text=gemini_results', {label:'Show results sheet'});
}
if (appInfo) {
  const app = task.page(appInfo.label);
  console.log('app', await app.snapshot({scope:'full_page'}));
}
await task.handOff();
