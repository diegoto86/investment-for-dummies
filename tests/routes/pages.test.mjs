import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';

const routes = ['/', '/programa', '/nosotros', '/cursos/000'];
const fileFor = route => `dist/${route === '/' ? '' : `${route.slice(1)}/`}index.html`;
test('all existing route files retain navigation, semantics and working destinations', async () => {
  const pages = new Map(await Promise.all(routes.map(async route => [route, await readFile(fileFor(route),'utf8')])));
  for (const [route, html] of pages) {
    assert.equal([...html.matchAll(/<h1(?:\s|>)/g)].length, 1, route);
    assert.ok(html.includes('Saltar al contenido'));
    assert.ok(html.includes('id="main"'));
    assert.ok(html.includes('Contenido educativo. No es asesoramiento financiero.'));
    assert.ok(!html.includes('<astro-island'), `Marketing hydrates on ${route}`);
    for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
      const url = new URL(href, `https://example.test${route}`);
      if (url.pathname.startsWith('/_astro/') || url.pathname === '/favicon.svg') { await access(`dist${url.pathname}`); continue; }
      assert.ok(pages.has(url.pathname), `Broken route ${href} on ${route}`);
      if (url.hash) assert.ok(pages.get(url.pathname).includes(`id="${url.hash.slice(1)}"`));
    }
  }
});
test('program keeps six course nodes and one course link', async () => {
  const html = await readFile(fileFor('/programa'),'utf8');
  assert.equal([...html.matchAll(/class="journey-step/g)].length, 6);
  assert.equal([...html.matchAll(/Próximamente/g)].length, 5);
  assert.ok(html.includes('En desarrollo'));
  assert.ok(!html.includes('href="/cursos/101"'));
});
test('normal production output excludes the internal fixture', async () => {
  if (process.env.INCLUDE_INTERNAL_FIXTURES === 'true') return;
  await assert.rejects(access('dist/cursos/000/lecciones/fixture-interna/index.html'));
});
