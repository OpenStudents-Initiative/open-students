import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "./components/NavBar.tsx";
import Footer from "./components/Footer.tsx";
import ProfessorPage from "./pages/ProfessorPage.tsx";
import AuthPage from "./pages/AuthPage.tsx";
import {
  AUTH_ROUTE,
  HOME_ROUTE,
  PROFESSORS_ROUTE,
  PROFILE_ROUTE,
} from "./utils/consts.ts";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import LandingPage from "./pages/LandingPage.tsx";

export default function App() {
  const isAuthenticated = useIsAuthenticated();
  const authenticated = isAuthenticated();

  return (
    <div className="App">
      <NavBar />
      <ScrollToTop />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path={AUTH_ROUTE} element={<AuthPage />} />
          {authenticated && (
            <>
              <Route
                path={`${PROFESSORS_ROUTE}/:id`}
                element={<ProfessorPage />}
              />
              <Route path={AUTH_ROUTE} element={<Redirect />} />
              <Route path={PROFILE_ROUTE} element={<div>Profile page</div>} />
            </>
          )}
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const Redirect = () => {
  window.location.href = HOME_ROUTE;
  return null;
};
