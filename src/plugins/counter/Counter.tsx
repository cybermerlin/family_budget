import { Button } from 'antd';
import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import styles from './Counter.module.scss';
import { decrement, increment, incrementAsync, incrementByAmount, incrementIfOdd, selectCount } from './counterSlice';


export default function Counter() {
  let count = useAppSelector(selectCount);
  let dispatch = useAppDispatch();
  let [incrementAmount, setIncrementAmount] = useState('2');

  let incrementValue = Number(incrementAmount) || 0;

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
