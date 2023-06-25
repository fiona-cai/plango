import React, { useState } from 'react'
import { motion, Variants, useMotionTemplate, cubicBezier, easeIn, easeOut } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const questions = [
    {
        question: "What's your name?",
        type: "text",
    },
    {
        question: "Hi {{name}}! Where are you headed on your next vacation?",
        type: "text",
    },
    {
        question: "Got it. When are you planning to arrive and depart?",
        type: "text",
    },
    {
        question: "Last step - select all activites below that interest you",
        type: "multi-select",
        options: [
            'option 1',
            'option 2',
            'option 3',
        ],
    },
    {
        question: "Submit!",
        type: "submit",
    },
]

export default function Questions({responses, setResponses}) {
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [currentResponse, setCurrentResponse] = useState('');
    const [currentMultiResponse, setCurrentMultiResponse] = useState([]);

    useEffect(() => {
        setResponses([]);
    }, []);

    const handleNextQuestion = (response) => {
        setResponses([...responses, response]);
        setCurrentResponse('');
        setCurrentQuestion(currentQuestion + 1);
    }

    const isLastQuestion = () => {
        return currentQuestion === questions.length - 1;
    }

    const navigate = useNavigate();
    const onSubmit = async(e) => {
        navigate('/map');
    }

    const renderQuestion = () => {
        const question = questions[currentQuestion];
        switch (question.type) {
            case "text":
                return (
                    <>
                        <p className='text-white'>{question.question}</p>
                        <input type="text" value={currentResponse} onChange={(e) => {
                            setCurrentResponse(e.target.value);
                        }} />
                    </>
                );
            case 'multi-select':
                return (
                    <>
                        <h2>{question.question}</h2>
                        <form>
                            {question.options.map((option, index) => {
                                return (
                                    <div key={index}>
                                        <input type="checkbox" id={option} name={option} value={option} onChange={(e) => {
                                            console.log(index);
                                            if (e.target.checked) {
                                                setCurrentMultiResponse([...currentMultiResponse, index]);
                                            } else {
                                                setCurrentMultiResponse(currentMultiResponse.filter((response) => {
                                                    return response !== index;
                                                }));
                                            }
                                        }}/>
                                        <label htmlFor={option}>{option}</label>
                                    </div>
                                );
                            })}
                        </form>
                    </>
                );
            default: 
                return null;
        }
    }

    return (
        <>
            
            <motion.div
                initial={{ opacity: 1, y: 200, scale:2}}
                animate={{ opacity: [1, 0.5, 0.5,0.5,0.75], y: 0, scale:1}}
                transition={{
                    duration: 1.5,
                    delay: 1.2,
                    ease: "easeIn"
                }}
            >
                <h1 className='px-12 py-2 mt-24 text-center text-white font-bold text-2xl'>PlanGO</h1> 
            
            </motion.div>
   
            <motion.div
                initial={{ opacity: 0, }}
                animate={{ opacity: 0.5 }}
                transition={{
                    duration: 1,
                    delay: 2.5,
                    ease: "easeIn"
                }}
            >
                <h1 className='text-center text-white font-regular text-sm'>Tegether, let's plan your next adventure</h1> 
            
            </motion.div>


            <motion.div
                initial={{ opacity: 0, y: 120, scale:2}}
                animate={{ opacity: 1, y: 0}}
                transition={{
                    duration: 1,
                    delay: 5,
                    ease: "easeIn"
                }}
            >
                <form className='text-center font-xl mt-36'>
                    {renderQuestion()}
                    {!isLastQuestion() && 
                        <button onClick={(e) => {
                            console.log(currentResponse);
                            handleNextQuestion(questions[currentQuestion].type === 'multi-select' ? currentMultiResponse : currentResponse);
                            e.preventDefault();
                        }} className='text-white p-4'>Next</button>
                    }
                    {isLastQuestion() && <button onClick={onSubmit} className='text-white p-4'>Submit</button>}
                </form>

            </motion.div>

            
        </>
    )
}
