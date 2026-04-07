import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";

const Quiz = ({ category, questions, answers, setAnswers }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const fromSummary = location.state?.fromSummary || false;
    const [currentQuestion, setCurrentQuestion] = useState(0);

    if (!questions || questions.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p>No questions found. Please go back.</p>
            </div>
        );
    }

    useEffect(() => {
        if (location.state?.index !== undefined) {
            setCurrentQuestion(location.state.index)
        }
    }, [location.state])

    const current = questions[currentQuestion];
    const handleSelect = (index) => {
        const updated = [...answers];
        updated[currentQuestion] = index;
        setAnswers(updated);
    };

    const navigateQuestion = (step) => {
        if (step === 1 && currentQuestion === questions.length - 1) {
            navigate("/summary");
            return;
        }
        setCurrentQuestion((prev) => prev + step);
    };

    const handleCorrection = () => {
        navigate("/summary");
    };

    return (
        <div className="flex items-center justify-center h-screen w-full bg-(--bg-color)">
            <div className="w-full h-full bg-(--surface-color) p-4 sm:h-auto sm:rounded-xl sm:shadow-md sm:max-w-md  md:max-w-lg lg:max-w-xl">
                <QuestionCard
                    category={category}
                    question={current}
                    currentIndex={currentQuestion}
                    total={questions.length}
                    selectedAnswer={answers[currentQuestion]}
                    onSelect={handleSelect} />
                <div className="flex mt-8">
                    {fromSummary ? (
                        <button
                            onClick={handleCorrection}
                            disabled={answers[currentQuestion] === null}
                            className="py-2 w-1/4 mx-auto border border-(--secondary-color) transition duration-300 rounded-lg hover:bg-(--primary-color) hover:text-(--secondary-color)" >
                            Correction
                        </button>
                    ) : (
                        <>
                            {currentQuestion > 0 && (
                                <button
                                    onClick={() => navigateQuestion(-1)}
                                    className="py-2 w-1/4 mr-auto border border-(--secondary-color) transition duration-300 rounded-lg hover:bg-(--primary-color) hover:text-(--secondary-color)" >
                                    Previous
                                </button>
                            )}
                            <button
                                onClick={() => navigateQuestion(1)}
                                disabled={answers[currentQuestion] === null}
                                className="py-2 w-1/4 ml-auto border border-(--secondary-color) transition duration-300 rounded-lg hover:bg-(--primary-color) hover:text-(--secondary-color) disabled:opacity-0" >
                                {currentQuestion < questions.length - 1 ? "Next" : "Finish"}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Quiz;