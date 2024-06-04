import React from 'react';
import { useState } from 'react';

const useGame = () => {
  // ArrowLeft
  // ArrowDown
  //  ArrowRigh

  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const stopMovingCell = (rowIndex: number, cellIndex: number, movingCell: number[][]) => {
    for (let i = 0; i < movingCell.length; i++) {
      const extendRowIndex = movingCell[i][0] + rowIndex;
      const extendCellIndex = movingCell[i][1] + cellIndex;
      console.log(extendRowIndex, extendCellIndex);
      if (extendCellIndex < 0 || extendCellIndex > 9 || extendRowIndex < 0 || extendRowIndex > 19) {
        return true;
      }
    }

    return false;
  };

  const findMovingCell = () => {
    const movingCell: number[][] = [];

    board.map((row: number[], rowIndex: number) => {
      row.map((cell, cellIndex: number) => {
        if (cell === 1) {
          movingCell.push([rowIndex, cellIndex]);
        }
      });
    });
    console.log(movingCell);

    return movingCell;
  };

  const moveCell = (rowIndex: number, cellIndex: number, movingCell: number[][]) => {
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

  const keyHandler = (e) => {
    const keyValue = e.code;

    if (keyValue === 'ArrowDown') {
      const movingCell = findMovingCell();
      if (!stopMovingCell(1, 0, movingCell)) {
        const newBoard = moveCell(1, 0, movingCell);
        setBoard(newBoard);
      }
    } else if (keyValue === 'ArrowLeft') {
      const movingCell = findMovingCell();
      if (!stopMovingCell(0, -1, movingCell)) {
        const newBoard = moveCell(0, -1, movingCell);
        setBoard(newBoard);
      }
    } else if (keyValue === 'ArrowRight') {
      const movingCell = findMovingCell();
      if (!stopMovingCell(0, 1, movingCell)) {
        const newBoard = moveCell(0, 1, movingCell);
        setBoard(newBoard);
      }
    }
  };

  return {
    board,
    keyHandler,
  };
};

export default useGame;
