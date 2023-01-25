//css
import './App.css';

//react
import {useCallback, useEffect, useState} from 'react';

//data
import {wordsList} from './data/words' 

//components
import StartScreen from './components/StartScreen';
import GameOver from './components/GameOver';
import Game from './components/Game';

const stage = [
  {id:1, name: 'start'},
  {id:2, name:'game'},
  {id:3, name:'end'}
];

function App() {

  const guessesQuantity = 3;

  const [gameStage, setGameStage] = useState(stage[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]); 

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQuantity);
  const [score, setScore] = useState(0);

  
  const pickWordAndCategory = useCallback(() =>{
    //random category
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];
    
    //random word
    const word = words[category][Math.floor(Math.random() * words[category].length)];

    return {category, word}; 
  },[words])

  const startGame = useCallback(()=>{

    clearLetterStates();
    const {category, word} = pickWordAndCategory();

    let wordLetters = word.split('');

    wordLetters = wordLetters.map((letter) => letter.toLowerCase());

    setPickedCategory(category);
    setPickedWord(word);
    setLetters(wordLetters);

    setGameStage(stage[1].name);   
   
  }, [pickWordAndCategory])
  
  const verifyLetter = (letter) =>{
   const normalizedLetter = letter.toLowerCase();

   if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter) ){
    return;
   }


   if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters)=>[...actualGuessedLetters, letter]);
   }else{
      setWrongLetters((actualWrongLetters)=>[...actualWrongLetters, normalizedLetter]);
      setGuesses((actualGuesses) => actualGuesses -1);
    }

  }

  const retry = ()=>{
    setScore(0);
    setGuesses(guessesQuantity);
    setGameStage(stage[0].name);
    
  }


const clearLetterStates= ()=>{
       setGuessedLetters([]);
       setWrongLetters([]);
    
  }

  //check if guesses ended
  useEffect(()=>{
    if(guesses === 0){
      clearLetterStates();
      setGameStage(stage[2].name);
    }
  }, [guesses]);



  //win condition
  useEffect(()=>{
  
    let uniqueLetters =[...new Set(letters)];
  
      if(guessedLetters.length === uniqueLetters.length && gameStage === stage[1].name){
        setScore(score + 100);
        startGame();;
    }
    
  
  }, [guessedLetters, letters, startGame, gameStage, score])

  

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame}/>}
      {gameStage === 'game' &&  <Game 
                                      verifyLetter={verifyLetter} 
                                      pickedWord={pickedWord}
                                      pickedCategory={pickedCategory}
                                      letters={letters}
                                      guessedLetters={guessedLetters}
                                      wrongLetters={wrongLetters}
                                      guesses={guesses}
                                      score={score}
                                       />}
      {gameStage === 'end' &&  <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;
