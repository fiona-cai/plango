import React, { useState } from 'react'

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
                        <p>{question.question}</p>
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
            <h1>Questions</h1> 
            <form>
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
        </>
    )
}
