import blocks from '../block';

const findMovingCell = (board: number[][]) => {
  const movingCell: number[][] = [];

  board.map((row: number[], rowIndex: number) => {
    row.map((cell, cellIndex: number) => {
      if (cell === 1) {
        movingCell.push([rowIndex, cellIndex]);
      }
    });
  });

  return movingCell;
};

const moveCell = (
  rowIndex: number,
  cellIndex: number,
  movingCell: number[][],
  board: number[][],
) => {
  const newBoard = structuredClone(board);
  movingCell.map(([row, cell]: number[]) => {
    newBoard[row][cell] = 0;
  });

  movingCell.map(([row, cell]: number[]) => {
    const extendRowIndex = row + rowIndex;
    const extendCellIndex = cell + cellIndex;

    newBoard[extendRowIndex][extendCellIndex] = 1;
  });

  return newBoard;
};

const flingOutOfBoard = (rowIndex: number, cellIndex: number, movingCell: number[][]) => {
  for (let i = 0; i < movingCell.length; i++) {
    const extendRowIndex = movingCell[i][0] + rowIndex;
    const extendCellIndex = movingCell[i][1] + cellIndex;

    if (extendCellIndex < 0 || extendCellIndex > 9 || extendRowIndex < 0 || extendRowIndex > 19) {
      return true;
    }
  }

  return false;
};

const checkUnderCell = (movingCell: number[][], board: number[][]) => {
  for (let i = 0; i < movingCell.length; i++) {
    if (board[movingCell[i][0] + 1][movingCell[i][1]] === 2) {
      return true;
    }
  }

  return false;
};

const stopCell = (movingCell: number[][], board: number[][]) => {
  const newBoard = structuredClone(board);
  const newMovingCell = structuredClone(movingCell);
  newMovingCell.map((row: number[]) => {
    if (row[0] + 1 > 19 || newBoard[row[0] + 1][row[1]] === 2) {
      newMovingCell.map((row: number[]) => {
        newBoard[row[0]][row[1]] = 2;
      });
    }
  });
  return newBoard;
};

const createCell = () => {
  const randomNum = Math.floor(Math.random() * 7);
  const block = blocks[randomNum];
  console.log(block);
  return block;
};

export { findMovingCell, moveCell, flingOutOfBoard, checkUnderCell, stopCell, createCell };
