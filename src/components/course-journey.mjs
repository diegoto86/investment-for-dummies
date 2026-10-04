import { courses } from '../features/courses/courses.mjs';

export function courseNode(course) {
  const active = course.id === '000';
  const tag = course.href ? 'a' : 'div';
  return `<li class="journey-step ${active ? 'active' : ''}"><span class="path-dot" aria-hidden="true"></span><${tag} ${course.href ? `href="${course.href}"` : ''} class="course-node"><div class="node-top"><span class="course-number">${course.id}</span><span class="status">${active ? '<i aria-hidden="true"></i>' : ''}${course.status}</span></div><h2>${course.title}</h2><p>${course.description}</p>${active ? '<span class="node-link">Explorar los fundamentos <span aria-hidden="true">↗</span></span>' : ''}</${tag}></li>`;
}

export const courseJourney = () => `<ol class="journey" aria-label="Ruta de seis cursos">${courses.map(courseNode).join('')}</ol><div class="journey-finish"><p class="eyebrow">LA META DEL RECORRIDO</p><h2>YOUR INVESTMENT SYSTEM</h2><p>Un proceso que puedes repetir.</p></div>`;
export const programPreview = () => `<ol class="program-preview">${courses.map(c => `<li><span>${c.id}</span><h3>${c.title}</h3></li>`).join('')}</ol>`;
