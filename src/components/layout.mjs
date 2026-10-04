import { site } from '../config/site.mjs';

export const button = (label, href, secondary = false) => `<a class="button ${secondary ? 'secondary' : ''}" href="${href}">${label}<span aria-hidden="true">↗</span></a>`;
export const eyebrow = (text) => `<p class="eyebrow">${text}</p>`;

export function layout(content, page = 'home') {
  const title = { home: site.name, program: `Programa | ${site.name}`, about: `Nosotros | ${site.name}`, course: `Investing Foundations | ${site.name}` }[page];
  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="${site.description}"><meta name="theme-color" content="#080808"><title>${title}</title><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/styles.css"></head>
<body><a class="skip-link" href="#main">Saltar al contenido</a>
<header class="header wrap"><a class="brand" href="/" aria-label="${site.name}, inicio"><span class="brand-symbol" aria-hidden="true">↗</span><span>${site.name}</span></a><nav aria-label="Navegación principal"><a href="/programa" ${page === 'program' ? 'aria-current="page"' : ''}>Programa</a><a href="/#metodologia">Metodología</a><a href="/nosotros" ${page === 'about' ? 'aria-current="page"' : ''}>Nosotros</a>${button('Ver programa', '/programa')}</nav></header>
<main id="main">${content}</main>
<footer class="wrap footer"><a class="brand" href="/">${site.name}</a><p>Educación para decidir con criterio.</p><span>Contenido educativo. No es asesoramiento financiero.</span></footer></body></html>`;
}
