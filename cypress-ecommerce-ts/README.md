# Cypress (TypeScript) | E-commerce Signup & Login (AutomationExercise)

Este projeto automatiza:
- Cadastro de novo utilizador
- Logout
- Login com o utilizador criado

> Observação: O Cypress é um framework baseado em **JavaScript/TypeScript** (não Python). 
> Caso precise especificamente em Python, recomendo usar **Playwright (Python)** ou **Selenium (Python)** — posso gerar esse repositório também.

## Requisitos
- Node.js 18+
- Chrome (ou navegador compatível)

## Instalação
```bash
npm install
```

## Abrir Cypress UI
```bash
npx cypress open
```

## Executar em modo headless
```bash
npx cypress run
```

Estrutura:
```
cypress/
  e2e/
    signup_login.cy.ts
  fixtures/
    user.json
  support/
    e2e.ts
cypress.config.ts
package.json
tsconfig.json
```

Alvo: **https://automationexercise.com**
