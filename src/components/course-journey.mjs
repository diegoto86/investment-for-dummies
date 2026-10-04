import { courses } from '../features/courses/courses.mjs';

export function courseNode(course) {
  const active = course.id === '000';
  const tag = course.href ? 'a' : 'div';
  return `<li class="journey-step ${active ? 'active' : ''}"><span class="path-dot" aria-hidden="true"></span><${tag} ${course.href ? `href="${course.href}"` : ''} class="course-node"><div class="node-top"><span class="course-number">${course.id}</span><span class="status">${active ? '<i aria-hidden="true"></i>' : ''}${course.status}</span></div><h2>${course.title}</h2><p>${course.description}</p>${active ? '<span class="node-link">Explorar los fundamentos <span aria-hidden="true">↗</span></span>' : ''}</${tag}></li>`;
}

const crown = `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="m8 14 9 8 7-13 7 13 9-8-4 21H12L8 14Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M14 40h20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;
export const courseJourney = () => `<ol class="journey" aria-label="Ruta de seis cursos">${courses.map(courseNode).join('')}</ol><div class="journey-finish"><div class="finish-icon">${crown}</div><p class="eyebrow">LA META DEL RECORRIDO</p><h2>Certified</h2><p>Seis etapas. Un sistema de inversión propio.</p></div>`;
export const programPreview = () => `<ol class="program-preview">${courses.map(c => `<li><span>${c.id}</span><h3>${c.previewTitle}</h3></li>`).join('')}</ol>`;
