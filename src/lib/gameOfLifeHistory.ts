import { createDefaultGameSnapshot, flipSnapshotCell, GameSnapshot, moveToNextRound } from "@/lib/gameOfLife";
import { GameFlip, GameId } from "@/model/types";

export class InMemoryGameOfLifeHistory {
    gameStore: {[key: GameId]: GameSnapshot};
    gameIdCounter: number = 0;
  
    static INSTANCE: InMemoryGameOfLifeHistory = InMemoryGameOfLifeHistory.create();
  
    constructor() {
      this.gameStore = {};
    }
  
    startGame(): GameId {
      const gameId = this.gameIdCounter;
      this.gameStore[gameId] = createDefaultGameSnapshot();
      console.log(this.gameStore)
      this.gameIdCounter++;
      return gameId;
    }
  
    retrieveGame(id: GameId): GameSnapshot | undefined {
      console.log(this.gameStore, this.gameIdCounter)
      if (!(id in this.gameStore)) {
        throw new Error("game not found");
      }
      return this.gameStore[id];
    }
  
    nextGame(id: GameId, times: number = 1): GameSnapshot | undefined {
      let game = this.retrieveGame(id);
      for (let i: number = 0; i < times; i++) {
        game = moveToNextRound(game!);
      }
      this.gameStore[id] = game!;
      return game;
    }
  
    flip(id: GameId, ...flip: GameFlip[]): GameSnapshot | undefined {
      let game = this.retrieveGame(id);
      for (const f of flip) {
        game = flipSnapshotCell(game!, f.row, f.col);
      }
      this.gameStore[id] = game!;
      return game;
    }
  
    deleteGame(id: GameId): void {
      if (id in this.gameStore) {
        delete this.gameStore[id];
      }
    }
  
    static create(): InMemoryGameOfLifeHistory {
      return new InMemoryGameOfLifeHistory();
    }
  }
  