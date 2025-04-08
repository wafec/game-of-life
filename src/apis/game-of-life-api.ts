import {
  createDefaultGameSnapshot,
  flipSnapshotCell,
  GameSnapshot,
  moveToNextRound,
} from "../services/game-intel";

export type GameId = number;
export type GameFlip = {
  row: number;
  col: number;
};

export class GameOfLifeApi {
  gameStore: Map<GameId, GameSnapshot>;
  gameIdCounter: number = 0;

  static INSTANCE: GameOfLifeApi = GameOfLifeApi.create();

  constructor() {
    this.gameStore = new Map<GameId, GameSnapshot>();
  }

  startGame(): GameId {
    const gameId = this.gameIdCounter;
    this.gameStore.set(gameId, createDefaultGameSnapshot());
    this.gameIdCounter++;
    return gameId;
  }

  retrieveGame(id: GameId): GameSnapshot | undefined {
    if (!this.gameStore.has(id)) {
      throw new Error("game not found");
    }
    return this.gameStore.get(id);
  }

  nextGame(id: GameId, times: number = 1): GameSnapshot | undefined {
    let game = this.retrieveGame(id);
    for (let i: number = 0; i < times; i++) {
      game = moveToNextRound(game!);
    }
    this.gameStore.set(id, game!);
    return game;
  }

  flip(id: GameId, ...flip: GameFlip[]): GameSnapshot | undefined {
    let game = this.retrieveGame(id);
    for (const f of flip) {
      game = flipSnapshotCell(game!, f.row, f.col);
    }
    this.gameStore.set(id, game!);
    return game;
  }

  deleteGame(id: GameId): void {
    if (this.gameStore.has(id)) {
      this.gameStore.delete(id);
    }
  }

  static create(): GameOfLifeApi {
    return new GameOfLifeApi();
  }
}
