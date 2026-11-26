const task = await taskSpace(0);
const drive = task.page('p2');
const result = await drive.getByText('텀블러 공장 품질관리 데이터베이스', { exact: true });
console.log('target', result);
