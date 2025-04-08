import React from "react";
import { render, fireEvent } from "@testing-library/react";
import GameCell from "./GameCell";
import { Status } from "../models/types";
import { GameBoardContext } from "./game-board-context";

describe("GameCell Component", () => {
  it("renders with the correct class based on status", () => {
    const mockEmitter = { flipCell: jest.fn() };
    const { container } = render(
      <GameBoardContext.Provider value={mockEmitter}>
        <GameCell status={Status.Alive} row={0} col={0} />
      </GameBoardContext.Provider>,
    );

    const cell = container.firstChild;
    expect(cell).toHaveClass("game-cell");
    expect(cell).toHaveClass("alive");
  });

  it("calls flipCell on click", () => {
    const mockEmitter = { flipCell: jest.fn() };
    const { container } = render(
      <GameBoardContext.Provider value={mockEmitter}>
        <GameCell status={Status.Dead} row={1} col={1} />
      </GameBoardContext.Provider>,
    );

    const cell = container.firstChild;
    fireEvent.click(cell!);

    expect(mockEmitter.flipCell).toHaveBeenCalledWith(1, 1);
  });
});
