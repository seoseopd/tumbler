const task = await taskSpace(0);
const sheet = task.page('p3');
await sheet.goto('https://docs.google.com/spreadsheets/d/1pdU2012iAD036nsHXF3uF7Ktve9tLJb6uABQ-dtZCTw/edit?gid=634976961#gid=634976961');
console.log('SHEET', await sheet.snapshot());
const app = task.page('p1');
await app.goto('http://127.0.0.1:4185/inspections/INSP-20261126-4a2b669d?tab=2');
console.log('APP', await app.snapshot());
await task.finish({keep:['p1','p3']});
