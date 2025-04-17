"client";

import "./GameCell.css";
import { Status } from "@/model/types";
import useGameStore from "@/store/useGameStore";

type GameCellProps = {
  status: Status;
  row: number;
  col: number;
};

export default function GameCell({ status, row, col }: GameCellProps) {
  const flip = useGameStore((state) => state.flip);

  const handleFlipClick = async () => {
    await flip(row, col);
  };

  return (
    <div
      className={`game-cell ${status == Status.Alive && "alive"}`}
      onClick={handleFlipClick}
    />
  );
}
