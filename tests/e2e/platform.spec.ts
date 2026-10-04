import { test, expect } from '@playwright/test';

const fixture = '/cursos/000/lecciones/fixture-interna';
test('public routes, navigation and course states work', async ({ page }) => {
  for (const route of ['/', '/programa', '/nosotros', '/cursos/000']) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('astro-island')).toHaveCount(0);
    await expect(page.locator('body')).not.toContainText('PRUEBA INTERNA');
  }
  await page.goto('/');
  await page.getByRole('link', { name: 'Ver el programa', exact: true }).click();
  await expect(page).toHaveURL(/\/programa\/?$/);
  await page.getByRole('link', { name: /Explorar los fundamentos/ }).click();
  await expect(page).toHaveURL(/\/cursos\/000\/?$/);
  await page.getByRole('link', { name: 'Volver al programa' }).click();
  await expect(page).toHaveURL(/\/programa\/?$/);
});
test('one React root supports answering, feedback and retry without persistence', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(fixture);
  await expect(page.locator('astro-island')).toHaveCount(1);
  await expect(page.getByRole('radio').first()).toBeEnabled();
  await page.getByLabel('Seguir la primera opinión que encuentre.').check();
  await page.getByRole('button', { name: 'Comprobar respuesta' }).click();
  await expect(page.getByRole('status')).toContainText('Puedes intentarlo de nuevo.');
  await page.getByLabel('Revisar la fuente y el contexto del dato.').check();
  await page.getByRole('button', { name: 'Comprobar respuesta' }).click();
  await expect(page.getByRole('status')).toContainText('Correcto.');
  await page.reload();
  await expect(page.getByRole('radio').first()).not.toBeChecked();
  expect(errors).toEqual([]);
});
test('narrative renders before hydration and controls explain the no-JavaScript state', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(`${baseURL}${fixture}`);
  await expect(page.getByRole('heading', { name: 'Información y decisión' })).toBeVisible();
  await expect(page.locator('noscript p')).toBeVisible();
  await expect(page.locator('noscript p')).toHaveText('La lectura está disponible. Activa JavaScript para responder al quiz.');
  await expect(page.getByRole('radio').first()).toBeDisabled();
  await context.close();
});

test('reserved block identities hydrate safely and preserve accessible heading references', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => {
    if (message.type() === 'error' && /hydrat|server rendered|React error/i.test(message.text())) errors.push(message.text());
  });
  // Change both prerendered markup and serialized props before hydration; repository content stays intact.
  await page.route(`**${fixture}`, async route => {
    const response = await route.fetch();
    const body = (await response.text()).replaceAll('fixture-quiz', 'constructor').replaceAll('fixture-callout', 'main');
    await route.fulfill({ response, body });
  });
  await page.goto(fixture);
  await expect(page.getByRole('radio').first()).toBeEnabled();
  await expect(page.getByRole('button', { name: 'Comprobar respuesta' })).toBeDisabled();
  await expect(page.getByRole('status')).toBeEmpty();
  await expect(page.locator('[id="main"]')).toHaveCount(1);
  const label = await page.locator('.lesson-callout').getAttribute('aria-labelledby');
  expect(label).toBeTruthy();
  expect(label).not.toBe('main');
  expect(await page.locator('.lesson-callout h2').getAttribute('id')).toBe(label);
  await page.getByRole('radio').first().check();
  await page.getByRole('button', { name: 'Comprobar respuesta' }).click();
  await expect(page.getByRole('status')).toContainText('Correcto.');
  await page.getByRole('radio').last().check();
  await expect(page.getByRole('status')).toBeEmpty();
  await page.getByRole('button', { name: 'Comprobar respuesta' }).click();
  await expect(page.getByRole('status')).toContainText('Puedes intentarlo de nuevo.');
  expect(errors).toEqual([]);
});

test('quiz selection, submission and retry work entirely with the keyboard', async ({ page }) => {
  await page.goto(fixture);
  await expect(page.getByRole('radio').first()).toBeEnabled();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Saltar al contenido' })).toBeFocused();
  await page.keyboard.press('Enter');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('radio').first()).toBeFocused();
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('radio').last()).toBeChecked();
  expect(await page.getByRole('radio').last().evaluate(element => getComputedStyle(element).outlineStyle)).toBe('solid');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Comprobar respuesta' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('status')).toContainText('Puedes intentarlo de nuevo.');
  await page.keyboard.press('Shift+Tab');
  await page.keyboard.press('ArrowUp');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  await expect(page.getByRole('status')).toContainText('Correcto.');
});
test('mobile layouts have no horizontal overflow and reduced motion disables the flight', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const route of ['/', '/programa', '/nosotros', '/cursos/000', fixture]) {
    await page.goto(route);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await page.goto('/');
  expect(await page.locator('.method-path').evaluate(element => getComputedStyle(element,'::after').animationName)).toBe('none');
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollSnapType)).toBe('none');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Saltar al contenido' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main$/);
});
