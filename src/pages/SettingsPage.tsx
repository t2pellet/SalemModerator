import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { submitSettings } from '../redux/slices/settings';
import SettingsForm from '../components/SettingsForm';
import { setPlayers } from '../redux/slices/players';

function SettingsPage({ navigation }: NativeStackScreenProps<any>) {
    const initialState = useAppSelector((state) => state.data.settings);
    const dispatch = useAppDispatch();

    const handleSubmit = (data) => {
        dispatch(submitSettings(data));
        dispatch(setPlayers(data.playerCount));
        navigation.navigate('Players');
    };

    return <SettingsForm onSettingsSubmit={handleSubmit} initialState={initialState} />;
}

export default SettingsPage;
