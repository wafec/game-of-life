import { GameSnapshot, flipSnapshotCell } from "./game-intel";
import { Status } from "../models/types";

describe("flipSnapshotCell", () => {
  it("should flip a cell from Dead to Alive", () => {
    const snapshot = GameSnapshot.create(3, 3);
    const row = 1;
    const col = 1;

    const updatedSnapshot = flipSnapshotCell(snapshot, row, col);

    expect(updatedSnapshot.statuses[row][col]).toBe(Status.Alive);
    expect(snapshot.statuses[row][col]).toBe(Status.Dead);
  });

  it("should flip a cell from Alive to Dead", () => {
    const snapshot = GameSnapshot.create(3, 3);
    const row = 1;
    const col = 1;
    snapshot.set(row, col, Status.Alive);

    const updatedSnapshot = flipSnapshotCell(snapshot, row, col);

    expect(updatedSnapshot.statuses[row][col]).toBe(Status.Dead);
    expect(snapshot.statuses[row][col]).toBe(Status.Alive);
  });

  it("should not affect other cells in the snapshot", () => {
    const snapshot = GameSnapshot.create(3, 3);
    snapshot.set(0, 0, Status.Alive);
    snapshot.set(2, 2, Status.Alive);
    const row = 1;
    const col = 1;

    const updatedSnapshot = flipSnapshotCell(snapshot, row, col);

    expect(updatedSnapshot.statuses[0][0]).toBe(Status.Alive);
    expect(updatedSnapshot.statuses[2][2]).toBe(Status.Alive);
    expect(updatedSnapshot.statuses[row][col]).toBe(Status.Alive);
  });
});
