import { test as setup, expect } from '@playwright/test';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { dataPath } from '../_project'

setup('generated game and config', async ({ page }) => {
  await page.clock.install()
  // Perform steps generating data
  await page.goto('http://localhost:4173');
  // Wait for button for 3 seconds
  await page.clock.fastForward('00:03')
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await page.getByRole('button').click();
  // Wait for button for 1 second
  await page.clock.fastForward('00:01')
  // Store it.
  await page.context().storageState({ path: dataPath });
});
