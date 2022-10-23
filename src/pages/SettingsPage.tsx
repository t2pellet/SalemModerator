import React from 'react';
import { Image, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { submitSettings } from '../redux/slices/settings';
import SettingsForm from '../components/SettingsForm';
import { setPlayers } from '../redux/slices/players';
import styles from '../utils/styles';

const logo = require('../assets/img/logo.png');

function SettingsPage({ navigation }: NativeStackScreenProps<any>) {
    const initialState = useAppSelector((state) => state.data.settings);
    const dispatch = useAppDispatch();

    const handleSubmit = (data) => {
        dispatch(submitSettings(data));
        dispatch(setPlayers(data.playerCount));
        navigation.navigate('Players');
    };

    return (
        <View style={styles.main}>
            <Image source={logo} style={{ width: 300, height: 150 }} />
            <SettingsForm onSettingsSubmit={handleSubmit} initialState={initialState} />
        </View>
    );
}

export default SettingsPage;
