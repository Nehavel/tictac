import './App.css';
import Square from './Square';
import { useState } from 'react';
export default function Game(){
  const [isXNext, setIsXNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentSquares, setCurrentSquares] = useState(history[history.length - 1]);
console.log('History', history)
  function handlePlay(nextSquares){
    setCurrentSquares(nextSquares)
    setHistory([...history, nextSquares]);
    setIsXNext(!isXNext);
  }
  function jumpToStep(index){
    if(index === 0){
      setHistory([Array(9).fill(null)]);
      setCurrentSquares(history[0]);
    } else {
      setHistory(history.slice(0,index + 1));
      setCurrentSquares(history[index]);
    }

setIsXNext(index % 2 === 0);

  }
  const moves = history.map((squares,index) => {
    let move = '';
    if(index === 0){
      move = '#Start game'
    } else {
      move = `Go to - ${index} step #`;
    }
    return (<li key={index}>
<button onClick={() => jumpToStep(index)}>{move}</button>
</li> );  
  });
  return (
    <>
    <Board isXNext={isXNext} squares={currentSquares} onPlay={handlePlay}/>
    <div className="game=info">
      <ol>
      {moves}
      </ol>

    </div>
    </>
  );
}


function Board({isXNext, squares, onPlay}){
  // const [squares, setSquares] = useState(Array(9).fill(null));
  // const [isXNext, setIsXNext] = useState(true);

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  function handleClick(index){
  
    if(squares[index] || winner){
      return;
    }
    let nextSquares = [...squares];
    if(isXNext) {
      nextSquares[index] = 'X';
    } else {
      nextSquares[index] = 'O';
    }
    // setIsXNext(!isXNext);
    // setSquares(nextSquares);
    onPlay(nextSquares);

  }
  const winner = calculateWinner(squares);
  let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (isXNext ? "X" : "O");
    }

  return(<>
  <div>{status}</div>
  <div className="row">
  <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
  <Square value={squares[1]} onSquareClick={() =>handleClick(1)} />
  <Square value={squares[2]} onSquareClick={() =>handleClick(2)} />
  </div>
  <div className="row">
  <Square value={squares[3]} onSquareClick={() =>handleClick(3)} />
  <Square value={squares[4]} onSquareClick={() =>handleClick(4)} />
  <Square value={squares[5]} onSquareClick={() =>handleClick(5)} />
  </div>
  <div className="row">
  <Square value={squares[6]} onSquareClick={() =>handleClick(6)} />
  <Square value={squares[7]} onSquareClick={() =>handleClick(7)} />
  <Square value={squares[8]} onSquareClick={() =>handleClick(8)} />
  </div>
   
  </>);

}

