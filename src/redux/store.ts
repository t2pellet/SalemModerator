import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import settingsReducer from './slices/settings';
import playersReducer from './slices/players';

const persistConfig = {
    key: 'root',
    storage
};

const rootReducer = combineReducers({
    settings: settingsReducer,
    players: playersReducer
});

export const store = configureStore({
    reducer: persistReducer(persistConfig, rootReducer),
    devTools: process.env.NODE_ENV !== 'production'
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
