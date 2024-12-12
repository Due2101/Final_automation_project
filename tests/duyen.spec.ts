import { test, expect } from '@playwright/test';


test('quilter', async ({ page }) => {
  await page.goto('https://dev.quilter.com/?Region=singapore&Role=adv');

  // Click the get started link.
  await page.locator('label[for ="compliant-check"]').click();
})