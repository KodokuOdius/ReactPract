import React from "react";
import { Route, HashRouter, Routes, BrowserRouter } from "react-router-dom";
import { About } from "./routes/About";
import { Home } from "./routes/Home"
import { Detail } from "./components/Detail"
import { Navigation } from "./routes/Navigation";

export function App() {
    const url = document.baseURI.substring(
        document.baseURI.lastIndexOf('/ReactPract/movie_app'),
        window.location.origin.length
    );
    return (
        <HashRouter basename={url}>
            <Navigation />
            <Routes>
                <Route path="/" index element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/movie-details" element={<Detail />} />
            </Routes>
        </HashRouter>
    );
}