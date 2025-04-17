export enum Status {
    Alive,
    Dead,
  }
  
  export type OnClickFunction = () => void;
  export type OnFlipFunction = (row: number, col: number) => void;
  export type OnJumpNFunction = (n: number) => void;
  
  export type GameId = number;
  export type GameFlip = {
    row: number;
    col: number;
  };

  export type BoardModel = {
    rows: number
    cols: number
    statuses: Status[][]
  }