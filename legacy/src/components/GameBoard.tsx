import React from "react";
import { OnFlipFunction, Status } from "../models/types";
import GameCell from "./GameCell";
import "./GameBoard.css";
import { GameBoardContext, GameBoardEventEmitter } from "./game-board-context";

export default function GameBoard({
  m,
  onFlip,
}: {
  m: Status[][];
  onFlip?: OnFlipFunction;
}) {
  const renderCol = (col: Status, rowIndex: number, colIndex: number) => {
    return <GameCell status={col} row={rowIndex} col={colIndex} />;
  };

  const renderRow = (row: Status[], rowIndex: number) => {
    return (
      <div className="row">
        {row.map((col, colIndex) => renderCol(col, rowIndex, colIndex))}
      </div>
    );
  };

  const eventEmitter: GameBoardEventEmitter = {
    flipCell: (row: number, col: number) => {
      if (onFlip) onFlip(row, col);
    },
  };

  return (
    <GameBoardContext.Provider value={eventEmitter}>
      <div>{m.map((row, rowIndex) => renderRow(row, rowIndex))}</div>
    </GameBoardContext.Provider>
  );
}
