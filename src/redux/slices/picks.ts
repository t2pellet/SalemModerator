import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export enum PlayerPicks {
    GAVEL = 'gavel',
    BLACK_CAT = 'blackCat',
    KILLED = 'killed'
}

const initialState = {
    [PlayerPicks.GAVEL]: '',
    [PlayerPicks.BLACK_CAT]: '',
    [PlayerPicks.KILLED]: ''
};

export const settingsSlice = createSlice({
    name: 'players',
    initialState,
    reducers: {
        setPicked: (state, action: PayloadAction<{ name: string; pickedFor: PlayerPicks }>) => ({
            ...state,
            [action.payload.pickedFor]: action.payload.name
        }),
        resetPick: (state, action: PayloadAction<PlayerPicks>) => ({
            ...state,
            [action.payload]: ''
        })
    }
});

export const { setPicked, resetPick } = settingsSlice.actions;

export default settingsSlice.reducer;
