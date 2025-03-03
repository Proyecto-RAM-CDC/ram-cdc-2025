import { expect, Page } from "@playwright/test";
import { createRandom } from "./createRandom";

export async function findAndClickListitemLink(
  page: Page,
  linkText: string,
  beforeURL: string,
  afterURL: string
) {
  await page.waitForURL(beforeURL);

  const link = page
    .getByRole("listitem")
    .filter({ hasText: linkText })
    .getByRole("link");

  // Check if the login link is visible
  await expect(link).toBeVisible({ timeout: 5000, visible: true });

  // Click the login link
  await link.click();

  await page.waitForURL(afterURL);
}

export async function findByTextThenClick(
  page: Page,
  text: string,
  beforeURL: string | RegExp,
  afterURL: string | RegExp | null = null
) {
  await Promise.all([
    page.waitForURL(beforeURL, {
      timeout: 10000,
    }),
    page.waitForLoadState("domcontentloaded"),
    expect(page).toHaveURL(beforeURL, { timeout: 10000 }),
  ]);

  // Find the item to be clicked.
  const item = page.getByText(text, { exact: true });

  // Check if the item is visible
  await expect(item).toBeVisible({ timeout: 5000, visible: true });

  await Promise.all([item.click(), page.waitForLoadState("domcontentloaded")]);

  if (afterURL) {
    await page.waitForURL(afterURL, {
      timeout: 10000,
    });
    page.waitForLoadState("domcontentloaded");
    await expect(page).toHaveURL(afterURL, { timeout: 10000 });
  }
}

export async function findByTextExpectVisible(
  page: Page,
  text: string,
  exact: boolean = true
) {
  // Find the item to be clicked.
  const item = page.getByText(text, { exact: exact });

  // Check if the login link is visible
  await expect(item).toBeVisible({ timeout: 5000, visible: true });
}

export async function enterCorrectLogin(
  page: Page,
  correctEmail: string,
  correctPassword: string,
  beforeURL: string
) {
  const randomData = createRandom();
  await page.waitForURL(beforeURL);
  await page
    .locator('input[name="email"]')
    .pressSequentially(correctEmail, { delay: 100 });
  await page
    .locator('input[name="password"]')
    .pressSequentially(correctPassword, { delay: 100 });
  await page.selectOption('select[name="whichEstado"]', {
    label: randomData.randomState,
  });
  await page.waitForURL(beforeURL);
}
