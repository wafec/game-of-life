"use client";
import { useCallback, useEffect } from "react";
import GameCell from "./GameCell";
import "./GameBoard.css";
import { Status } from "@/model/types";
import useGameStore from "@/store/useGameStore";

export default function GameBoard() {
  const board = useGameStore((state) => state.board);
  const start = useCallback(useGameStore((state) => state.start), []);

  useEffect(() => {
    start();
  }, [start]);

  const renderCol = (col: Status, rowIndex: number, colIndex: number) => {
    return <GameCell key={`${rowIndex}-${colIndex}`} status={col} row={rowIndex} col={colIndex} />;
  };

  const renderRow = (row: Status[], rowIndex: number) => {
    return (
      <div key={rowIndex} className="row">
        {row.map((col, colIndex) => renderCol(col, rowIndex, colIndex))}
      </div>
    );
  };

  return <div>{board.map((row, rowIndex) => renderRow(row, rowIndex))}</div>;
}
