export const openPlayground = async (page): void => {
  await page.goto('http://localhost:4173/');
  // close intro animation
  await page.getByRole('button').click();
}
