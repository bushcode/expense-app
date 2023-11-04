# An Expense App

## Project Description

An expense app that allows users to create budgets and manage expenses.

## Features

- Login With Google
- Create Budget
- View Budgets
- Add Expenses to Budgets
- Delete Expenses
- View All Budget Expenses
- Logout

## Libraries and Frameworks

- React Js
- Reactfire
- Firestore
- TailwindCSS
- Shadcn/UI
- react-hook-form
- zod

## Instructions to Run the App Locally

To run the app locally:

1. Clone the repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Install the dependencies by running the following command: `npm install`

4. Create a Firebase project and obtain the necessary configuration details (apiKey, authDomain, projectId, etc.).
5. Create a `.env.local` file in the root of the project and add the Firebase configuration as environment variables. For example:

```
VITE_FIREBASE_API_KEY=<FIREBASE_API_KEY>
VITE_FIREBASE_AUTH_DOMAIN=<FIREBASE_AUTH_DOMAIN>
VITE_FIREBASE_PROJECT_ID=<FIREBASE_PROJECT_ID>
VITE_FIREBASE_STORAGE_BUCKET=<VITE_FIREBASE_STORAGE_BUCKET>
VITE_FIREBASE_MESSAGING_SENDER_ID=<VITE_FIREBASE_MESSAGING_SENDER_ID>
VITE_FIREBASE_APP_ID=<VITE_FIREBASE_APP_ID>
VITE_FIREBASE_MEASUREMENT_ID=<VITE_FIREBASE_MEASUREMENT_ID>
NODE_ENV=development
```

1. Start the development server by running the following command:
