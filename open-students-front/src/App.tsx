/* eslint-disable */
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import ProfessorPage from './pages/ProfessorPage.tsx';
import './styles/App.css';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hrrhahxbkzgqdpodbvwh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhycmhhaHhia3pncWRwb2RidndoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMzM5MTE4OSwiZXhwIjoyMDE4OTY3MTg5fQ.kvz-noo-B2X6E40h7aONVDVuAfeCuzysq3L04_QhdcQ'
export const supabase = createClient(supabaseUrl, supabaseKey)


export default function App() {

    const [currentProfessorId, setCurrentProfessorId] = useState("");

    return (
        <div className="App">
            <Header setCurrentProfessorId={setCurrentProfessorId} />
            <BrowserRouter>
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<ProfessorPage id={currentProfessorId} />} />
                </Routes>
            </BrowserRouter>
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
}