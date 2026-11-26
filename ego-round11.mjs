const task = await taskSpace(0);
const drive = task.page('p2');
await drive.click('text=텀블러 공장 품질관리 데이터베이스', {clickCount: 2, label: 'Open the project spreadsheet'});
console.log(await drive.snapshot());
