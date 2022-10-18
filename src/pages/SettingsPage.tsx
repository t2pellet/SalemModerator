import React from 'react';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { submitSettings } from '../redux/slices/settings';
import SettingsForm from '../components/SettingsForm';

function SettingsPage({ navigation }: NativeStackScreenProps<any>) {
    const initialState = useAppSelector((state) => state.settings);
    const dispatch = useAppDispatch();

    const handleSubmit = (data) => {
        dispatch(submitSettings(data));
        navigation.navigate('Players');
    };

    return (
        <View>
            <SettingsForm onSettingsSubmit={handleSubmit} initialState={initialState} />
        </View>
    );
}

export default SettingsPage;
