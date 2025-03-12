import { test, expect } from '@playwright/test';
import '../envConfig.ts'

test('Landing Page and Login Form test', async ({ page }) => {
  // LoginUrl
  const loginUrl = process.env.NEXT_PUBLIC_CLIENT_URL
  if (!loginUrl){
    throw new Error('NEXT_PUBLIC_CLIENT_URL is not defined')
  }

  // Navigate to the login page
  await page.goto(loginUrl);

  // Check if login form exists
  await expect(page.locator('[data-testid="login-form"]')).toBeVisible();

  // Fill in the username and password fields
  const username = process.env.NEXT_PUBLIC_TEST_USER
  const password = process.env.NEXT_PUBLIC_TEST_PASS
  if ((!username)||(!password)){
    throw new Error('Username or Password is not defined')
  }
  await page.fill('input[name="username"]', username);
  await page.fill('input[name="password"]', password);

  // Click the login button
  await page.click('button[type="submit"]');
});