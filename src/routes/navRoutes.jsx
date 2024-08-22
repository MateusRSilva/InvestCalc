import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from '../components/navbar/navBar';
import Home from '../components/home/home';
import Information from '../components/simulator/information/information';
import Profile from '../components/simulator/profile/profile';
import Result from '../components/simulator/results/results';

function NavRoutes() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/simulator" element={<Information />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/result" element={<Result />} />
            </Routes>
        </Router>
    );
}

export default NavRoutes;