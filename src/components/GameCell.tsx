import React, { useContext } from "react";
import { Status } from "../models/types";
import "./GameCell.css";
import { GameBoardContext, GameBoardEventEmitter } from "./game-board-context";

export default function GameCell({
  status,
  row,
  col,
}: {
  status: Status;
  row: number;
  col: number;
}) {
  const emitter: GameBoardEventEmitter = useContext(GameBoardContext);

  const handleClick = () => {
    emitter.flipCell(row, col);
  };

  return (
    <div
      className={`game-cell ${status == Status.Alive && "alive"}`}
      onClick={handleClick}
    />
  );
}
