import React from "react";

export default function Square(props) {
  return (
    <button onClick={() => props.onMark(props.index)} className="board-cell">
      {props.value}
    </button>
  );
}
