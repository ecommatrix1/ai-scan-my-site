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

test('site scan works correctly', async ({ page }) => {
  const consoleErrors: string[] = [];
  const failedRequests: string[] = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', error => {
    consoleErrors.push(error.message);
  });

  page.on('requestfailed', request => {
    failedRequests.push(request.url() + ' ' + request.failure()?.errorText);
  });

  page.on('response', response => {
    if (response.status() >= 400) {
      failedRequests.push(response.url() + ' ' + response.status());
    }
  });

  await page.goto('/');

  // Get the input field
  const input = page.getByPlaceholder('Enter your website URL (e.g. example.com)');

  // Enter the URL
  await input.fill('https://example.com');

  // Get the submit button
  const submitButton = page.getByRole('button', { name: /Run AI Scan/i });

  // Click submit
  await submitButton.click();

  // Assert loading state triggers
  await expect(page.getByRole('button', { name: /Analyzing Site.../i })).toBeVisible();

  // Wait for the scan results dashboard to appear
  await expect(page.getByText('AI Audit Executive Summary')).toBeVisible({ timeout: 10000 });

  // Verify the score cards exist (performance, seo, etc)
  await expect(page.getByText('performance', { exact: true })).toBeVisible();
  await expect(page.getByText('seo', { exact: true })).toBeVisible();

  // Verify recommendations render
  await expect(page.getByText('Recommended Fixes & AI Code Solutions')).toBeVisible();

  // Ensure no console errors or failed API requests occurred during the process
  expect(consoleErrors).toEqual([]);
  expect(failedRequests).toEqual([]);
});
