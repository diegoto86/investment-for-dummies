import './build.mjs';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';

const routes = new Map([
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/programa', ['programa/index.html', 'text/html; charset=utf-8']],
  ['/nosotros', ['nosotros/index.html', 'text/html; charset=utf-8']],
  ['/images/nosotros.jpg', ['images/nosotros.jpg', 'image/jpeg']],
  ['/cursos/000', ['cursos/000/index.html', 'text/html; charset=utf-8']],
  ['/styles.css', ['styles.css', 'text/css; charset=utf-8']],
  ['/favicon.svg', ['favicon.svg', 'image/svg+xml']],
]);
const port = Number(process.env.PORT || 3000);
createServer(async (request, response) => {
  const path = new URL(request.url, 'http://localhost').pathname.replace(/\/$/, '') || '/';
  const route = routes.get(path);
  if (!route) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Página no encontrada.');
    return;
  }
  try {
    const body = await readFile(`dist/${route[0]}`);
    response.writeHead(200, { 'Content-Type': route[1] });
    response.end(body);
  } catch {
    response.writeHead(500);
    response.end('No se pudo cargar la página.');
  }
}).listen(port, '127.0.0.1', () => console.log(`Preview: http://localhost:${port}`));
