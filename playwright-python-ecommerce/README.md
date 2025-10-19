# Playwright (Python) | E-commerce Signup & Login (AutomationExercise)

Este repositório demonstra automação E2E com **Playwright (Python)** em um site público de e-commerce demo.

Fluxos cobertos:
- Cadastro de novo utilizador
- Logout
- Login com o utilizador criado

## Requisitos
- Python 3.9+
- Playwright 1.45+

## Instalação
```bash
pip install -r requirements.txt
playwright install
```

## Execução
```bash
pytest -v --headed
# ou modo headless
pytest -v
```

Site alvo: [https://automationexercise.com](https://automationexercise.com)
