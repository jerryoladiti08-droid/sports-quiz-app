'use client'

import { useState } from 'react'

const allQuestions = {
  easy: [
    {
      question: "How many players are on a football (soccer) team?",
      options: ["9", "11", "10", "12"],
      answer: "11",
    },
    {
      question: "How many points is a touchdown worth in American Football?",
      options: ["3", "7", "6", "4"],
      answer: "6",
    },
    {
      question: "What sport is played at Wimbledon?",
      options: ["Cricket", "Tennis", "Golf", "Polo"],
      answer: "Tennis",
    },
    {
      question: "In which sport do you throw a ball into a hoop?",
      options: ["Volleyball", "Basketball", "Handball", "Polo"],
      answer: "Basketball",
    },
    {
      question: "How many rings are on the Olympic flag?",
      options: ["4", "6", "5", "7"],
      answer: "5",
    },
  ],
  medium: [
    {
      question: "Which country has won the most FIFA World Cup titles?",
      options: ["Germany", "Brazil", "Argentina", "Italy"],
      answer: "Brazil",
    },
    {
      question: "Which athlete has won the most Olympic gold medals ever?",
      options: ["Usain Bolt", "Michael Phelps", "Carl Lewis", "Mark Spitz"],
      answer: "Michael Phelps",
    },
    {
      question: "Which country hosted the 2016 Summer Olympics?",
      options: ["China", "UK", "Brazil", "Japan"],
      answer: "Brazil",
    },
    {
      question: "Which tennis player has won the most Grand Slam singles titles?",
      options: ["Roger Federer", "Rafael Nadal", "Novak Djokovic", "Pete Sampras"],
      answer: "Novak Djokovic",
    },
    {
      question: "How many players are on a basketball team on the court at once?",
      options: ["4", "6", "5", "7"],
      answer: "5",
    },
  ],
  hard: [
    {
      question: "Who won the Ballon d'Or in 2018?",
      options: ["Cristiano Ronaldo", "Lionel Messi", "Luka Modric", "Neymar"],
      answer: "Luka Modric",
    },
    {
      question: "Which country won the first ever FIFA World Cup in 1930?",
      options: ["Brazil", "Argentina", "Uruguay", "Italy"],
      answer: "Uruguay",
    },
    {
      question: "How many Grand Slam titles did Pete Sampras win in his career?",
      options: ["12", "14", "16", "10"],
      answer: "14",
    },
    {
      question: "In what year did Muhammad Ali defeat Sonny Liston for the first time?",
      options: ["1960", "1964", "1968", "1970"],
      answer: "1964",
    },
    {
      question: "Which NBA team has won the most championships?",
      options: ["Chicago Bulls", "Golden State Warriors", "Los Angeles Lakers", "Boston Celtics"],
      answer: "Boston Celtics",
    },
  ],
}

const difficultyConfig = {
  easy:   { label: 'Easy',   emoji: '🟢', color: '#4caf50', desc: 'Perfect for beginners' },
  medium: { label: 'Medium', emoji: '🟡', color: '#f5a623', desc: 'For sports fans' },
  hard:   { label: 'Hard',   emoji: '🔴', color: '#e94560', desc: 'For true sports experts' },
}

export default function Quiz() {
  const [difficulty, setDifficulty] = useState(null)
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  function startQuiz(level) {
    setDifficulty(level)
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
  }

  function handleAnswer(option) {
    if (selected) return
    setSelected(option)
    if (option === allQuestions[difficulty][current].answer) setScore(score + 1)
  }

  function handleNext() {
    if (current + 1 >= allQuestions[difficulty].length) {
      setFinished(true)
    } else {
      setCurrent(current + 1)
      setSelected(null)
    }
  }

  function handleRestart() {
    setDifficulty(null)
    setFinished(false)
  }

  if (!difficulty) {
    return (
      <div className="card">
        <div className="trophy">🏆</div>
        <h1 className="title">Sports Quiz</h1>
        <p className="subtitle">Select a difficulty to begin</p>
        <div className="difficulty-buttons">
          {Object.entries(difficultyConfig).map(([key, config]) => (
            <button key={key} className="difficulty-btn" onClick={() => startQuiz(key)}
              style={{ borderColor: config.color }}>
              <span className="diff-emoji">{config.emoji}</span>
              <div className="diff-info">
                <span className="diff-label" style={{ color: config.color }}>{config.label}</span>
                <span className="diff-desc">{config.desc}</span>
              </div>
              <span className="diff-arrow">→</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  const questions = allQuestions[difficulty]
  const question = questions[current]
  const config = difficultyConfig[difficulty]

  if (finished) {
    const percentage = Math.round((score / questions.length) * 100)
    return (
      <div className="card">
        <div className="trophy">🏆</div>
        <h1 className="title">Quiz Complete!</h1>
        <p className="score-text">You scored</p>
        <p className="big-score">{score} / {questions.length}</p>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${percentage}%`, background: config.color }}></div>
        </div>
        <p className="percentage">{percentage}%</p>
        <p className="difficulty-tag" style={{ color: config.color }}>{config.emoji} {config.label} Mode</p>
        <p className="verdict">
          {percentage === 100 ? '🌟 Perfect score! You are a sports genius!' :
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
        <span className="badge" style={{ background: config.color }}>{config.emoji} {config.label}</span>
        <span className="counter">{current + 1} / {questions.length}</span>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${(current / questions.length) * 100}%`, background: config.color }}></div>
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
          {selected === question.answer ? '✅ Correct!' : '❌ Wrong! The answer is ' + question.answer}
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
