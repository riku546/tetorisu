import { useEffect, useState } from 'react';
import {
  findMovingCell,
  moveCell,
  flingOutOfBoard,
  checkUnderCell,
  stopCell,
  createCell,
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
    const solidCellCount_currentBoard = newBoard.flat().filter((cell) => cell === 2).length;
    if (solidCellCount < solidCellCount_currentBoard) {
      setSolidCellCount(solidCellCount_currentBoard);
      const block = createCell();
      block.map((row) => {
        newBoard[row[0]][row[1]] = 1;
      });
    }

    setBoard(newBoard);
  }, [boardUpdated]);

  const firstCreateCell = () => {
    const isFirstClick = board.flat().every((cell) => cell === 0);
    if (isFirstClick) {
      const newBoard = structuredClone(board);

      const block = createCell();
      block.map((row) => {
        newBoard[row[0]][row[1]] = 1;
      });
      setBoard(newBoard);
    }
  };

  const autoDropCell = () => {
    const isFirstClick = board.flat().every((cell) => cell === 0);
    if (!isFirstClick) return;
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
    firstCreateCell,
  };
};

export default useGame;
