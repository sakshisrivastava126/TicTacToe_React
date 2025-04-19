'use client';
import {useState} from 'react';

type SquareProps = {
  value: string | null;
  onSquareClick: () => void;
  isWinning: boolean;
};
function Square({value, onSquareClick, isWinning} : SquareProps) {
  return (
    <button 
    className={`square ${isWinning ? "winning-square" : ""}`}
    onClick={onSquareClick}
  >
    {value}
  </button>
   ); 
}

function calculateWinner(squares: (string | null)[]): 
| { winner: string; winningLine: number[] } 
| "draw" 
| null { 
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
  for(let i = 0; i<lines.length; i++){
    const[a,b,c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return {winner: squares[a] , winningLine: [a,b,c]};
    }
  }
  if (squares.every((square) => square !== null)) {
    return "draw";
  }
  return null;
}

type BoardProps = {
  xIsNext: boolean;
  squares: (string | null)[];
  onPlay: (squares: (string | null)[]) => void;
};

function Board({xIsNext, squares, onPlay}: BoardProps){

  function handleClick(i : number){
    if(calculateWinner(squares) || squares[i] ){
      return;
    }
    const nextSquares = squares.slice();     //slice() creates a new copy of the squares array after every move nd treat it as immutable
    if(xIsNext){
      nextSquares[i] = 'X';
    }
    else{
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const result = calculateWinner(squares);
  let winningLine: number[] = [];
  let status;
  if(result && result !== "draw"){
    status = 'Winner: ' + result.winner;
    winningLine = result.winningLine;
  }
  else if(result === "draw"){
    status = 'Match Draw!'
  }
  else{
    status = 'Player: ' + (xIsNext ? "X" : "O");
  }
   return ( 
   <>
   <div className = "status">{status}</div>
   <div className="board-row">
   {[0, 1, 2].map((i) => (
        <Square
          key={i}
          value={squares[i]}
          onSquareClick={() => handleClick(i)}
          isWinning={winningLine.includes(i)}
        />
      ))}
    </div>
    <div className="board-row">
      {[3, 4, 5].map((i) => (
        <Square
          key={i}
          value={squares[i]}
          onSquareClick={() => handleClick(i)}
          isWinning={winningLine.includes(i)}
        />
      ))}
    </div>
    <div className="board-row">
      {[6, 7, 8].map((i) => (
        <Square
          key={i}
          value={squares[i]}
          onSquareClick={() => handleClick(i)}
          isWinning={winningLine.includes(i)}
        />
      ))}
   </div>
   </>
  );
}

export default function Game(){
  const [xIsNext, setXIsNext] = useState(true);
  const[history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1];

  function handlePlay(nextSquares: (string | null)[]): void{
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }
  
  // function jumpTo(nextMove : number) : void {
  //   setHistory(history.slice(0, nextMove + 1));
  //   setXIsNext(nextMove % 2 === 0);
  // }

  // const moves = history.map((squares, move) => {    //THIS IS FOR IF YOU WANT TO SHOW HISTORY
  //   let description;
  //   if(move > 0){
  //     description = 'Go to move #' + move;
  //   }
  //   else{
  //     description = 'Go to game start';
  //   }
  //   return (
  //     <li key={move}>
  //       <button onClick={() => jumpTo(move)}>{description}</button>
  //     </li>
  //   );
  // });

  return(
    <div className = "game">
      <div className = "game-board">
        <Board xIsNext = {xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      {/* <div className="game-info">
        <ol>{moves}</ol>
      </div> */}
    </div>
  );
}




