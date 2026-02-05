import { useState } from 'react'


const scenarios = [
  { safe: 50, risky: [0, 200] },
  { safe: 80, risky: [20, 300] },
  { safe: 120, risky: [0, 500] },
]


export default function App() {
  const [step, setStep] = useState(0)
  const [history, setHistory] = useState([])
  const [result, setResult] = useState(null)


  const scenario = scenarios[step]


  function choose(type) {
    let payout
    if (type === 'safe') payout = scenario.safe
    else {
      payout = Math.random() < 0.5 ? scenario.risky[0] : scenario.risky[1]
    }


    setHistory([...history, { step, type, payout }])
    setResult(payout)
  }


  function next() {
    setResult(null)
    setStep(step + 1)
  }


  if (step >= scenarios.length) {
    const riskCount = history.filter(h => h.type === 'risky').length
    return (
      <div className="card">
        <h2>Session Complete</h2>
        <p>Total decisions: {history.length}</p>
        <p>Risky choices: {riskCount}</p>
        <p>Safe choices: {history.length - riskCount}</p>
        <button onClick={() => window.location.reload()}>Restart</button>
      </div>
    )
  }


  return (
    <div className="card">
      <h2>Scenario {step + 1}</h2>
      <p>Choose between:</p>


      {!result ? (
        <div className="actions">
          <button onClick={() => choose('safe')}>
            Safe: ₹{scenario.safe}
          </button>
          <button onClick={() => choose('risky')}>
            Risky: ₹{scenario.risky[0]} or ₹{scenario.risky[1]}
          </button>
        </div>
      ) : (
        <div className="result">
          <p>You got ₹{result}</p>
          <button onClick={next}>Next</button>
        </div>
      )}
    </div>
  )
}