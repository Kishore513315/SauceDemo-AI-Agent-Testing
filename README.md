# SauceDemo AI Agent Testing Framework 🤖

![Playwright Tests](https://github.com/Kishore513315/SauceDemo-AI-Agent-Testing/actions/workflows/playwright.yml/badge.svg)

## Overview
An advanced test automation framework built with **Playwright** and **TypeScript**, 
featuring AI-powered test generation using **Playwright Agents** (Planner, Generator, 
and Healer). The framework tests the SauceDemo e-commerce application covering 
login, cart, and checkout flows.

---

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| Playwright | Browser automation & test runner |
| TypeScript | Programming language |
| Node.js | Runtime environment |
| Playwright Agents | AI-powered test generation |
| Allure Reports | Test reporting |
| GitHub Actions | CI/CD pipeline |

---

## 🏗️ Framework Architecture

saucedemo-ai-testing/
├── .github/workflows/     # CI/CD pipeline
├── agents/                # Playwright Agent definitions
├── fixtures/              # Reusable test fixtures
│   └── fixtures.ts
├── pages/                 # Page Object Model classes
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── specs/                 # AI-generated test plans (Markdown)
├── test-data/             # JSON driven test data
│   ├── users.json
│   └── products.json
├── tests/                 # Test files
│   ├── seed.spec.ts
│   ├── login.spec.ts
│   ├── cart.spec.ts
│   └── checkout.spec.ts
└── playwright.config.ts   # Playwright configuration

---

## ✨ Key Features

- **Page Object Model (POM)** — Maintainable, reusable page classes
- **AI Agents** — Playwright Planner, Generator and Healer agents
- **JSON Driven Testing** — Test data separated from test logic
- **Custom Fixtures** — Reusable setup shared across all test files
- **Cross Browser Testing** — Chromium, Firefox and WebKit
- **Allure Reports** — Beautiful visual test reports
- **GitHub Actions CI/CD** — Automated test execution on every push

---

## 📋 Test Coverage

| Module | Test Cases | Status |
|---|---|---|
| Login | 6 | ✅ Passing |
| Cart | 8 | ✅ Passing |
| Checkout | 12 | ✅ Passing |
| **Total** | **27** | **✅ 100%** |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18 or higher
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Kishore513315/SauceDemo-AI-Agent-Testing.git

# Navigate to project
cd SauceDemo-AI-Agent-Testing

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Running Tests

```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test tests/login.spec.ts

# Run with browser visible
npx playwright test --headed

# Run on specific browser
npx playwright test --project=chromium

# Run in UI mode
npx playwright test --ui
```

### Generate Allure Report

```bash
# Generate report
npx allure generate allure-results --clean -o allure-report

# Open report
npx allure open allure-report
```

---

## 🤖 Playwright AI Agents

This framework uses Playwright's official AI agents:

- **Planner Agent** — Explores the application and generates 
test plans in Markdown format
- **Generator Agent** — Converts test plans into executable 
Playwright test scripts
- **Healer Agent** — Automatically detects and fixes broken 
tests when UI changes

### Initialize Agents
```bash
npx playwright init-agents --loop=vscode
```

---

## 🔄 CI/CD Pipeline

Tests run automatically on every push to `main` branch via 
GitHub Actions:

1. Install Node.js and dependencies
2. Install Playwright browsers
3. Run all 27 tests on Chromium
4. Generate Allure report
5. Upload reports as artifacts

---

## 📊 Test Reports

After running tests, reports are available at:
- **Playwright Report:** `playwright-report/index.html`
- **Allure Report:** `allure-report/index.html`

---

## 👨‍💻 Author

**Kishore**
- GitHub: [@Kishore513315](https://github.com/Kishore513315)
- LinkedIn: www.linkedin.com/in/kishore-chigurupati-396928243

---

## 📝 License
This project is open source and available under the MIT License.