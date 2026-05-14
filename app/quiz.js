'use client'

import { useState, useEffect } from 'react'

const allQuestions = {
  easy: [
    { question: "Which sport uses a yellow ball?", options: ["Football", "Tennis", "Basketball", "Cricket"], answer: "Tennis" },
    { question: "How many players are on a volleyball team?", options: ["5", "7", "6", "8"], answer: "6" },
    { question: "Which country invented basketball?", options: ["UK", "Australia", "USA", "Canada"], answer: "Canada" },
    { question: "How long is an Olympic swimming pool in metres?", options: ["25m", "100m", "50m", "75m"], answer: "50m" },
    { question: "Which sport is known as the king of sports?", options: ["Basketball", "Tennis", "Football", "Cricket"], answer: "Football" },
    { question: "How many holes are in a standard golf course?", options: ["9", "12", "18", "24"], answer: "18" },
    { question: "What colour is the centre of an archery target?", options: ["Red", "Blue", "Black", "Yellow"], answer: "Yellow" },
    { question: "Which country hosts the Tour de France?", options: ["Italy", "Spain", "Germany", "France"], answer: "France" },
    { question: "How many players are on a rugby union team?", options: ["11", "13", "15", "17"], answer: "15" },
    { question: "In which sport would you perform a breaststroke?", options: ["Athletics", "Cycling", "Swimming", "Rowing"], answer: "Swimming" },
  ],
  medium: [
    { question: "Who holds the record for the most goals in a single World Cup tournament?", options: ["Pele", "Ronaldo", "Just Fontaine", "Gerd Muller"], answer: "Just Fontaine" },
    { question: "Which country has won the most Rugby World Cup titles?", options: ["Australia", "South Africa", "New Zealand", "England"], answer: "New Zealand" },
    { question: "In what year were women first allowed to compete in the Olympics?", options: ["1896", "1900", "1920", "1928"], answer: "1900" },
    { question: "Which NBA player is known as The Black Mamba?", options: ["LeBron James", "Michael Jordan", "Kobe Bryant", "Shaquille ONeal"], answer: "Kobe Bryant" },
    { question: "How many Grand Slam tournaments are there in tennis?", options: ["2", "3", "4", "5"], answer: "4" },
    { question: "Which country won the 2019 Cricket World Cup?", options: ["Australia", "India", "England", "New Zealand"], answer: "England" },
    { question: "What is the maximum score in a single bowling frame?", options: ["10", "20", "30", "25"], answer: "30" },
    { question: "Which athlete won 4 gold medals at the 1936 Berlin Olympics?", options: ["Carl Lewis", "Jesse Owens", "Usain Bolt", "Jim Thorpe"], answer: "Jesse Owens" },
    { question: "How many points is a penalty kick worth in rugby union?", options: ["2", "3", "4", "5"], answer: "3" },
    { question: "Which country has won the most Davis Cup titles in tennis?", options: ["USA", "Australia", "Spain", "France"], answer: "USA" },
  ],
  hard: [
    { question: "Who was the first footballer to win 5 Ballon d'Or awards?", options: ["Cristiano Ronaldo", "Zinedine Zidane", "Ronaldo", "Lionel Messi"], answer: "Lionel Messi" },
    { question: "Which team won the first ever UEFA Champions League in 1956?", options: ["Barcelona", "AC Milan", "Real Madrid", "Juventus"], answer: "Real Madrid" },
    { question: "What is the longest tennis match ever played in hours?", options: ["8 hours", "9 hours", "11 hours", "6 hours"], answer: "11 hours" },
    { question: "Which country has won the most Olympic medals in wrestling?", options: ["Russia", "Japan", "Turkey", "USA"], answer: "USA" },
    { question: "Who scored the fastest hat trick in Premier League history?", options: ["Robbie Fowler", "Michael Owen", "Sergio Aguero", "Alan Shearer"], answer: "Robbie Fowler" },
    { question: "In what year did Tiger Woods win his first Masters?", options: ["1995", "1996", "1997", "1998"], answer: "1997" },
    { question: "Which boxer was nicknamed The Real Deal?", options: ["Mike Tyson", "Lennox Lewis", "Evander Holyfield", "Oscar De La Hoya"], answer: "Evander Holyfield" },
    { question: "How many times has Brazil been relegated from the FIFA World Cup group stage?", options: ["0", "1", "2", "3"], answer: "1" },
    { question: "Which cyclist has won the Tour de France the most times?", options: ["Bernard Hinault", "Eddy Merckx", "Lance Armstrong", "Chris Froome"], answer: "Eddy Merckx" },
    { question: "What was Usain Bolt's world record time in the 100m?", options: ["9.58s", "9.63s", "9.72s", "9.81s"], answer: "9.58s" },
  ],
}

const difficultyConfig = {
  easy:   { label: 'Easy',   emoji: '🟢', color: '#4caf50', desc: 'Perfect for beginners' },
  medium: { label: 'Medium', emoji: '🟡', color: '#f5a623', desc: 'For sports fans' },
  hard:   { label: 'Hard',   emoji: '🔴', color: '#e94560', desc: 'For true sports experts' },
}

