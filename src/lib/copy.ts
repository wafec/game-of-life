export function copyMatrix<T>(m: T[][], rows: number, cols: number): T[][] {
    const result: T[][] = Array(rows);
    for (let row: number = 0; row < rows; row++) {
      result[row] = Array(cols);
      for (let col: number = 0; col < cols; col++) {
        result[row][col] = m[row][col];
      }
    }
    return result;
  }
  