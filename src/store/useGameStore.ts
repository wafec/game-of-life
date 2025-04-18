import { Status } from "@/model/types";
import { InMemoryGameOfLifeHistory } from "@/lib/gameOfLifeHistory";
import { create } from "zustand";

export type GameStoreProps = {
  board: Status[][];
  gameId: number;
  generation: number;
  population: number;
  playing: boolean;
  flip: (row: number, col: number) => Promise<void>;
  next: (times: number) => Promise<void>;
  reset: () => Promise<void>;
  start: () => Promise<void>;
  loop: (playing: boolean) => Promise<void>;
};

export default create<GameStoreProps>((set, get) => ({
  board: [],
  gameId: -1,
  generation: 0,
  population: 0,
  inLoop: false,
  playing: false,
  flip: async (row: number, col: number) => {
    const game = InMemoryGameOfLifeHistory.INSTANCE.flip(get().gameId, {
      row,
      col,
    });
    set({ board: game?.statuses, population: game?.population() });
  },
  next: async (times: number) => {
    const game = InMemoryGameOfLifeHistory.INSTANCE.nextGame(
      get().gameId,
      times,
    );
    set((state) => ({
      board: game?.statuses,
      population: game?.population(),
      generation: state.generation + times,
    }));
  },
  reset: async () => {
    InMemoryGameOfLifeHistory.INSTANCE.deleteGame(get().gameId);
    const gameId = InMemoryGameOfLifeHistory.INSTANCE.startGame();
    const game = InMemoryGameOfLifeHistory.INSTANCE.retrieveGame(gameId);
    set({
      gameId: gameId,
      board: game?.statuses,
      generation: 1,
      population: game?.population(),
    });
  },
  start: async () => {
    const gameId = InMemoryGameOfLifeHistory.INSTANCE.startGame();
    const game = InMemoryGameOfLifeHistory.INSTANCE.retrieveGame(gameId);
    set((state) => ({
      board: game?.statuses,
      gameId: gameId,
      population: game?.population(),
      generation: state.generation + 1,
    }));
  },
  loop: async (playing: boolean) => {
    set({playing: playing})

    function repeatCallingNext() {
        if (!get().playing) return;
        const game = InMemoryGameOfLifeHistory.INSTANCE.nextGame(get().gameId, 1)
        set((state) => ({board: game?.statuses, population: game?.population(), generation: state.generation + 1}))
        setTimeout(repeatCallingNext, 300);
    }

    setTimeout(repeatCallingNext, 0);
  }
}));
