import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SettingsState {
    playerCount: number;
    constableEnabled: boolean;
}

const initialState: SettingsState = {
    playerCount: 4,
    constableEnabled: true
};

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        submitSettings: (state, action: PayloadAction<SettingsState>) => action.payload
    }
});

export const { submitSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
