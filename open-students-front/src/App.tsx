/* eslint-disable */
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import ProfessorPage from "./pages/ProfessorPage.tsx";
import "./styles/App.css";
import { createClient } from "@supabase/supabase-js";
import { Session } from "@supabase/gotrue-js";
import AuthPage from "./pages/AuthPage.tsx";
import {
  AUTH_ROUTE,
  HOME_ROUTE,
  PROFESSORS_ROUTE,
  PROFILE_ROUTE,
} from "./utils/consts.ts";
import { useRecoilState } from "recoil";
import { sessionState } from "./atoms/defaultAtoms.ts";

const supabaseUrl = "https://hrrhahxbkzgqdpodbvwh.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhycmhhaHhia3pncWRwb2RidndoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMzM5MTE4OSwiZXhwIjoyMDE4OTY3MTg5fQ.kvz-noo-B2X6E40h7aONVDVuAfeCuzysq3L04_QhdcQ";
export const supabase = createClient(supabaseUrl, supabaseKey);

export default function App() {
  const [session, setSession] = useRecoilState(sessionState);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="App">
      <Header session={session} />
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={session ? <ProfessorPage /> : <div>Landing page</div>}
        />
        {!session && <Route path={AUTH_ROUTE} element={<AuthPage />} />}
        {session && (
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
