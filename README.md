# 🚀 SauceDemo Playwright QA Automation

![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)

A comprehensive **Web UI and API Test Automation Framework** developed using **Playwright and TypeScript** to validate the functionality, reliability, and user experience of the SauceDemo e-commerce application.

This project demonstrates practical QA automation skills through structured test development, Page Object Model (POM), end-to-end testing, API validation, responsive testing, negative testing, and Continuous Integration.

---

## 📑 Table of Contents

- [📌 Project Overview](#-project-overview)
- [🎯 Project Objectives](#-project-objectives)
- [🛠️ Technologies and Tools](#️-technologies-and-tools)
- [🧪 Automation Coverage](#-automation-coverage)
- [🏗️ Framework Architecture](#️-framework-architecture)
- [📂 Project Structure](#-project-structure)
- [⚙️ Installation and Setup](#️-installation-and-setup)
- [▶️ Executing Tests](#️-executing-tests)
- [📊 Test Reports](#-test-reports)
- [🔄 Continuous Integration](#-continuous-integration)
- [💡 Key Skills Demonstrated](#-key-skills-demonstrated)
- [🌐 Application Under Test](#-application-under-test)
- [👩‍💻 Author](#-author)

---

## 📌 Project Overview

The SauceDemo Playwright QA Automation project focuses on automating essential application workflows and validating different functional and non-functional aspects of an e-commerce platform.

The framework covers individual application modules as well as complete user journeys, helping identify potential issues and improve application quality through repeatable automated testing.

🔗 **Application:** [SauceDemo](https://www.saucedemo.com/)

## 🎯 Project Objectives

- ✅ Develop maintainable and reusable automated test scripts.
- ✅ Validate core e-commerce functionalities and user interactions.
- ✅ Verify positive and negative application scenarios.
- ✅ Automate complete end-to-end purchase workflows.
- ✅ Perform API request and response validation.
- ✅ Evaluate responsive behavior across different viewport sizes.
- ✅ Generate detailed test execution reports.
- ✅ Integrate automated testing into a CI/CD workflow.

## 🛠️ Technologies and Tools

| Technology | Purpose |
|---|---|
| 💻 TypeScript | Test automation programming language |
| 🎭 Playwright | Web UI automation framework |
| 🧪 Playwright Test | Test execution and assertions |
| 🟢 Node.js | JavaScript runtime environment |
| 🔌 Playwright API Testing | API request and response validation |
| 🌿 Git | Version control |
| 🐙 GitHub | Source code management and collaboration |
| ⚙️ GitHub Actions | Continuous Integration |
| 📊 HTML Reporter | Test execution reporting |
| 📝 Visual Studio Code | Development environment |

## 🧪 Automation Coverage

The project includes the following automation modules:

| Module | Test Coverage |
|---|---|
| 🔐 Login Automation | Valid login, invalid credentials, empty fields and locked-out user |
| 📦 Inventory Automation | Product listing, product sorting and inventory validation |
| 🛍️ Product Automation | Product details, product information and interactions |
| 🛒 Cart Automation | Add to cart, remove items and cart validation |
| 📝 Checkout Information | Customer information and required-field validation |
| 💳 Checkout Overview | Order summary, item details and price validation |
| 🎉 Checkout Complete | Order confirmation and completion workflow |
| ☰ Menu Automation | Menu interactions, navigation and logout |
| 🌐 About Page Automation | About page navigation and validation |
| 🔗 Footer Automation | Footer content and social media links |
| 🔌 API Automation | API requests, status codes and response validation |
| 📱 Responsive Testing | Layout and functionality across desktop, tablet and mobile viewports |
| 🔄 End-to-End Automation | Complete shopping and checkout workflows |
| ⚠️ Error Handling | Invalid inputs, validation messages and negative scenarios |

## 🏗️ Framework Architecture

The framework follows the **Page Object Model (POM)** design pattern to improve code reusability, maintainability, and separation of concerns.

**Architecture Highlights:**

- 📄 Page classes encapsulate page-specific locators and actions.
- 🧪 Test specifications contain test scenarios and assertions.
- ♻️ Reusable methods reduce code duplication.
- 🎭 Playwright Test provides execution, assertions, and test lifecycle management.
- ⚙️ Configuration is centralized in `playwright.config.ts`.

## 📂 Project Structure

```text
saucedemo-playwright-qa-automation/
│
├── pages/
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── ProductPage.ts
│   └── ...
│
├── tests/
│   ├── login.spec.ts
│   ├── inventory.spec.ts
│   ├── product.spec.ts
│   ├── cart.spec.ts
│   ├── checkout-information.spec.ts
│   ├── checkout-overview.spec.ts
│   ├── checkout-complete.spec.ts
│   ├── menu.spec.ts
│   ├── about.spec.ts
│   ├── footer.spec.ts
│   ├── api.spec.ts
│   ├── responsive.spec.ts
│   ├── e2e.spec.ts
│   └── error-handling.spec.ts
│
├── .github/
│   └── workflows/
│
├── playwright.config.ts
├── package.json
├── package-lock.json
└── README.md
```

*Note: The structure is illustrative. Update it to reflect the actual files and folders in the repository.*

## ⚙️ Installation and Setup

### 📋 Prerequisites

- Node.js
- npm
- Git
- Visual Studio Code (recommended)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/dil2003-av/saucedemo-playwright-qa-automation.git
```

### 2️⃣ Navigate to the Project Directory

```bash
cd saucedemo-playwright-qa-automation
```

### 3️⃣ Install Dependencies

```bash
npm install
```

### 4️⃣ Install Playwright Browsers

```bash
npx playwright install
```

## ▶️ Executing Tests

### 🧪 Run All Tests

```bash
npx playwright test
```

### 🖥️ Run Tests in Headed Mode

```bash
npx playwright test --headed
```

### 📄 Run Tests in a Specific File

```bash
npx playwright test tests/login.spec.ts
```

### 🔄 Run Tests Sequentially

```bash
npx playwright test --workers=1
```

### 🌐 Run Tests with a Specific Browser

```bash
npx playwright test --project=chrome
```

*The browser project name must match the configuration in `playwright.config.ts`.*

## 📊 Test Reports

The project uses the Playwright HTML Reporter to generate detailed test execution reports.

**Generate and view the HTML report:**

```bash
npx playwright show-report
```

**The HTML report provides:**

- ✅ Passed and failed test results.
- ⏱️ Test execution details.
- ❌ Error messages and failure information.
- 📸 Screenshots and videos where configured.
- 🔍 Trace information for debugging where available.

## 🔄 Continuous Integration

GitHub Actions is used to support automated test execution as part of the project's Continuous Integration workflow.

The configured workflow can execute tests on supported GitHub events, such as pushes and pull requests.

**Benefits:**

- ⚡ Automated test execution.
- 🔍 Early detection of test failures.
- 🔄 Continuous validation of code changes.
- 📈 Improved confidence in automation framework updates.

## 💡 Key Skills Demonstrated

- 🧪 Software Quality Assurance (QA)
- 🎭 Playwright Test Automation
- 💻 TypeScript
- 🏗️ Page Object Model (POM)
- 🔍 Functional Testing
- 🔌 API Testing
- 🔄 End-to-End Testing
- 📱 Responsive Testing
- ⚠️ Negative and Error Handling Testing
- 📝 Test Case Design and Implementation
- 🌿 Git Branching and Pull Request Workflow
- ⚙️ GitHub Actions and CI/CD
- 📊 Test Reporting and Debugging

## 🌐 Application Under Test

🔗 **SauceDemo:** [https://www.saucedemo.com/](https://www.saucedemo.com/)

The application is used as the target environment for validating e-commerce workflows, including authentication, product selection, cart management, and checkout.

## 👩‍💻 Author

### Dilmi Kaushalya

🎓 Undergraduate Software Engineering Student | QA Automation Enthusiast

- 🐙 **GitHub:** [dil2003-av](https://github.com/dil2003-av)
- 💼 **LinkedIn:** [Dilmi Kaushalya](https://www.linkedin.com/in/dilmi-kaushalya-743208346/)

---

⭐ **Thank you for visiting this project!**

💬 Feel free to explore the repository and its automation modules.
