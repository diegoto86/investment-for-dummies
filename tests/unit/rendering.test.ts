import test from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import LessonExperience from '../../src/features/learning/LessonExperience';
import { loadCatalog } from '../../src/features/learning/catalog';
import { lessonSchema } from '../../src/features/learning/schema';

test('valid reserved identities keep answers empty and DOM labels unique', async () => {
  const catalog = await loadCatalog();
  const original = catalog.lessons[0], compiled = catalog.documents[0];
  assert.ok(original && compiled);
  const authored = lessonSchema.parse({ ...original, blocks: original.blocks.map(block => ({
    ...block, id: block.kind === 'quiz' ? 'constructor' : block.kind === 'callout' ? 'main' : block.id,
  })) });
  const document = { ...compiled, blocks: compiled.blocks.map((block, index) => {
    const reference = authored.blocks[index];
    assert.ok(reference);
    return { ...block, id: reference.id };
  }) };
  const html = renderToStaticMarkup(createElement('main', { id: 'main' },
    createElement(LessonExperience, { lesson: document }), createElement(LessonExperience, { lesson: document })));
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length);
  assert.equal(ids.filter(id => id === 'main').length, 1);
  const labels = [...html.matchAll(/aria-labelledby="([^"]+)"/g)].map(match => match[1]);
  assert.equal(labels.length, 6);
  for (const label of labels) assert.ok(ids.includes(label));
  assert.equal([...html.matchAll(/<button[^>]*disabled=""/g)].length, 2);
  assert.ok(!html.includes('checked=""'));
  assert.ok(html.includes('name="constructor"'));
  assert.equal(document.blocks.find(block => block.kind === 'callout')?.id, 'main');
});
