import {
  AuthProvider,
  FirestoreProvider,
  useFirebaseApp,
  useInitPerformance,
} from "reactfire";
import Login from "./auth/login";
import "./globals.css";

import {
  Route,
  Routes,
  BrowserRouter,
  Navigate,
  createBrowserRouter,
} from "react-router-dom";
import { getAuth } from "firebase/auth";
import DashboardLayout from "./dashboard/Layout";
import { AuthWrapper } from "./components/AuthWrapper";
import Home from "./dashboard/home";
import AddFriend from "./dashboard/friends/AddFriend";
import FirestoreWrapper from "./components/FirestoreWrapper";

const AuthRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
};

function App() {
  const firebaseApp = useFirebaseApp();
  const auth = getAuth(firebaseApp);

  // console.log(process.env.NODE_ENV);

  useInitPerformance(async (firebaseApp) => {
    const { getPerformance } = await import("firebase/performance");
    return getPerformance(firebaseApp);
  });

  return (
    <BrowserRouter>
      <AuthProvider sdk={auth}>
        <FirestoreWrapper>
          <AuthWrapper fallback={<Login />}>
            <Routes>
              <Route path="/" element={<Navigate to="/app" />} />
              <Route element={<DashboardLayout />}>
                <Route path="/app" element={<Home />} />
                <Route path="/app/add" element={<AddFriend />} />
              </Route>
            </Routes>
          </AuthWrapper>
        </FirestoreWrapper>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
