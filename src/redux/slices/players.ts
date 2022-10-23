import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface PlayersState {
    list: string[];
}

const initialState: PlayersState = {
    list: []
};

function resizeArray(arr: any[], size: number) {
    while (arr.length > size) arr.pop();
    while (arr.length < size) arr.push('');

    return arr;
}

export const settingsSlice = createSlice({
    name: 'players',
    initialState,
    reducers: {
        submitPlayers: (state, action: PayloadAction<{ name: string }[]>) => ({
            ...state,
            list: action.payload.map((player) => player.name)
        }),
        setPlayers: (state, action: PayloadAction<number>) => {
            const count: number = Number(action.payload);
            resizeArray(state.list, count);
        }
    }
});

export const { submitPlayers, setPlayers } = settingsSlice.actions;

export default settingsSlice.reducer;
