import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Questions from './components/questions.js';

export default function Base(props) {
    return (
        <>
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Questions />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    )
}
