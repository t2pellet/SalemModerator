import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export enum PlayerPicks {
    GAVEL = 'gavel',
    BLACK_CAT = 'blackCat',
    KILLED = 'killed'
}

export interface PlayersState {
    list: string[];
    picks: typeof initialPicks;
}

const initialPicks = {
    [PlayerPicks.GAVEL]: '',
    [PlayerPicks.BLACK_CAT]: '',
    [PlayerPicks.KILLED]: ''
};

const initialState: PlayersState = {
    list: [],
    picks: initialPicks
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

export const { submitPlayers, setPlayers, setPicked, resetPick } = settingsSlice.actions;

export default settingsSlice.reducer;
