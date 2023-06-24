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
    }
]

export default function Questions(props) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [responses, setResponses] = useState([]);
    const [currentResponse, setCurrentResponse] = useState('');


    const handleNextQuestion = (response) => {
        setResponses([...responses, response]);
        setCurrentResponse('');
        setCurrentQuestion(currentQuestion + 1);
    }

    const isLastQuestion = () => {
        return currentQuestion === questions.length - 1;
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
                        <button onClick={(e) => {
                            console.log(currentResponse);
                            handleNextQuestion(currentResponse);
                            e.preventDefault();
                        }}>Next</button>
                    </>
                );
            case 'multi-select':
                return (
                    <>
                        <h2>{question.question}</h2>
                        <form>
                            <label>
                                <input type="checkbox" name="question" />
                            </label>    
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
                {isLastQuestion() && <input type="submit" value="Submit" />}
            </form>
        </>
    )
}
