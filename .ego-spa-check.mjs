const task = await taskSpace("Verify internal links switch screens without reload");
const page = task.page("p1");
await page.goto("http://127.0.0.1:4185/");
await page.cdp("Storage.clearDataForOrigin", {
  origin: new URL(await page.url()).origin,
  storageTypes: "cookies",
});
await page.reload();
await page.fill('input[name="username"]', "writer");
await page.fill('input[name="password"]', "writer1234!");
await page.click('button:has-text("로그인")');
await page.waitForTimeout(200);
const initial = await page.evaluate(() => ({ path: location.pathname, title: document.querySelector('#screen-title').textContent }));
await page.click('a[href="/settings"]');
await page.waitForTimeout(150);
const settings = await page.evaluate(() => ({ path: location.pathname, title: document.querySelector('#screen-title').textContent }));
await page.goBack();
await page.waitForTimeout(150);
const back = await page.evaluate(() => ({ path: location.pathname, title: document.querySelector('#screen-title').textContent }));
await page.goForward();
await page.waitForTimeout(150);
const forward = await page.evaluate(() => ({ path: location.pathname, title: document.querySelector('#screen-title').textContent }));
await page.click('a.brand-link');
await page.waitForTimeout(150);
const home = await page.evaluate(() => ({ path: location.pathname, title: document.querySelector('#screen-title').textContent }));
await page.goto("http://127.0.0.1:4185/abc");
await page.waitForTimeout(150);
await page.click('a:has-text("홈으로 가기")');
await page.waitForTimeout(150);
const notFoundHome = await page.evaluate(() => ({ path: location.pathname, title: document.querySelector('#screen-title').textContent }));
console.log({ initial, settings, back, forward, home, notFoundHome, snapshot: await page.snapshot() });
await task.finish({ keep: ["p1"] });