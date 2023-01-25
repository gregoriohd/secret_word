import './GameOver.css'

const GameOver = ({retry, score }) => {
  return (
    <div>
      <h1>Game Over</h1>
      <h2>
        Pontuação: <span>{score}</span>
      </h2>
      <button onClick={retry}>Reiniciar o jogo</button>
    </div>
  )
}

export default GameOver