import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";

import { historyQuestions } from '../data/history';
import { mathQuestions } from '../data/math';
import { scienceQuestions } from '../data/science';
import Logo from '../assets/Logo.png';

const Home = ({ loadCategory }) => {
    const navigate = useNavigate();
    const categories = [
        {
            key: "history",
            label: "History",
            questions: historyQuestions
        },
        {
            key: "math",
            label: "Math",
            questions: mathQuestions
        },
        {
            key: "science",
            label: "Science",
            questions: scienceQuestions
        }
    ];
    const [selectedSubject, setSelectedSubject] = useState(categories[0]);
    const handleStart = () => {
        loadCategory(selectedSubject);
        navigate("/quiz");
    };

    return (
        <div className="flex items-center justify-center h-screen w-full bg-(--bg-color)">
            <div className="w-full h-full bg-(--surface-color) p-4 sm:h-auto sm:rounded-xl sm:shadow-md sm:max-w-md  md:max-w-lg lg:max-w-xl">
                <div className="flex items-center justify-between p-4 rounded-xl text-left">
                    <div>
                        <p className="text-3xl font-bold text-(--text-primary-color)">
                            Hello, smart brain!
                        </p>
                        <p className="text-(--text-muted-color) text-base">
                            Start your productive time
                        </p>
                    </div>
                    <div className="max-w-1/5">
                        <img src={Logo} alt="" loading='lazy' />
                    </div>
                </div>
                <p className="mt-5 w-full py-3 bg-(--secondary-color) rounded-lg text-center text-2xl text-(--primary-color)">
                    Select a subject
                </p>
                <div className="relative mt-5 text-(--primary-color)">
                    <div
                        className="absolute top-0 h-1/3 w-full bg-(--secondary-color) rounded-lg transition-transform duration-300 ease-in-out"
                        style={{ transform: `translateY(${categories.findIndex(c => c.key === selectedSubject.key) * 100}%)` }}></div>
                    <div className="flex flex-col">
                        {categories.map((category) => (
                            <button
                                type="button"
                                key={category.key}
                                onClick={() => setSelectedSubject(category)}
                                className="text-left flex gap-5 items-center p-2 z-10 text-xl">
                                <div className="w-10 h-10 flex items-center justify-center font-bold bg-(--primary-color) rounded-md text-(--surface-color)">
                                    {category.label.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-semibold">
                                        {category.label}
                                    </p>
                                    <p className="text-xs">
                                        {category.questions.length} questions
                                    </p>
                                </div>
                                <FaArrowRight className="ml-auto text-(--surface-color)" />
                            </button>
                        ))}
                    </div>
                </div>
                <button
                    type="button"
                    onClick={handleStart}
                    className="w-12 h-12 bg-(--primary-color) text-(--text-secondary-color) flex items-center justify-center rounded-full mt-12 mx-auto hover:scale-105 transition">
                    <FaArrowRight className='text-xl' />
                </button>
            </div>
        </div>
    );
};

export default Home;