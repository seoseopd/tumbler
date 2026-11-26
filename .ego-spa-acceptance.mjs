const task = await takeOverTaskSpace(16);
const page = task.page("p1");
await page.goto("http://127.0.0.1:4185/");
const initialSession = await page.evaluate(async () => {
  const response = await fetch('/api/session');
  return response.json();
});
if (!initialSession.user) {
  await page.fill('input[name="username"]', "writer");
  await page.fill('input[name="password"]', "writer1234!");
  await page.click('button:has-text("로그인")');
  await page.waitForTimeout(250);
}
await page.click('a.brand-link');
const homeBefore = await page.evaluate(() => ({ path: location.pathname, title: document.querySelector('#screen-title').textContent }));
let reloadEvents = 0;
await page.click('a[href="/settings"]');
await page.waitForTimeout(200);
const settings = await page.evaluate(() => ({ path: location.pathname, title: document.querySelector('#screen-title').textContent }));
await page.reload();
await page.waitForTimeout(200);
const settingsAfterReload = await page.evaluate(() => ({ path: location.pathname, title: document.querySelector('#screen-title').textContent }));
await page.click('a.brand-link');
await page.waitForTimeout(100);
await page.click('a[href="/settings"]');
await page.waitForTimeout(100);
await page.keyboard.press("Alt+ArrowLeft");
await page.waitForTimeout(200);
const back = await page.evaluate(() => ({ path: location.pathname, title: document.querySelector('#screen-title').textContent }));
await page.click('a.brand-link');
await page.waitForTimeout(150);
const logoHome = await page.evaluate(() => ({ path: location.pathname, title: document.querySelector('#screen-title').textContent }));
console.log({ homeBefore, settings, settingsAfterReload, back, logoHome, snapshot: await page.snapshot() });
await task.finish({ keep: ["p1"] });