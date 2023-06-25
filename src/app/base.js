import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Questions from './components/questions.js';
import Map from './components/map.js';
import {useState} from 'react';

export default function Base(props) {
    const [responses, setResponses] = useState([]);
    const updateResponses = (newResponses) => {
        setResponses(newResponses);
    }

    return (
        <>
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Questions responses={responses} setResponses={updateResponses}/>} />
                        <Route path="/map" element={<Map responses={responses}/>} />
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    )
}