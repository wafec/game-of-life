"use client";
import GameBoard from "./GameBoard";
import ControlBoard from "./ControlBoard";
import "./GamePage.css";
import GameInfo from "./GameInfo";

export default function GamePage() {


  return (
    <div className="game-page-container">
      <div>
        <GameBoard />
      </div>
      <div>
        <ControlBoard />
      </div>
      <div>
        <GameInfo />
      </div>
    </div>
  );
}
