import test from 'node:test';
import assert from 'node:assert/strict';
import { cp, mkdir, mkdtemp, readFile, writeFile, access, rm } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { spawnSync } from 'node:child_process';

test('catalog changes publish 101, remove an unavailable overview and add a lesson without application changes', async () => {
  const workspace = resolve('.');
  await mkdir('.astro', { recursive: true });
  const directory = await mkdtemp(join(workspace, '.astro', 'availability-'));
  try {
    for (const path of ['src', 'content', 'public', 'package.json', 'tsconfig.json', 'astro.config.mjs'])
      await cp(join(workspace, path), join(directory, path), { recursive: true });
    for (const [id, status] of [['000', 'coming_soon'], ['101', 'in_development']]) {
      const path = join(directory, 'content/courses', id, 'course.json');
      const course = JSON.parse(await readFile(path, 'utf8'));
      await writeFile(path, JSON.stringify({ ...course, status, journeyCta: 'Explorar esta etapa' }));
    }
    const lessonPath = join(directory, 'content/courses/000/lessons');
    const lesson = JSON.parse(await readFile(join(lessonPath, 'fixture.json'), 'utf8'));
    await writeFile(join(lessonPath, 'another.json'), JSON.stringify({ ...lesson, id: 'another-fixture', slug: 'another-fixture', order: 1 }));
    const build = () => spawnSync(process.execPath, [join(workspace, 'node_modules/astro/bin/astro.mjs'), 'build'], {
      cwd: directory, env: { ...process.env, INCLUDE_INTERNAL_FIXTURES: 'true' }, encoding: 'utf8',
    });
    const result = build();
    assert.equal(result.status, 0, result.stdout + result.stderr);
    const program = await readFile(join(directory, 'dist/programa/index.html'), 'utf8');
    const journey = program.match(/<ol class="journey"[\s\S]*?<\/ol>/)?.[0];
    assert.ok(journey);
    assert.ok(journey.includes('href="/cursos/101"'));
    assert.ok(journey.includes('Explorar esta etapa'));
    assert.ok(!journey.includes('href="/cursos/000"'));
    assert.ok(!journey.includes('href="/cursos/501"'));
    await access(join(directory, 'dist/cursos/101/index.html'));
    await assert.rejects(access(join(directory, 'dist/cursos/000/index.html')));
    await assert.rejects(access(join(directory, 'dist/cursos/501/index.html')));
    await access(join(directory, 'dist/cursos/000/lecciones/another-fixture/index.html'));
    await writeFile(join(lessonPath, 'another.json'), JSON.stringify({ ...lesson, id: 'another-fixture', slug: 'another-fixture' }));
    const invalid = build();
    assert.notEqual(invalid.status, 0);
    assert.match(invalid.stdout + invalid.stderr, /duplicate sibling order/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
