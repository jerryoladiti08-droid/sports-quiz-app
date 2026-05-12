'use client'

import { useState } from 'react'

const questions = [
  {
    question: "Which country has won the most FIFA World Cup titles?",
    options: ["Germany", "Brazil", "Argentina", "Italy"],
    answer: "Brazil",
  },
  {
    question: "How many players are on a basketball team on the court at one time?",
    options: ["4", "6", "5", "7"],
    answer: "5",
  },
  {
    question: "Which athlete has won the most Olympic gold medals ever?",
    options: ["Usain Bolt", "Michael Phelps", "Carl Lewis", "Mark Spitz"],
    answer: "Michael Phelps",
  },
  {
    question: "In which sport would you perform a 'slam dunk'?",
    options: ["Volleyball", "Football", "Basketball", "Tennis"],
    answer: "Basketball",
  },
  {
    question: "Which country hosted the 2016 Summer Olympics?",
    options: ["China", "UK", "Brazil", "Japan"],
    answer: "Brazil",
  },
  {
    question: "How long is a standard football (soccer) match?",
    options: ["60 minutes", "80 minutes", "90 minutes", "100 minutes"],
    answer: "90 minutes",
  },
  {
    question: "Which tennis player has won the most Grand Slam singles titles?",
    options: ["Roger Federer", "Rafael Nadal", "Novak Djokovic", "Pete Sampras"],
    answer: "Novak Djokovic",
  },
  {
    question: "What sport is played at Wimbledon?",
    options: ["Cricket", "Tennis", "Golf", "Polo"],
    answer: "Tennis",
  },
]

export default function Quiz() {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const question = questions[current]

  function handleAnswer(option) {
    if (selected) return
    setSelected(option)
    if (option === question.answer) setScore(score + 1)
  }

  function handleNext() {
    if (current + 1 >= questions.length) {
      setFinished(true)
    } else {
      setCurrent(current + 1)
      setSelected(null)
    }
  }

  function handleRestart() {
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
  }

  if (finished) {
    const percentage = Math.round((score / questions.length) * 100)
    return (
      <div className="card">
        <div className="trophy">🏆</div>
        <h1 className="title">Quiz Complete!</h1>
        <p className="score-text">You scored</p>
        <p className="big-score">{score} / {questions.length}</p>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
        </div>
        <p className="percentage">{percentage}%</p>
        <p className="verdict">
          {percentage === 100 ? '🌟 Perfect score! You\'re a sports genius!' :
           percentage >= 75 ? '🔥 Great job! You really know your sports!' :
           percentage >= 50 ? '👍 Not bad! Keep watching those games!' :
           '📚 Keep learning! Sports knowledge takes time!'}
        </p>
        <button className="btn-restart" onClick={handleRestart}>Play Again</button>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="top-bar">
        <span className="badge">Sports Quiz</span>
        <span className="counter">{current + 1} / {questions.length}</span>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${((current) / questions.length) * 100}%` }}></div>
      </div>

      <h2 className="question">{question.question}</h2>

      <div className="options">
        {question.options.map((option) => {
          let cls = 'option'
          if (selected) {
            if (option === question.answer) cls += ' correct'
            else if (option === selected) cls += ' wrong'
            else cls += ' dimmed'
          }
          return (
            <button key={option} className={cls} onClick={() => handleAnswer(option)}>
              {option}
            </button>
          )
        })}
      </div>

      {selected && (
        <div className="feedback">
          {selected === question.answer ? '✅ Correct!' : `❌ Wrong! The answer is ${question.answer}`}
        </div>
      )}

      {selected && (
        <button className="btn-next" onClick={handleNext}>
          {current + 1 >= questions.length ? 'See Results' : 'Next Question'} →
        </button>
      )}

      <p className="score-tracker">Score: {score}</p>
    </div>
  )
}
