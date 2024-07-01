import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Square from "./Square";
import Footer from "./Footer";

function App() {
  const [squares, setSquares] = useState(new Array(9).fill(null));
  const [xTurn, setXTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  const markBoard = (id) => {
    if (squares[id] || winner) return;

    const updatedSquares = [...squares]; // duplicate to fill

    if (xTurn) {
      updatedSquares[id] = "X";
    } else {
      updatedSquares[id] = "O";
    }

    setXTurn(!xTurn);
    setSquares(updatedSquares);
    //checkWin();

    // check win
  };

  const resetBoard = () => {
    setWinner(null);
    const newArray = new Array(9).fill(null);
    setSquares(newArray);
    setXTurn(true);
  };

  const checkWin = () => {
    console.log(squares);
    // array of win patterns // loop over
    const patterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < patterns.length; ++i) {
      console.log(
        `Pattern ${i}\nsquare 1: ${squares[patterns[i][0]]} square 2: ${
          squares[patterns[i][1]]
        } square 3: ${squares[patterns[i][2]]}`
      );
      if (!squares[patterns[i][1]]) {
        console.log("No match");
        continue;
      }

      if (
        squares[patterns[i][0]] == squares[patterns[i][1]] &&
        squares[patterns[i][0]] == squares[patterns[i][2]]
      ) {
        setWinner(squares[i][0]);
        // console.log(
        //   `Matched. Winner is ${winner} value (${squares[patterns[i][0]]})`
        // );
        return;
      }
    }
  };

  useEffect(() => {
    checkWin();
    console.log("Use effecting");
  }, [squares]);

  return (
    <>
      <Header />
      <div className="content">
        <div className="board-container">
          {squares.map((item, index) =>
            item ? (
              <Square
                onMark={markBoard}
                value={item}
                key={index}
                index={index}
              />
            ) : (
              <Square
                onMark={markBoard}
                value={" "}
                key={index}
                index={index}
              />
            )
          )}
        </div>
      </div>
      {winner ? <p>{winner} won!</p> : <p>No winner</p>}
      <Footer onReset={resetBoard} />
    </>
  );
}

export default App;
