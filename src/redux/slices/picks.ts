import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export enum PlayerPicks {
    GAVEL = 'gavel',
    BLACK_CAT = 'blackCat',
    KILLED = 'killed'
}

export interface PlayersState {
    picks: typeof initialPicks;
}

const initialPicks = {
    [PlayerPicks.GAVEL]: '',
    [PlayerPicks.BLACK_CAT]: '',
    [PlayerPicks.KILLED]: ''
};

const initialState: PlayersState = {
    picks: initialPicks
};

export const settingsSlice = createSlice({
    name: 'players',
    initialState,
    reducers: {
        setPicked: (state, action: PayloadAction<{ name: string; pickedFor: PlayerPicks }>) => ({
            ...state,
            picks: {
                ...state.picks,
                [action.payload.pickedFor]: action.payload.name
            }
        }),
        resetPick: (state, action: PayloadAction<PlayerPicks>) => ({
            ...state,
            picks: {
                ...state.picks,
                [action.payload]: ''
            }
        })
    }
});

export const { setPicked, resetPick } = settingsSlice.actions;

export default settingsSlice.reducer;
