import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Summary from './pages/Summary';
import Result from './pages/Result';

const App = () => {
  const [category, setCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const loadCategory = (subject) => {
    setCategory(subject.key);
    setQuestions(subject.questions);
    setAnswers(new Array(subject.questions.length).fill(null));
    localStorage.setItem("quiz_category", subject.key);
    localStorage.setItem("quiz_questions", JSON.stringify(subject.questions));
    localStorage.setItem("quiz_answers", JSON.stringify(new Array(subject.questions.length).fill(null)))
  };

  useEffect(() => {
    const savedQuestions = localStorage.getItem("quiz_questions");
    const savedAnswers = localStorage.getItem("quiz_answers");
    const savedCategory = localStorage.getItem("quiz_category");
    if (savedQuestions && savedAnswers && savedCategory) {
      setQuestions(JSON.parse(savedQuestions));
      setAnswers(JSON.parse(savedAnswers));
      setCategory(savedCategory);
    }
  }, [])
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={
          <Home
            loadCategory={loadCategory} />
        } />
        <Route path='/quiz' element={
          <Quiz
            category={category}
            questions={questions}
            answers={answers}
            setAnswers={setAnswers} />
        } />
        <Route path='/summary' element={
          <Summary
            questions={questions}
            answers={answers}
            category={category} />
        } />
        <Route path='/result' element={
          <Result
            questions={questions}
            answers={answers}
            category={category} />
        } />
      </Routes>
    </HashRouter>
  )
}

export default App