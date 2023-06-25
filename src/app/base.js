import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Questions from './components/questions.js';
import Map from './components/map.js';

export default function Base(props) {
    return (
        <>
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Questions />} />
                        <Route path="/map" element={<Map />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    )
}