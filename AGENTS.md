# AGENTS.md

## Cursor Cloud specific instructions

This repo is a QA test-automation portfolio, not a deployable app. It contains three project folders; two are runnable and one is empty:

- `cypress-ecommerce-ts/` — Cypress + TypeScript E2E suite (runnable).
- `playwright-python-ecommerce/` — Playwright + Python (pytest) E2E suite (runnable).
- `ruby-capybara-cucumber-ecommerce/` — empty/orphaned git submodule (no `.gitmodules`, no code); nothing to run.

### System under test is EXTERNAL
All suites drive the public demo site `https://automationexercise.com` over the internet. There is no local server, backend, frontend, or database to start, and nothing binds a port. Outbound internet egress to that site is the only hard runtime dependency. Tests create real accounts (unique `@mailinator.com` emails) on each run, so results depend on the live site being reachable/healthy.

### Running the suites (dev = the same as CI; no build, no lint configured)
- Cypress: from `cypress-ecommerce-ts/`, run `npx cypress run` (headless). `baseUrl` is hardcoded in `cypress.config.ts`. No `lint`/`build` scripts exist.
- Playwright: from `playwright-python-ecommerce/`, run `python3 -m pytest -v` (headless Chromium by default per `conftest.py`).

### PATH gotcha (Python)
`pip install` places console scripts (`pytest`, `playwright`) in `~/.local/bin`, which is NOT on `PATH` here. Invoke them as modules instead: `python3 -m pytest ...` and `python3 -m playwright ...`. The Playwright browser binary is installed via `python3 -m playwright install chromium` (already handled by the startup update script); the bundled headless Chromium runs without extra system libraries (no `install-deps`/sudo needed).

### Known pre-existing test bug (not an environment issue)
`playwright-python-ecommerce/tests/test_signup_login.py` fails with `InvalidSelectorError` right after it navigates to the site. The cause is `get_by_role(..., name=re.compile("Signup / Login", re.I))`: a regex containing `/` is not a valid Playwright role-name selector in any Playwright version (confirmed against 1.40, 1.55, 1.61). This is a defect in the test code, unrelated to setup. The Playwright environment itself is fully working (browser launches and navigates to the live site). The Cypress suite (2 specs) passes end to end.
