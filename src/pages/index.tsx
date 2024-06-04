import { useEffect } from 'react';
import React from 'react';
import styles from './index.module.css';
import useGame from '../components/useGame';

const Home = () => {
  const { board, keyHandler } = useGame();

  useEffect(() => {
    window.addEventListener('keydown', keyHandler);

    return () => {
      window.removeEventListener('keydown', keyHandler);
    };
  }, [keyHandler]);

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row: number[], rowIndex: number) =>
          row.map((cell, cellIndex) => (
            <div
              key={rowIndex - cellIndex}
              className={styles.cell}
              style={{ backgroundColor: cell === 0 ? ' gray' : cell === 1 ? '#c0c0c0' : '#333333' }}
            />
          )),
        )}
      </div>
    </div>
  );
};

export default Home;
