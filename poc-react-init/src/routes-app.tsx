import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import CreateLocation from "./pages/CreateLocation";
import ErrorPages from "./pages/ErrorPages";

const RoutesApp = () => {
    return (
        <Router>
            <Routes >
                <Route path="/" element={<Home />} />
                <Route path="/create-location" element={<CreateLocation />} />
                <Route path="*" element={<ErrorPages />} />
            </Routes>
        </Router>
    );
}

export default RoutesApp;