import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://automationexercise.com",
    viewportWidth: 1366,
    viewportHeight: 900,
    video: false,
    chromeWebSecurity: false,
    retries: 0
  }
});
