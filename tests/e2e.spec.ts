import { test, expect } from '@playwright/test';

test('homepage loads cleanly without console errors', async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', error => {
    consoleErrors.push(error.message);
  });

  await page.goto('/');

  // Expect no console errors
  expect(consoleErrors).toEqual([]);
});
