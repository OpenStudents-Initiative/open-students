import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import ProfessorPage from "./pages/ProfessorPage.tsx";
import "./styles/App.css";
import AuthPage from "./pages/AuthPage.tsx";
import {
  AUTH_ROUTE,
  HOME_ROUTE,
  PROFESSORS_ROUTE,
  PROFILE_ROUTE,
} from "./utils/consts.ts";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { useRecoilValue } from "recoil";
import { currentProfessorIdState } from "./atoms/defaultAtoms.ts";

export default function App() {
  const isAuthenticated = useIsAuthenticated();
  const authenticated = isAuthenticated();
  const currentProfessorId = useRecoilValue(currentProfessorIdState);

  useEffect(() => {
    console.log(currentProfessorId);
  }, [currentProfessorId]);

  return (
    <div className="App">
      <Header />
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            currentProfessorId ? <ProfessorPage /> : <div>Landing page</div>
          }
        />
        <Route path={AUTH_ROUTE} element={<AuthPage />} />
        {authenticated && (
          <>
            <Route path={PROFESSORS_ROUTE} element={<ProfessorPage />} />
            <Route path={AUTH_ROUTE} element={<Redirect />} />
            <Route path={PROFILE_ROUTE} element={<div>Profile page</div>} />
          </>
        )}
      </Routes>
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
