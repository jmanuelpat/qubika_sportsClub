# Qubika Sports Club - End-to-End Automation with Cypress

This repository contains an automated end-to-end test that validates both the API and UI of the Qubika Sports Club Management platform.

---

## About the Solution

The goal of this automation was to simulate a full user flow combining API and UI layers, covering user registration, login, and the creation and validation of nested categories within the system.

This solution uses **Cypress**, which provides native support for both API requests and UI interaction in the same test. The framework is well-suited for modern web apps and offers great visibility during execution, making it a natural choice for this type of scenario.

---

## Why Cypress?

- Simple and modern syntax with JavaScript.
- Great developer experience with live reloading and time travel debugging.
- Built-in support for `cy.request()` for API validation and chaining with UI steps.
- Ability to run headless or interactively depending on the needs of the project.
- Easily configurable and highly readable.

---

## Covered Workflow

1. **Create a user via API** using the `/auth/register` endpoint and store credentials.
2. **Access the login page** and validate it renders correctly.
3. **Log in via UI** using the newly created user.
4. **Validate dashboard access** to confirm login was successful.
5. **Create a parent category** via API using `/api/category-type/create`.
6. **Create a subcategory** linked to the parent.
7. **Navigate through the UI** to the "Tipos de Categoría" section.
8. **Move to the last pagination page** to find the newly created categories.
9. **Assert that both the parent and subcategory are present in the list.**
10. **Cleanup:** Delete both categories via API using the corresponding `DELETE` endpoint.

---

## Enhancements & Structure

- **Token reuse:** Access token is generated once and reused across requests.
- **Dynamic data:** Categories and users are created with unique names based on timestamps.
- **UI and API combined:** Smooth transitions from backend logic to frontend validations.
- **Pagination awareness:** The test actively navigates to the last page to validate data that isn't initially visible.
- **Cleanup:** Subcategory and parent category are deleted at the end to keep the environment clean.

---

## Project Structure

```
qubika-club-e2e/
├── cypress/
│   ├── e2e/
│   │   └── userAndCategoryFlow.cy.js
│   └── support/
│       └── locators.js (optional for reusable selectors)
├── cypress.config.js
├── package.json
└── README.md
```

---

## ▶How to Run the Tests

1. **Clone the repository**

```bash
git clone https://github.com/your-username/qubika-club-e2e.git
cd qubika-club-e2e
```

2. **Install dependencies**

```bash
npm install
```

3. **Run Cypress in interactive mode**

```bash
npx cypress open
```

4. **Select the test file** `userAndCategoryFlow.cy.js` and run it.

---

## Notes

- The system under test uses pagination in the category view, so a deliberate step is added to navigate to the last page where the new categories are listed.
- The test uses timestamp-based data to avoid naming collisions.
- If the API or environment resets frequently, this test can still run independently each time.

---

## Credentials

The test uses a dynamically generated user and stores the token in memory during the run, so no hardcoded credentials are included.

