import { useEffect } from 'react';
import React from 'react';
import styles from './index.module.css';
import useGame from '../components/useGame';

const Home = () => {
  const { board, keyHandler, autoDropCell, firstCreateCell } = useGame();

  useEffect(() => {
    window.addEventListener('keydown', keyHandler);

    return () => {
      window.removeEventListener('keydown', keyHandler);
    };
  }, [keyHandler]);

  return (
    <>
      <div className={styles.container}>
        {board.flat().every((cell) => cell === 0) ? (
          <div
            onClick={() => {
              autoDropCell();
              firstCreateCell();
            }}
            className={styles.button}
          >
            start
          </div>
        ) : (
          <div className={styles.button} onClick={()=>window.location.reload()}>restart</div>
        )}
        <div className={styles.board}>
          {board.map((row: number[], rowIndex: number) =>
            row.map((cell, cellIndex) => (
              <div
                onClick={() => {}}
                key={rowIndex - cellIndex}
                className={styles.cell}
                style={{ backgroundColor: cell === 0 ? '' : 'green' }}
              />
            )),
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
