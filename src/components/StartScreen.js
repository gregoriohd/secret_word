import './StartScreen.css'

const StartScreen = ({startGame}) => {
  return (
    <div className="start">
        <h1>Secret <span>WORDS</span></h1>
        <button onClick={startGame}>Play!</button>
    </div>
  )
}

export default StartScreen