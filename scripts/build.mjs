import { mkdir, writeFile, copyFile } from 'node:fs/promises';
import { homePage, programPage, foundationsPage, aboutPage } from '../src/app/pages.mjs';

export async function build() {
  for (const [directory, render] of [['', homePage], ['programa', programPage], ['cursos/000', foundationsPage], ['nosotros', aboutPage]]) {
    await mkdir(`dist/${directory}`, { recursive: true });
    await writeFile(`dist/${directory ? `${directory}/` : ''}index.html`, render());
  }
  await copyFile('src/styles/main.css', 'dist/styles.css');
  await copyFile('public/favicon.svg', 'dist/favicon.svg');
  await mkdir('dist/images', { recursive: true });
  await copyFile('public/images/nosotros.jpg', 'dist/images/nosotros.jpg');
}

await build();
console.log('Built /, /programa, /nosotros and /cursos/000 into dist/.');
