import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../plugins/counter/counterSlice';


export let store = configureStore({
  reducer: {
    counter: counterReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<TReturnType = void> = ThunkAction<TReturnType,
    RootState,
    unknown,
    Action<string>>;
