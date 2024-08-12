import React, { useState, useEffect } from 'react';
import { getQuizQuestions } from '../services/quizService';
import { useNavigate } from 'react-router-dom';
import './Quiz.css';  // Importing the updated CSS file

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            const quizQuestions = await getQuizQuestions();
            setQuestions(quizQuestions);
        };
        fetchQuestions();
    }, []);

    const handleChange = (e, questionId) => {
        setAnswers({ ...answers, [questionId]: e.target.value });
    };

    const handleSubmit = () => {
        const correctAnswers = questions.filter(
            (q) => q.correctAnswer === answers[q._id]
        ).length;
        const pass = correctAnswers >= 3;
        navigate('/result', { state: { pass } });
    };

    return (
        <div className="quiz-container">
            <h1>Quiz</h1>
            {questions.map((q) => (
                <div key={q._id} className="question">
                    <h2>{q.question}</h2>
                    <div className="options">
                        {q.options.map((option, index) => (
                            <label key={index}>
                                <input
                                    type="radio"
                                    name={q._id}
                                    value={option}
                                    onChange={(e) => handleChange(e, q._id)}
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                </div>
            ))}
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default Quiz;

