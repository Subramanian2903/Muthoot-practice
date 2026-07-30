import { test, expect } from '../utils/basetest.js';

test('Login Failure screenshot', async ({ loginPage, invalidCredentials }) => {
  const success = await loginPage.login(invalidCredentials.username, invalidCredentials.password);
  expect(success).toBe(false);

  const fs = await import('fs');
  const screenshots = fs.readdirSync('screenshots').filter(file => file.startsWith('LoginFailure_'));
  expect(screenshots.length).toBeGreaterThan(0);
});