'use client'
import React, { useState } from "react";
import GameBoard from "./GameBoard";
import ControlBoard from "./ControlBoard";
import "./GamePage.css";
import useInterval from "@/hooks/useInterval";
import { GameSnapshot } from "@/lib/gameOfLife";
import GameInfo from "./GameInfo";

export default function GamePage() {
  const [playing, setPlaying]: [boolean, any] = useState(false);

  return (
    <div className="game-page-container">
      <div>
        <GameBoard />
      </div>
      <div>
        <ControlBoard
          playing={playing}
        />
      </div>
      <div>
        <GameInfo />
      </div>
    </div>
  );
}
