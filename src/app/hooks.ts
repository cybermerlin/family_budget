import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export let useAppDispatch = () => useDispatch<AppDispatch>();
export let useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
