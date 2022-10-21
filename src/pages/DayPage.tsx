import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { PlayerPicks, resetPick } from '../redux/slices/players';
import DisplayPlayer from '../components/DisplayPlayer';
import Timer from '../components/Timer';

export default function DayPage({ navigation }: NativeStackScreenProps<any>) {
    const { picks } = useAppSelector((state) => state.data.players);
    const { delayTime } = useAppSelector((state) => state.data.settings);
    const dispatch = useAppDispatch();

    const renderDisplay = (pick: PlayerPicks, description: string, name: string) => (
        <>
            <Timer
                timerKey={pick.toString()}
                time={delayTime}
                autoStart
                onTimeEnded={() => dispatch(resetPick(pick))}
            />
            <DisplayPlayer playerName={name} description={description} />
        </>
    );

    const renderBody = () => {
        const blackCat = picks[PlayerPicks.BLACK_CAT];
        const gavelToken = picks[PlayerPicks.GAVEL];
        const killed = picks[PlayerPicks.KILLED];

        console.log(
            `rendering day -- black cat: ${blackCat}, gavel token: ${gavelToken}, killed: ${killed}`
        );

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
            <button type="button" onClick={() => navigation.navigate('Night')}>
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
