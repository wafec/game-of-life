"use client";
import React, { useState } from "react";
import "./ControlBoard.css";
import useGameStore from "@/store/useGameStore";

type ControlBoardProps = {
  playing: boolean;
};

export default function ControlBoard({ playing = false }: ControlBoardProps) {
  const [nextN, setNextN] = useState(1);
  const next = useGameStore((state) => state.next);
  const reset = useGameStore((state) => state.reset);

  const handleNextNChange = (value: string) => {
    const v = parseInt(value);
    if (v > 0) {
      setNextN(v);
    }
  };

  const handleNextClick = async () => {
    await next(nextN);
  };

  const handleResetClick = async () => {
    await reset();
  };

  return (
    <div className="control-board">
      <div className="item" onClick={handleResetClick}>
        Reset
      </div>
      <div className="item" onClick={() => {}}>
        {playing ? "Pause" : "Play"}
      </div>
      <div className="item" onClick={handleNextClick}>
        Next
      </div>
      <div>
        <input type="number" value={nextN} onChange={(event) => handleNextNChange(event.target.value)}></input>
      </div>
    </div>
  );
}
