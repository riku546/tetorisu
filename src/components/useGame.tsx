import { useEffect, useState } from 'react';
import {
  findMovingCell,
  moveCell,
  flingOutOfBoard,
  checkUnderCell,
  stopCell,
} from '../functions/functions';

const useGame = () => {
  const [board, setBoard] = useState([
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
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const [boardUpdated, setBoardUpdate] = useState(false);
  const [solidCellCount, setSolidCellCount] = useState(0);

  //ブロックを止める処理
  useEffect(() => {
    const movingCell = findMovingCell(board);
    const newBoard = stopCell(movingCell, board);
    
    setBoard(newBoard);
  }, [boardUpdated]);



  const autoDropCell = () => {
    setInterval(() => {
      setBoard((prev) => {
        const movingCell = findMovingCell(prev);
        const newBoard = moveCell(1, 0, movingCell, prev);
        return newBoard;
      });
      setBoardUpdate((prev) => !prev);
    }, 1000);
  };

  const keyHandler = (e) => {
    const keyValue = e.code;

    if (keyValue === 'ArrowDown') {
      const movingCell = findMovingCell(board);
      const newBoard = stopCell(movingCell, board);
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
      while (!flingOutOfBoard(1, 0, movingCell) && !checkUnderCell(movingCell, board)) {
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
