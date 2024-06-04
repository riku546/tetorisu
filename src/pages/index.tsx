import { useEffect } from 'react';
import React from 'react';
import styles from './index.module.css';
import useGame from '../components/useGame';

const Home = () => {
  const { board, keyHandler, dropCell } = useGame();

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
              onClick={dropCell}
              key={rowIndex - cellIndex}
              className={styles.cell}
              style={{ backgroundColor: cell === 0 ? '' : 'green' }}
            />
          )),
        )}
      </div>
    </div>
  );
};

export default Home;
