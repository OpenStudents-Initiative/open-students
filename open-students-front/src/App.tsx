/* eslint-disable */
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from "react";
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import MainPage from './components/MainPage.tsx';
import './styles/App.css';

export default function App() {

    return (
        <div className="App">
            <Header />
            <BrowserRouter>
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<MainPage />} />
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