import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Result = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { pass } = location.state;

    const handleRetake = () => {
        navigate('/quiz');
    };

    return (
        <div>
            <h1>{pass ? 'Congratulations, You Passed!' : 'Sorry, You Failed.'}</h1>
            <button onClick={handleRetake}>{pass ? 'Next' : 'Retake'}</button>
        </div>
    );
};

export default Result;

