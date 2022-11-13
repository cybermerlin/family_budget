import React, { useState } from 'react';
import { Button } from 'antd';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount
} from './counterSlice';
import styles from './Counter.module.css';


export default function Counter() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;

  return (
      <div>
        <div className={styles.row}>
          <Button
              className={styles.button}
              aria-label="Decrement value"
              onClick={() => dispatch(decrement())}
          >
            -
          </Button>
          <span className={styles.value}>{count}</span>
          <Button
              className={styles.button}
              aria-label="Increment value"
              onClick={() => dispatch(increment())}
          >
            +
          </Button>
        </div>
        <div className={styles.row}>
          <input
              className={styles.textbox}
              aria-label="Set increment amount"
              value={incrementAmount}
              onChange={(e) => setIncrementAmount(e.target.value)}
          />
          <Button
              className={styles.button}
              onClick={() => dispatch(incrementByAmount(incrementValue))}
          >
            Add Amount
          </Button>
          <Button
              className={styles.asyncButton}
              onClick={() => dispatch(incrementAsync(incrementValue))}
          >
            Add Async
          </Button>
          <Button
              className={styles.button}
              onClick={() => dispatch(incrementIfOdd(incrementValue))}
          >
            Add If Odd
          </Button>
        </div>
      </div>
  );
}
