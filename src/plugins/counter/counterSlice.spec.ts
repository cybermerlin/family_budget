import counterReducer, {
  ICounterState,
  increment,
  decrement,
  incrementByAmount
} from './counterSlice';


describe('counter reducer', () => {
  let initialState: ICounterState = {
    value: 3,
    status: 'idle'
  };
  it('should handle initial state', () => {
    expect(counterReducer(undefined, { type: 'unknown' })).toEqual({
      value: 0,
      status: 'idle'
    });
  });

  it('should handle increment', () => {
    let actual = counterReducer(initialState, increment());
    expect(actual.value).toEqual(4);
  });

  it('should handle decrement', () => {
    let actual = counterReducer(initialState, decrement());
    expect(actual.value).toEqual(2);
  });

  it('should handle incrementByAmount', () => {
    let actual = counterReducer(initialState, incrementByAmount(2));
    expect(actual.value).toEqual(5);
  });
});
