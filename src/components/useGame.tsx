import { useEffect, useState } from 'react';
import {
  findMovingCell,
  moveCell,
  flingOutOfBoard,
  checkUnderCell,
  stopCell,
  createCell,
  DropLine,
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
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const [boardUpdated, setBoardUpdate] = useState(false);
  const [solidCellCount, setSolidCellCount] = useState(0);

  useEffect(() => {
    //ブロックを止める処理
    const movingCell = findMovingCell(board);
    const newBoard = stopCell(movingCell, board);

    const solidCellCount_currentBoard = newBoard.flat().filter((cell) => cell === 2).length;
    //ブロック生成
    if (solidCellCount < solidCellCount_currentBoard) {
      setSolidCellCount(solidCellCount_currentBoard);
      //終了処理
      if (
        newBoard[1][3] === 2 ||
        newBoard[1][4] === 2 ||
        newBoard[1][5] === 2 ||
        newBoard[1][6] === 2
      ) {
        alert('fin');
        window.location.reload();
      }
      const block = createCell();
      block.map((row) => {
        newBoard[row[0]][row[1]] = 1;
      });
    }

    //横1列消す処理
    for (let i = 0; i < board.length; i++) {
      if (newBoard[i].every((cell) => cell === 2)) {
        for (let x = 0; x < newBoard[0].length; x++) {
          newBoard[i][x] = 0;
        }

        setSolidCellCount((prev) => prev - 10);
      }
    }

    //横１列消えたら、上のブロックを落とす
    // newBoard.map((row: number[], rowIndex: number) => {
    //   if (row.every((cell) => cell === 0)) { 
    //     const dropingCell = DropLine(newBoard);

    //     dropingCell.map((row) => {
    //       newBoard[row[0]][row[1]] = 0;
    //     });

    //     while (!flingOutOfBoard(1, 0, dropingCell) && !checkUnderCell(dropingCell, newBoard)) {
    //       dropingCell.map((row: number[]) => {
    //         row[0] += 1;
    //       });
    //     }

    //     dropingCell.map((row) => {
    //       newBoard[row[0]][row[1]] = 2;
    //     });
    //   }
    // });

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

    if (keyValue === 'ArrowDown' || keyValue === 'KeyS') {
      const movingCell = findMovingCell(board);
      const newBoard = stopCell(movingCell, board);
      if (newBoard.flat().some((cell) => cell === 2)) {
        setBoard(newBoard);
      }

      if (!flingOutOfBoard(1, 0, movingCell)) {
        const newBoard = moveCell(1, 0, movingCell, board);
        setBoard(newBoard);
      }
    } else if (keyValue === 'ArrowLeft' || keyValue === 'KeyA') {
      const movingCell = findMovingCell(board);
      if (!flingOutOfBoard(0, -1, movingCell)) {
        const newBoard = moveCell(0, -1, movingCell, board);
        setBoard(newBoard);
      }
    } else if (keyValue === 'ArrowRight' || keyValue === 'KeyD') {
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
