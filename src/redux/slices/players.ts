import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type PlayersState = {
    list: string[];
    picked: string;
};

const initialState: PlayersState = {
    list: [],
    picked: ''
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
        },
        setPicked: (state, action: PayloadAction<string>) => ({
            ...state,
            picked: action.payload
        })
    }
});

export const { submitPlayers, setPlayers, setPicked } = settingsSlice.actions;

export default settingsSlice.reducer;
