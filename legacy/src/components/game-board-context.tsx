import React from "react";

export interface GameBoardEventEmitter {
  flipCell(row: number, col: number): void;
}

const noop: GameBoardEventEmitter = {
  flipCell: () => {},
};

export const GameBoardContext = React.createContext(noop);
