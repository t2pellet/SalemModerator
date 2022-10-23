import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { PlayerPicks, resetPick } from '../redux/slices/picks';
import DisplayPlayer from '../components/DisplayPlayer';
import Timer from '../components/Timer';
import { startTimer } from '../redux/slices/timer';
import AudioPlayer from '../components/AudioPlayer';
import { actions } from '../utils/sounds';
import styles from '../utils/styles';

const logo = require('../assets/img/logo.png');

const actionSoundMap = {
    [PlayerPicks.BLACK_CAT]: actions.blackCat,
    [PlayerPicks.GAVEL]: actions.gavel,
    [PlayerPicks.KILLED]: actions.killed
};

export default function DayPage({ navigation }: NativeStackScreenProps<any>) {
    const picks = useAppSelector((state) => state.picks);
    const { delayTime } = useAppSelector((state) => state.data.settings);
    const dispatch = useAppDispatch();

    const renderDisplay = (pick: PlayerPicks, description: string, name: string) => (
        <>
            <Timer
                timerKey={pick.toString()}
                time={delayTime}
                onTimeEnded={() => dispatch(resetPick(pick))}
            />
            <AudioPlayer
                audioFile={actionSoundMap[pick]}
                onAudioEnded={() => dispatch(startTimer(pick.toString()))}
            />
            <DisplayPlayer playerName={name} description={description} />
        </>
    );

    const renderBody = () => {
        const blackCat = picks[PlayerPicks.BLACK_CAT];
        const gavelToken = picks[PlayerPicks.GAVEL];
        const killed = picks[PlayerPicks.KILLED];

        if (blackCat) {
            return renderDisplay(PlayerPicks.BLACK_CAT, 'Black Cat', blackCat);
        }
        if (gavelToken) {
            return renderDisplay(PlayerPicks.GAVEL, 'Saved by Constable', gavelToken);
        }
        if (killed) {
            return renderDisplay(PlayerPicks.KILLED, 'Killed by Witches', killed);
        }
        return (
            <Button
                mode="contained"
                onPress={() => {
                    navigation.popToTop();
                    navigation.navigate('Night');
                }}>
                Nighttime
            </Button>
        );
    };

    return (
        <View style={styles.day}>
            <div className="dayPage">
                <Image source={logo} style={{ width: 300, height: 150 }} />
                {renderBody()}
            </div>
        </View>
    );
}
