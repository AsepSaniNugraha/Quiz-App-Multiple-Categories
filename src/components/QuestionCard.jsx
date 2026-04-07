import React, { useEffect, useRef, useState } from "react";
import historyImg from "../assets/History.png";
import mathImg from "../assets/Math.png";
import scienceImg from "../assets/Science.png";

const categoryImages = {
    history: historyImg,
    math: mathImg,
    science: scienceImg,
};

const QuestionCard = ({
    category,
    question,
    currentIndex,
    total,
    selectedAnswer,
    onSelect }) => {
    if (!question) return null;
    const refs = useRef([]);
    const [position, setPosition] = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (selectedAnswer !== null && refs.current[selectedAnswer]) {
            const el = refs.current[selectedAnswer];
            setPosition(el.offsetTop);
            setHeight(el.offsetHeight);
        } else {
            setPosition(0);
            setHeight(0);
        }
    }, [selectedAnswer, currentIndex]);

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <p className="text-3xl font-bold capitalize">
                        {category}
                    </p>
                    <p className="text-(--text-muted-color) text-base">
                        Question {currentIndex + 1} of {total}
                    </p>
                </div>
                <img
                    src={categoryImages[category]}
                    alt={category}
                    className="w-1/5 object-contain" />
            </div>
            <p className="mb-3 pointer-events-none select-none px-4 py-6 text-(--text-secondary-color) bg-(--primary-color) rounded-lg">
                {question.question}
            </p>
            <div className="relative">
                <div
                    className="absolute top-0 left-0 w-full bg-(--secondary-color) rounded-lg transition-all duration-300"
                    style={{
                        top: position,
                        height: height,
                    }} />
                <div className="flex flex-col gap-2">
                    {question.options.map((option, index) => (
                        <button
                            key={index}
                            ref={(el) => (refs.current[index] = el)}
                            onClick={() => onSelect(index)}
                            className="cursor-pointer text-left p-2 z-10 relative border border-(--secondary-color) hover:border-(--primary-color) rounded-lg transition duration-300" >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QuestionCard;