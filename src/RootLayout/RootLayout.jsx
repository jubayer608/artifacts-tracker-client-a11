import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../pages/Shared/NavBar';
import Footer from '../pages/Shared/Footer';
import TitleManager from '../routes/TitleManager';

const RootLayout = () => {
    return (
        <div>
            <TitleManager></TitleManager>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;