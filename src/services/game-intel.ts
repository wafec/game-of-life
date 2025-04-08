import { Status } from "../models/types";
import { copyMatrix } from "../utils/copy";

export type GameSnapshotTransformer = (
  cell: GameCellRef,
  neighbors: GameCellRef[],
) => GameCellRef;

class GameCellRef {
  row: number;
  col: number;
  status: Status;

  constructor(row: number, col: number, status: Status) {
    this.row = row;
    this.col = col;
    this.status = status;
  }

  clone(): GameCellRef {
    return new GameCellRef(this.row, this.col, this.status);
  }
}

export class GameSnapshot {
  statuses: Status[][];
  numberOfRows: number;
  numberOfColumns: number;

  constructor(
    statuses: Status[][],
    numberOfRows: number,
    numberOfColumns: number,
  ) {
    this.statuses = statuses;
    this.numberOfRows = numberOfRows;
    this.numberOfColumns = numberOfColumns;
  }

  static create(numberOfRows: number, numberOfColumns: number): GameSnapshot {
    const statuses: Status[][] = Array(numberOfRows);
    for (let row: number = 0; row < numberOfRows; row++) {
      statuses[row] = Array(numberOfColumns).fill(Status.Dead);
    }
    return new GameSnapshot(statuses, numberOfRows, numberOfColumns);
  }

  set(row: number, column: number, status: Status): void {
    this.statuses[row][column] = status;
  }

  transform(f: GameSnapshotTransformer): GameCellRef[] {
    const transformed: GameCellRef[] = [];
    for (let row: number = 0; row < this.numberOfRows; row++) {
      for (let col: number = 0; col < this.numberOfColumns; col++) {
        transformed.push(
          f(this.createCellRef(row, col), this.neighbors(row, col)),
        );
      }
    }
    return transformed;
  }

  neighbors(row: number, col: number): GameCellRef[] {
    const neighbors: GameCellRef[] = [];
    for (let _row: number = row - 1; _row < row + 2; _row++) {
      if (_row < 0 || _row >= this.numberOfRows) continue;
      for (let _col: number = col - 1; _col < col + 2; _col++) {
        if (_col < 0 || _col >= this.numberOfColumns) continue;
        if (_row == row && _col == col) continue;
        neighbors.push(this.createCellRef(_row, _col));
      }
    }
    return neighbors;
  }

  createCellRef(row: number, col: number): GameCellRef {
    return new GameCellRef(row, col, this.statuses[row][col]);
  }

  clone(): GameSnapshot {
    return new GameSnapshot(
      copyMatrix(this.statuses, this.numberOfRows, this.numberOfColumns),
      this.numberOfRows,
      this.numberOfColumns,
    );
  }

  population(): number {
    let count = 0;
    for (let row: number = 0; row < this.numberOfRows; row++) {
      for (let col: number = 0; col < this.numberOfColumns; col++) {
        if (this.statuses[row][col] == Status.Alive) {
          count++;
        }
      }
    }
    return count;
  }
}

function transformGameCell(
  current: GameCellRef,
  neighbors: GameCellRef[],
): GameCellRef {
  const newCellRef = current.clone();
  const live = neighbors.filter((n) => n.status == Status.Alive).length;
  if (current.status == Status.Alive) {
    if (live < 2 || live > 3) {
      newCellRef.status = Status.Dead;
    }
  } else if (live == 3) {
    newCellRef.status = Status.Alive;
  }
  return newCellRef;
}

export function moveToNextRound(snapshot: GameSnapshot): GameSnapshot {
  const dataSet = snapshot.transform(transformGameCell);
  const newGame = snapshot.clone();
  for (const dataPoint of dataSet) {
    newGame.set(dataPoint.row, dataPoint.col, dataPoint.status);
  }
  return newGame;
}

export function flipSnapshotCell(
  snapshot: GameSnapshot,
  row: number,
  col: number,
): GameSnapshot {
  const newGame = snapshot.clone();
  const currentStatus = snapshot.statuses[row][col];
  let nextStatus = Status.Alive;
  if (currentStatus == Status.Alive) nextStatus = Status.Dead;
  newGame.set(row, col, nextStatus);
  return newGame;
}
