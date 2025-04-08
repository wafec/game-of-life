export enum Status {
  Alive,
  Dead,
}

export type OnClickFunction = () => void;
export type OnFlipFunction = (row: number, col: number) => void;
