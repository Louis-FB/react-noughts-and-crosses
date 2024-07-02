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

    const updatedSquares = [...squares];

    if (xTurn) {
      updatedSquares[id] = "X";
    } else {
      updatedSquares[id] = "O";
    }

    setXTurn(!xTurn);
    setSquares(updatedSquares);
  };

  const resetBoard = () => {
    setWinner(null);
    const newArray = new Array(9).fill(null);
    setSquares(newArray);
    setXTurn(true);
  };

  const checkWin = () => {
    const patterns = [
      [0, 1, 2], // row 1
      [3, 4, 5], // row 2
      [6, 7, 8], // row 3
      [0, 3, 6], // col 1
      [1, 4, 7], // col 2
      [2, 5, 8], // col 3
      [0, 4, 8], // diagonal right
      [2, 4, 6], // diagonal left
    ];

    for (let i = 0; i < patterns.length; ++i) {
      if (!squares[patterns[i][0]]) continue;

      if (
        squares[patterns[i][0]] == squares[patterns[i][1]] &&
        squares[patterns[i][0]] == squares[patterns[i][2]]
      ) {
        setWinner(squares[patterns[i][0]]);
        return;
      }
    }
  };

  useEffect(() => {
    checkWin();
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
      {winner ? <p>{winner} won!</p> : ""}
      <Footer onReset={resetBoard} />
    </>
  );
}

export default App;
