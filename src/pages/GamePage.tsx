import React, { useState } from "react";
import GameBoard from "../components/GameBoard";
import ControlBoard from "../components/ControlBoard";
import { GameSnapshot } from "../services/game-intel";
import "./GamePage.css";
import { GameId, GameOfLifeApi } from "../apis/game-of-life-api";
import { useInterval } from "../hooks/use-interval";

export default function GamePage() {
  const delay: number = 100;
  const [gameId, setGameId]: [GameId, any] = useState(
    GameOfLifeApi.INSTANCE.startGame(),
  );
  const [snapshot, setSnapshot]: [GameSnapshot, any] = useState(
    GameOfLifeApi.INSTANCE.retrieveGame(gameId)!,
  );
  const [playing, setPlaying]: [boolean, any] = useState(false);
  const [generation, setGeneration]: [number, any] = useState(0);

  useInterval(
    () => {
      setSnapshot(GameOfLifeApi.INSTANCE.nextGame(gameId));
      setGeneration((generation: number) => generation + 1);
    },
    playing ? delay : null,
  );

  const handleReset = () => {
    setPlaying(false);
    const newGameId = GameOfLifeApi.INSTANCE.startGame();
    setGameId(newGameId);
    setSnapshot(GameOfLifeApi.INSTANCE.retrieveGame(newGameId)!);
    setGeneration(0);
    GameOfLifeApi.INSTANCE.deleteGame(gameId);
  };

  const handlePlay = () => {
    setPlaying(!playing);
  };

  const handleNext = () => {
    setSnapshot(GameOfLifeApi.INSTANCE.nextGame(gameId));
    setGeneration((generation: number) => generation + 1);
  };

  const handleOnFlip = (row: number, col: number) => {
    setSnapshot(GameOfLifeApi.INSTANCE.flip(gameId, { row, col }));
  };

  return (
    <div className="game-page-container">
      <div>
        <GameBoard m={snapshot.statuses} onFlip={handleOnFlip} />
      </div>
      <div>
        <ControlBoard
          onReset={handleReset}
          onPlay={handlePlay}
          onNext={handleNext}
          playing={playing}
        />
      </div>
      <div>
        <div>Population: {snapshot.population()}</div>
        <div>Generation: {generation}</div>
      </div>
    </div>
  );
}
