import React from 'react';
import { Image, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import PlayersForm from '../components/PlayersForm';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { submitPlayers } from '../redux/slices/players';
import styles from '../utils/styles';

const logo = require('../assets/img/logo.png');

function PlayersPage({ navigation }: NativeStackScreenProps<any>) {
    const players = useAppSelector((state) => state.data.players);
    const dispatch = useAppDispatch();

    const handleSubmit = (data) => {
        dispatch(submitPlayers(data.players));
        navigation.popToTop();
        navigation.navigate('Dawn');
    };

    return (
        <View style={styles.main}>
            <Image source={logo} style={{ width: 300, height: 150 }} />
            <PlayersForm players={players} onPlayersSubmit={handleSubmit} />
        </View>
    );
}

export default PlayersPage;
