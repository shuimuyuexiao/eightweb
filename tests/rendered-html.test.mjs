import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the MEDIA CRAFT homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /MEDIA CRAFT/);
  assert.match(html, /Ideas made visible/);
  assert.match(html, /Creative Strategy/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/);
});

test("renders a localized page", async () => {
  const response = await render("/zh-cn/services");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /把核心创意连接到每一个执行细节/);
  assert.match(html, /品牌策略与定位/);
});
