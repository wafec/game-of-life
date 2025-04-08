import React, { useEffect, useRef, useState } from "react";
import GameBoard from "../components/GameBoard";
import ControlBoard from "../components/ControlBoard";
import {
  flipSnapshotCell,
  GameSnapshot,
  moveToNextRound,
} from "../services/game-intel";
import { Status } from "../models/types";
import './GamePage.css'

function useInterval(callback: any, delay: any) {
  const savedCallback: any = useRef(undefined);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default function GamePage() {
  const rows: number = 50;
  const cols: number = 50;
  const delay = 100;
  const defaultSnapshot = GameSnapshot.create(rows, cols)
  defaultSnapshot.set(25, 25, Status.Alive)
  defaultSnapshot.set(24, 25, Status.Alive)
  defaultSnapshot.set(25, 24, Status.Alive)
  defaultSnapshot.set(26, 25, Status.Alive)
  defaultSnapshot.set(26, 26, Status.Alive)

  const [snapshot, setSnapshot]: [GameSnapshot, any] = useState(
    defaultSnapshot,
  );
  const [playing, setPlaying]: [boolean, any] = useState(false);
  const [generation, setGeneration]: [number, any] = useState(0)

  useInterval(
    () => {
      setSnapshot(moveToNextRound(snapshot));
      setGeneration((generation: number) => generation + 1)
    },
    playing ? delay : null,
  );

  const handleReset = () => {
    setPlaying(false)
    setSnapshot(defaultSnapshot);
    setGeneration(0)
  };

  const handlePlay = () => {
    setPlaying(!playing);
  };

  const handleNext = () => {
    setSnapshot(moveToNextRound(snapshot));
    setGeneration((generation: number) => generation + 1)
  };

  const handleOnFlip = (row: number, col: number) => {
    setSnapshot(flipSnapshotCell(snapshot, row, col));
  };

  return (
    <div className='game-page-container'>
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
