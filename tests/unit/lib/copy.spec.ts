import { copyMatrix } from '../../../src/lib/copy';

describe('copyMatrix', () => {
    it('should copy a matrix of numbers correctly', () => {
        const matrix = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ];
        const rows = 3;
        const cols = 3;

        const result = copyMatrix(matrix, rows, cols);

        expect(result).toEqual(matrix);
        expect(result).not.toBe(matrix); // Ensure it's a deep copy
    });

    it('should copy a matrix of strings correctly', () => {
        const matrix = [
            ['a', 'b', 'c'],
            ['d', 'e', 'f'],
            ['g', 'h', 'i'],
        ];
        const rows = 3;
        const cols = 3;

        const result = copyMatrix(matrix, rows, cols);

        expect(result).toEqual(matrix);
        expect(result).not.toBe(matrix); // Ensure it's a deep copy
    });

    it('should handle an empty matrix', () => {
        const matrix: number[][] = [];
        const rows = 0;
        const cols = 0;

        const result = copyMatrix(matrix, rows, cols);

        expect(result).toEqual([]);
    });

    it('should handle a matrix with one row', () => {
        const matrix = [[1, 2, 3]];
        const rows = 1;
        const cols = 3;

        const result = copyMatrix(matrix, rows, cols);

        expect(result).toEqual(matrix);
        expect(result).not.toBe(matrix); // Ensure it's a deep copy
    });

    it('should handle a matrix with one column', () => {
        const matrix = [[1], [2], [3]];
        const rows = 3;
        const cols = 1;

        const result = copyMatrix(matrix, rows, cols);

        expect(result).toEqual(matrix);
        expect(result).not.toBe(matrix); // Ensure it's a deep copy
    });
});