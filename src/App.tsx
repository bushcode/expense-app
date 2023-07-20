import "./globals.css";

import {
  AuthProvider,
  SuspenseWithPerf,
  useFirebaseApp,
  useInitPerformance,
} from "reactfire";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";

import { getAuth } from "firebase/auth";
import DashboardLayout from "./dashboard/Layout";
import { AuthWrapper } from "./components/AuthWrapper";
import Login from "./auth/login";
import Home from "./dashboard/home";
import FirestoreWrapper from "./components/FirestoreWrapper";
import Budgets from "./dashboard/budgets";
import BudgetProvider from "./components/BudgetProvider";
import BudgetOverview from "./dashboard/budget-overview";
import ExpenseProvider from "./components/ExpenseProvider";
import FirebaseLoading from "./components/FirebaseLoading";

function App() {
  const firebaseApp = useFirebaseApp();
  const auth = getAuth(firebaseApp);

  useInitPerformance(async (firebaseApp) => {
    const { getPerformance } = await import("firebase/performance");
    return getPerformance(firebaseApp);
  });

  return (
    <SuspenseWithPerf
      fallback={<FirebaseLoading />}
      traceId="firestore-demo-root"
    >
      <BrowserRouter>
        <AuthProvider sdk={auth}>
          <FirestoreWrapper>
            <AuthWrapper fallback={<Login />}>
              <BudgetProvider>
                <ExpenseProvider>
                  <Routes>
                    <Route path="/" element={<Navigate to="/app" />} />
                    <Route element={<DashboardLayout />}>
                      <Route path="/app" element={<Home />} />
                      <Route path="/app/budgets" element={<Budgets />} />
                    </Route>
                    <Route
                      path="/app/budgets/:budgetId"
                      element={<BudgetOverview />}
                    />
                  </Routes>
                </ExpenseProvider>
              </BudgetProvider>
            </AuthWrapper>
          </FirestoreWrapper>
        </AuthProvider>
      </BrowserRouter>
    </SuspenseWithPerf>
  );
}

export default App;
