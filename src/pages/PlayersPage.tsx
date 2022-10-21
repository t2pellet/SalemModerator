import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import PlayersForm from '../components/PlayersForm';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { submitPlayers } from '../redux/slices/players';

function PlayersPage({ navigation }: NativeStackScreenProps<any>) {
    const players = useAppSelector((state) => state.data.players);
    const dispatch = useAppDispatch();

    const handleSubmit = (data) => {
        dispatch(submitPlayers(data.players));
        navigation.navigate('Dawn');
    };

    return <PlayersForm players={players} onPlayersSubmit={handleSubmit} />;
}

export default PlayersPage;
