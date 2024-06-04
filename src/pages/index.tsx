import { useEffect, useState } from 'react';
import styles from './index.module.css';
import { headers } from 'next/headers';

const keyHandler = (e) => {
  const keyValue = e.code;
  console.log(e.code);
  if (keyValue === 'ArrowDown') {
    console.log('hh');
  } else if (keyValue === 'ArrowLeft') {
    console.log('gg');
  } else if (keyValue === 'ArrowRight') {
    console.log('tt');
  }
};

const Home = () => {
  
  useEffect(() => {
    window.addEventListener('keydown', keyHandler);

    return () => {
      window.removeEventListener('keydown', keyHandler);
    };
  }, []);

  // ArrowLeft
  // ArrowDown
  //  ArrowRigh

  const [board, setBoard] = useState([
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
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
