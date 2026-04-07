import React from 'react';
import SummaryImg from '../assets/Summary.png';
import { useNavigate } from 'react-router-dom';

const Summary = ({ questions, answers, category }) => {
    const navigate = useNavigate()
    const handleResult = () => {
        navigate('/result')
    }
    return (
        <div className="flex items-center justify-center h-screen w-full bg-(--bg-color)">
            <div className="flex flex-col w-full h-full bg-(--surface-color) p-4 sm:h-auto sm:rounded-xl sm:shadow-md sm:max-w-md  md:max-w-lg lg:max-w-xl">
                <div className="flex items-center justify-between p-4 rounded-xl text-left">
                    <div>
                        <p className="text-3xl font-bold capitalize text-(--primary-color)">
                            Summary
                        </p>
                        <p className="text-(--text-muted-color) text-base capitalize">
                            {category}
                        </p>
                    </div>
                    <img
                        src={SummaryImg}
                        alt=""
                        className="w-1/5 object-contain" />
                </div>
                <div className="flex flex-col gap-5 p-4">
                    {questions.map((q, i) => (
                        <button
                            key={q.id}
                            onClick={() =>
                                navigate("/quiz", {
                                    state: {
                                        index: i,
                                        fromSummary: true
                                    }
                                })
                            }
                            className="cursor-pointer text-left text-(--text-primary-color) p-2 z-10 border border-(--secondary-color) hover:border-(--primary-color) rounded-lg transition duration-300">
                            <p>
                                {q.question}
                            </p>
                            <p>
                                Your answer: {q.options[answers[i]]}
                            </p>
                        </button>
                    ))}
                </div>
                <button
                    type='button'
                    onClick={handleResult}
                    className="py-2 w-1/2 mx-auto mt-3 border border-(--secondary-color) transition duration-300 rounded-lg hover:bg-(--primary-color) text-(--text-primary-color) hover:text-(--secondary-color)">
                    Result
                </button>
            </div>
        </div>
    )
}

export default Summary