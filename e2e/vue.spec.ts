import { test, expect } from "@playwright/test";

test("detects outlier value from comma separated input", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("Liczby").fill("2,4,0,100,4,11,2602,36");
  await page.getByRole("button", { name: "Wyszukaj" }).click();

  await expect(page).toHaveURL(/\/wynik$/);
  await expect(page.locator(".result-number")).toHaveText("11");
});
