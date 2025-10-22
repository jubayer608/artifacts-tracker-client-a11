import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../pages/Shared/NavBar';
import Footer from '../pages/Shared/Footer';
import TitleManager from '../routes/TitleManager';
import { ThemeProvider } from '../contexts/ThemeContext';

const RootLayout = () => {
    return (
        <ThemeProvider>
            <div>
                <TitleManager></TitleManager>
                <NavBar></NavBar>
                <Outlet></Outlet>
                <Footer></Footer>
            </div>
        </ThemeProvider>
    );
};

export default RootLayout;