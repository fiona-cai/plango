import React, { useState } from 'react'
import { motion, Variants, useMotionTemplate, cubicBezier, easeIn, easeOut } from "framer-motion";

const questions = [
    {
        question: "What is your name 1?",
        type: "text",
    },
    {
        question: "What is your name 2?",
        type: "text",
    },
    {
        question: "What is your name 3?",
        type: "text",
    },
    {
        question: "What is your name 4?",
        type: "multi-select",
        options: [
            'option 1',
            'option 2',
            'option 3',
        ],
    },
]

export default function Questions(props) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [responses, setResponses] = useState([]);
    const [currentResponse, setCurrentResponse] = useState('');
    const [currentMultiResponse, setCurrentMultiResponse] = useState([]);


    const handleNextQuestion = (response) => {
        setResponses([...responses, response]);
        setCurrentResponse('');
        setCurrentQuestion(currentQuestion + 1);
    }

    const isLastQuestion = () => {
        return currentQuestion === questions.length - 1;
    }

    const onSubmit = (e) => {
        handleNextQuestion(questions[currentQuestion].type === 'multi-select' ? currentMultiResponse : currentResponse);
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
                initial={{ opacity: 1, y: 200}}
                animate={{ opacity: 0.5, y: 0}}
                transition={{
                    duration: 1,
                    delay: 2,
                    ease: "easeIn"
                }}
            >
                <h1 className='px-12 py-2 mt-24 text-center text-white font-bold text-2xl'>PlanGO</h1> 
            
            </motion.div>
   
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 1,
                    delay: 2.5,
                    ease: "easeIn"
                }}
            >
                <h1 className='text-center text-white font-regular text-sm'>Welcome</h1> 
            
            </motion.div>


            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 1,
                    delay: 4,
                    ease: "easeIn"
                }}
            >
                <form className='text-center mt-24'>
                    {renderQuestion()}
                    {!isLastQuestion() && 
                        <button onClick={(e) => {
                            console.log(currentResponse);
                            handleNextQuestion(questions[currentQuestion].type === 'multi-select' ? currentMultiResponse : currentResponse);
                            e.preventDefault();
                        }}>Next</button>
                    }
                    {isLastQuestion() && <input type="submit" value="Submit" onSubmit={onSubmit}/>}
                </form>

            </motion.div>

            
        </>
    )
}
