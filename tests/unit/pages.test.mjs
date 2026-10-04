import test from 'node:test';
import assert from 'node:assert/strict';
import { homePage, programPage, foundationsPage, aboutPage } from '../../src/app/pages.mjs';

const pages = new Map([['/', homePage()], ['/programa', programPage()], ['/cursos/000', foundationsPage()], ['/nosotros', aboutPage()]]);
test('every internal navigation target resolves to a page or an existing section', () => {
  for (const [route, html] of pages) {
    for (const [, href] of html.matchAll(/href="([^"\s]+)"/g)) {
      if (href === '/styles.css' || href === '/favicon.svg') continue;
      const url = new URL(href, `https://example.test${route}`);
      assert.ok(pages.has(url.pathname), `Broken route ${href} on ${route}`);
      if (url.hash) assert.ok(pages.get(url.pathname).includes(`id="${url.hash.slice(1)}"`), `Missing section ${href}`);
    }
  }
});
test('program displays six course nodes, with only the first linking to a course', () => {
  const html = pages.get('/programa');
  assert.equal([...html.matchAll(/class="journey-step /g)].length, 6);
  assert.equal([...html.matchAll(/class="course-node"/g)].length, 6);
  assert.equal([...html.matchAll(/Próximamente/g)].length, 5);
  assert.ok(html.includes('En desarrollo'));
  assert.ok(!html.includes('href="/cursos/101"'));
});
