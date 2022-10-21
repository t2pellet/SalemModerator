import { createSlice, Draft } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type TimerState = string[];

const initialState: TimerState = [];

export const timerSlice = createSlice({
    name: 'players',
    initialState,
    reducers: {
        startTimer: (state: Draft<TimerState>, action: PayloadAction<string>) => {
            if (action.payload in state) {
                return state;
            }

            return {
                ...state,
                [action.payload]: true
            };
        },
        clearTimer: (state: Draft<TimerState>, action: PayloadAction<string>) => {
            const newState = state;
            delete newState[action.payload];

            return newState;
        }
    }
});

export const { startTimer, clearTimer } = timerSlice.actions;

export default timerSlice.reducer;
