import { useEffect, useState } from 'react';

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
  console.log(rowIndex);
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

const useGame = () => {
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

  const [boardUpdated, setBoardUpdate] = useState(false);

  useEffect(() => {
    const movingCell = findMovingCell(board);
    const newBoard = stopCell(movingCell);
    setBoard(newBoard);
  }, [boardUpdated]);



  const autoDropCell = () => {
    setInterval(() => {
      setBoard((prev) => {
        console.log('gg');
        const movingCell = findMovingCell(prev);
        const newBoard = moveCell(1, 0, movingCell, prev);
        return newBoard;
      });
      setBoardUpdate((prev) => !prev);
    }, 1000);
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

  const checkUnderCell = (movingCell: number[][]) => {
    for (let i = 0; i < movingCell.length; i++) {
      if (board[movingCell[i][0] + 1][movingCell[i][1]] === 2) {
        return true;
      }
    }

    return false;
  };

  const stopCell = (movingCell: number[][]) => {
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

  const keyHandler = (e) => {
    const keyValue = e.code;

    if (keyValue === 'ArrowDown') {
      const movingCell = findMovingCell(board);
      const newBoard = stopCell(movingCell);
      if (newBoard.flat().some((cell) => cell === 2)) {
        setBoard(newBoard);
      }

      if (!flingOutOfBoard(1, 0, movingCell)) {
        const newBoard = moveCell(1, 0, movingCell, board);
        setBoard(newBoard);
      }
    } else if (keyValue === 'ArrowLeft') {
      const movingCell = findMovingCell(board);
      if (!flingOutOfBoard(0, -1, movingCell)) {
        const newBoard = moveCell(0, -1, movingCell, board);
        setBoard(newBoard);
      }
    } else if (keyValue === 'ArrowRight') {
      const movingCell = findMovingCell(board);
      if (!flingOutOfBoard(0, 1, movingCell)) {
        const newBoard = moveCell(0, 1, movingCell, board);
        setBoard(newBoard);
      }
    } else if (keyValue === 'Space') {
      const movingCell = findMovingCell(board);
      if (movingCell.length === 0) return;
      const newBoard = structuredClone(board);
      movingCell.map((row) => {
        newBoard[row[0]][row[1]] = 0;
      });
      while (!flingOutOfBoard(1, 0, movingCell) && !checkUnderCell(movingCell)) {
        movingCell.map((row: number[]) => {
          row[0] += 1;
        });
      }
      movingCell.map((row) => {
        newBoard[row[0]][row[1]] = 2;
      });
      setBoard(newBoard);
    }
    setBoardUpdate((prev) => !prev);
  };

  return {
    board,
    keyHandler,
    autoDropCell,
  };
};

export default useGame;
