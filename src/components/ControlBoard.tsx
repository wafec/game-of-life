import React, { useState } from "react";
import { OnClickFunction } from "../models/types";
import "./ControlBoard.css";

export default function ControlBoard({
  onReset,
  onPlay,
  onNext,
  playing = false
}: {
  onReset?: OnClickFunction;
  onPlay?: OnClickFunction;
  onNext?: OnClickFunction;
  playing?: boolean;
}) {

  return (
    <div className="control-board">
      <div className="item" onClick={onReset}>
        Reset
      </div>
      <div className="item" onClick={onPlay}>
        {playing ? "Pause" : "Play"}
      </div>
      <div className="item" onClick={onNext}>
        Next
      </div>
    </div>
  );
}
