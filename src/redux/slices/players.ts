import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type PlayersState = string[];

const initialState: PlayersState = [];

function resizeArray(arr: any[], size: number) {
    while (arr.length > size) arr.pop();
    while (arr.length < size) arr.push('');

    return arr;
}

export const settingsSlice = createSlice({
    name: 'players',
    initialState,
    reducers: {
        submitPlayers: (state, action: PayloadAction<{ name: string }[]>) =>
            action.payload.map((player) => player.name),
        setPlayers: (state, action: PayloadAction<number>) => {
            const count: number = Number(action.payload);
            return resizeArray(state, count);
        }
    }
});

export const { submitPlayers, setPlayers } = settingsSlice.actions;

export default settingsSlice.reducer;
