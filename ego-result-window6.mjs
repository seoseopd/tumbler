const task = await taskSpace(0);
const tabs = await task.tabs();
const si = tabs.find(x => x.title.includes('Google Sheets'));
const ai = tabs.find(x => x.title.includes('텀블러 공장 제조품질관리'));
const sheet = si ? await task.adopt(si.page) : null;
const app = ai ? await task.adopt(ai.page) : null;
console.log('labels', sheet?.label, app?.label);
if (sheet) console.log('SHEET', await sheet.snapshot());
if (app) console.log('APP', await app.snapshot());
