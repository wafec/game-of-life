import { GameOfLifeApi, GameFlip } from "./game-of-life-api";
import { createDefaultGameSnapshot } from "../services/game-intel";
import { Status } from "../models/types";

describe("GameOfLifeApi", () => {
  let api: GameOfLifeApi;

  beforeEach(() => {
    api = GameOfLifeApi.create();
  });

  it("should start a new game and return a valid game ID", () => {
    const gameId = api.startGame();
    expect(gameId).toBe(0);
    const game = api.retrieveGame(gameId);
    expect(game).toEqual(createDefaultGameSnapshot());
  });

  it("should retrieve an existing game by ID", () => {
    const gameId = api.startGame();
    const game = api.retrieveGame(gameId);
    expect(game).toBeDefined();
  });

  it("should throw an error when retrieving a non-existent game", () => {
    expect(() => api.retrieveGame(999)).toThrow("game not found");
  });

  it("should move the game to the next round", () => {
    const gameId = api.startGame();
    const initialGame = api.retrieveGame(gameId);
    const nextGame = api.nextGame(gameId);
    expect(nextGame).not.toEqual(initialGame);
  });

  it("should flip cells in the game snapshot", () => {
    const gameId = api.startGame();
    const flips: GameFlip[] = [
      { row: 0, col: 0 },
      { row: 1, col: 1 },
    ];
    const updatedGame = api.flip(gameId, ...flips);
    expect(updatedGame).toBeDefined();
    expect(updatedGame?.statuses[0][0]).toBe(Status.Alive);
    expect(updatedGame?.statuses[1][1]).toBe(Status.Alive);
  });

  it("should delete an existing game", () => {
    const gameId = api.startGame();
    api.deleteGame(gameId);
    expect(() => api.retrieveGame(gameId)).toThrow("game not found");
  });

  it("should do nothing when deleting a non-existent game", () => {
    expect(() => api.deleteGame(999)).not.toThrow();
  });
});
