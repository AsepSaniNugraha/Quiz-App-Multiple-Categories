import React from 'react';
import ResultImg from '../assets/Result.png';
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Result = ({ questions, answers, category }) => {
    const navigate = useNavigate();
    const correct = questions.reduce((acc, q, i) => {
        return answers[i] !== null && q.options[answers[i]] === q.answer
            ? acc + 1
            : acc;
    }, 0);
    const total = questions.length;
    const percentage = Math.round((correct / total) * 100);

    return (
        <div className="flex items-center justify-center h-screen w-full bg-(--bg-color)">
            <div className="w-full h-full bg-(--surface-color) p-4 sm:h-auto sm:rounded-xl sm:shadow-md sm:max-w-md  md:max-w-lg lg:max-w-xl">
                <div className="flex flex-col items-center justify-between p-4 rounded-xl text-left">
                    <img
                        src={ResultImg}
                        alt=""
                        className="w-1/5 object-contain" />
                    <div className='text-center'>
                        <p className="text-3xl font-bold capitalize text-(--text-primary-color)">
                            Result
                        </p>
                        <p className="text-(--text-muted-color) text-base capitalize">
                            {category}
                        </p>
                    </div>
                </div>
                <div className='mt-2 flex flex-col items-center justify-center gap-2 border-2 border-(--primary-color) min-w-3/4 max-w-1/2 mx-auto p-4 rounded-2xl text-(--primary-color)'>
                    <p className="text-3xl font-bold capitalize ">Your Score</p>
                    <div className='flex justify-center items-center h-30 w-30 bg-(--primary-color) rounded-full font-bold text-4xl text-(--surface-color)'>
                        <p>{percentage}%</p>
                    </div>
                    <p className='text-base'>
                        {correct} correct answer{correct !== 1 && "s"} of {total}
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => {
                        localStorage.removeItem("quiz_category");
                        localStorage.removeItem("quiz_questions");
                        localStorage.removeItem("quiz_answers");
                        localStorage.removeItem("quiz_current");
                        navigate("/")
                    }}
                    className="w-12 h-12 bg-(--primary-color) text-(--text-secondary-color) flex items-center justify-center rounded-full mt-10 mx-auto hover:scale-105 transition">
                    <FaArrowLeft className='text-xl' />
                </button>
                <p className='text-center text-(--primary-color) font-semibold'>Back to home</p>
            </div>
        </div >
    )
}

export default Result