export default function Quiz() {
  const [screen, setScreen] = useState('name') // name, difficulty, quiz, results, history
  const [playerName, setPlayerName] = useState('')
  const [difficulty, setDifficulty] = useState(null)
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [history, setHistory] = useState([])

  // Load history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('quiz-history')
    if (saved) setHistory(JSON.parse(saved))
  }, [])

  function handleNameSubmit() {
    if (playerName.trim() === '') return
    setScreen('difficulty')
  }

  function startQuiz(level) {
    setDifficulty(level)
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setScreen('quiz')
  }

  function handleAnswer(option) {
    if (selected) return
    setSelected(option)
    if (option === allQuestions[difficulty][current].answer) setScore(score + 1)
  }

  function handleNext() {
    if (current + 1 >= allQuestions[difficulty].length) {
      const finalScore = selected === allQuestions[difficulty][current].answer ? score + 1 : score
      const newEntry = {
        name: playerName,
        score: finalScore,
        total: allQuestions[difficulty].length,
        difficulty,
        date: new Date().toLocaleDateString(),
        percentage: Math.round((finalScore / allQuestions[difficulty].length) * 100)
      }
      const updatedHistory = [newEntry, ...history].slice(0, 10) // keep last 10
      setHistory(updatedHistory)
      localStorage.setItem('quiz-history', JSON.stringify(updatedHistory))
      setScore(finalScore)
      setScreen('results')
    } else {
      setCurrent(current + 1)
      setSelected(null)
    }
  }

  function handleRestart() {
    setScreen('name')
    setPlayerName('')
    setDifficulty(null)
  }

  const config = difficulty ? difficultyConfig[difficulty] : null

  // Name screen
  if (screen === 'name') {
    return (
      <div className="card">
        <div className="trophy">🏆</div>
        <h1 className="title">Sports Quiz</h1>
        <p className="subtitle">Enter your name to begin</p>
        <div className="name-input-wrapper">
          <input
            className="name-input"
            type="text"
            placeholder="Your name..."
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
            autoFocus
          />
          <button className="btn-next" onClick={handleNameSubmit}>
            Continue →
          </button>
        </div>
        {history.length > 0 && (
          <button className="btn-history" onClick={() => setScreen('history')}>
            📊 View Score History
          </button>
        )}
      </div>
    )
  }

  // History screen
  if (screen === 'history') {
    return (
      <div className="card">
        <h1 className="title">📊 Score History</h1>
        <p className="subtitle">Last {history.length} games</p>
        <div className="history-list">
          {history.map((entry, index) => (
            <div className="history-item" key={index}>
              <div className="history-left">
                <span className="history-name">{entry.name}</span>
                <span className="history-date">{entry.date} · {difficultyConfig[entry.difficulty].emoji} {entry.difficulty}</span>
              </div>
              <div className="history-right">
                <span className="history-score" style={{ color: difficultyConfig[entry.difficulty].color }}>
                  {entry.score}/{entry.total}
                </span>
                <span className="history-percent">{entry.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
        <button className="btn-next" style={{ marginTop: '1.5rem' }} onClick={() => setScreen('name')}>
          ← Back
        </button>
        <button className="btn-history" onClick={() => {
          localStorage.removeItem('quiz-history')
          setHistory([])
          setScreen('name')
        }}>
          🗑️ Clear History
        </button>
      </div>
    )
  }

  // Difficulty screen
  if (screen === 'difficulty') {
    return (
      <div className="card">
        <p className="welcome-text">Welcome, <strong>{playerName}</strong>! 👋</p>
        <h1 className="title">Choose Difficulty</h1>
        <div className="difficulty-buttons">
          {Object.entries(difficultyConfig).map(([key, config]) => (
            <button key={key} className="difficulty-btn" onClick={() => startQuiz(key)} style={{ borderColor: config.color }}>
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

  // Results screen
  if (screen === 'results') {
    const percentage = Math.round((score / allQuestions[difficulty].length) * 100)
    return (
      <div className="card">
        <div className="trophy">🏆</div>
        <h1 className="title">Well done, {playerName}!</h1>
        <p className="score-text">You scored</p>
        <p className="big-score">{score} / {allQuestions[difficulty].length}</p>
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
        <button className="btn-restart" onClick={() => setScreen('history')}>📊 View History</button>
        <button className="btn-history" onClick={handleRestart}>Play Again</button>
      </div>
    )
  }

  // Quiz screen
  const questions = allQuestions[difficulty]
  const question = questions[current]

  return (
    <div className="card">
      <div className="top-bar">
        <span className="badge" style={{ background: config.color }}>{config.emoji} {config.label}</span>
        <span className="counter">{current + 1} / {questions.length}</span>
      </div>
      <div className="player-tag">👤 {playerName}</div>
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
            <button key={option} className={cls} onClick={() => handleAnswer(option)}>{option}</button>
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
      <p className="score-tracker">Score: {score} · {playerName}</p>
    </div>
  )
}
