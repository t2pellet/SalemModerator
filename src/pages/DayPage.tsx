import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { PlayerPicks, resetPick } from '../redux/slices/picks';
import DisplayPlayer from '../components/DisplayPlayer';
import Timer from '../components/Timer';
import { startTimer } from '../redux/slices/timer';
import AudioPlayer from '../components/AudioPlayer';
import { actions } from '../utils/sounds';

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
            <button
                type="button"
                onClick={() => {
                    navigation.popToTop();
                    navigation.navigate('Night');
                }}>
                Nighttime
            </button>
        );
    };

    return (
        <View>
            <div className="dayPage">
                <h1>Daytime</h1>
                {renderBody()}
            </div>
        </View>
    );
}
