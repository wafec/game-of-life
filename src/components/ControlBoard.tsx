"use client";
import React, { useState } from "react";
import "./ControlBoard.css";
import useGameStore from "@/store/useGameStore";

export default function ControlBoard() {
  const [nextN, setNextN] = useState(1);
  const next = useGameStore((state) => state.next);
  const reset = useGameStore((state) => state.reset);
  const loop = useGameStore((state) => state.loop);
  const [playing, setPlaying] = useState(false)

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

  const handlePlayClick = async () => {
    setPlaying(!playing)
    await loop(!playing)
  }

  return (
    <div className="control-board">
      <div className="item" onClick={handleResetClick}>
        Reset
      </div>
      <div className="item" onClick={handlePlayClick}>
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
