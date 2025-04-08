import React, { useState } from "react";
import { OnClickFunction, OnJumpNFunction } from "../models/types";
import "./ControlBoard.css";

export default function ControlBoard({
  onReset,
  onPlay,
  onNext,
  playing = false,
}: {
  onReset?: OnClickFunction;
  onPlay?: OnClickFunction;
  onNext?: OnJumpNFunction;
  playing?: boolean;
}) {
  const [nextN, setNextN]: [number, any] = useState(1)

  const handleNextNChange = (event: any) => {
    const v = parseInt(event.target.value)
    if (v > 0) {
      setNextN(v)
    }
  }

  return (
    <div className="control-board">
      <div className="item" onClick={onReset}>
        Reset
      </div>
      <div className="item" onClick={onPlay}>
        {playing ? "Pause" : "Play"}
      </div>
      <div className="item" onClick={() => onNext && onNext(nextN)}>
        Next
      </div>
      <div>
        <input type='number' value={nextN} onChange={handleNextNChange}></input>
      </div>
    </div>
  );
}
