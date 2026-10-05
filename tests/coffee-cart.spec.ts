import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
});

test('Adding coffee to the cart', async ({ page }) => {
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await expect(page.getByLabel('Cart page')).toHaveText('cart (2)');
});

test('Total shows the sum of two different drinks', async ({ page }) => {
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="Cappuccino"]').click();
  await expect(page.locator('[data-test="checkout"]')).toHaveText('Total: $29.00');
});

test('Payment form keeps entered Name and Email', async ({ page }) => {
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.getByLabel('Name').fill('Nataly');
  await page.getByLabel('Email').fill('nataly@test.com');
  await expect(page.getByLabel('Name')).toHaveValue('Nataly');
  await expect(page.getByLabel('Email')).toHaveValue('nataly@test.com');
});

test('Successful payment shows a success message', async ({ page }) => {
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.getByLabel('Name').fill('Nataly');
  await page.getByLabel('Email').fill('nataly@test.com');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('.snackbar')).toHaveText(
    'Thanks for your purchase. Please check your email for payment.'
  );
});

test('Cart page lists the added drinks', async ({ page }) => {
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="Cappuccino"]').click();
  await page.getByLabel('Cart page').click();
  await expect(page.locator('.list-item:visible')).toContainText(['Cappuccino', 'Espresso']);

});
