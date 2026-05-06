import { test, expect } from '@playwright/test';
import { openPlayground } from '../helpers/helpers';

test('see app running', async ({ page }) => {
  await page.goto('http://localhost:4173/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Mijnenveger/);
});

test('access game board', async ({ page }) => {
  await openPlayground(page);

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Playground' })).toBeVisible();
});

test('should touch first cell', async ({ page }) => {
  await openPlayground(page);
  const leftTopButton = page.getByRole('gridcell').first()
  // open cell
  leftTopButton.click()
  await expect(leftTopButton).toHaveClass(/touched/);
  // open cell 2nd time, fails at click
  // leftTopButton.click({ force: true })
  //               ^ Error: locator.click: Test ended.
  // await expect(leftTopButton).toHaveClass(/touched/);
});

test('should flag first cell', async ({ page }) => {
  await openPlayground(page);
  const leftTopButton = page.getByRole('gridcell').first()
  // set flag
  leftTopButton.click({delay: 500})
  await expect(leftTopButton).toHaveClass(/flag/);
  // remove flag
  leftTopButton.click({delay: 500})
  await expect(leftTopButton).not.toHaveClass(/flag/);
});


