import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AVPlaybackSource } from 'expo-av';
import { Image, View } from 'react-native';
import { night } from '../utils/sounds';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import AudioPlayer from '../components/AudioPlayer';
import PlayerPicker from '../components/PlayerPicker';
import { PlayerPicks } from '../redux/slices/picks';
import styles from '../utils/styles';
import Timer from '../components/Timer';
import { startTimer } from '../redux/slices/timer';

const logo = require('../assets/img/logo.png');

enum StepEnum {
    NIGHT_START = 'night_start',
    WITCH_START = 'night_witch_start',
    WITCH_END = 'night_witch_end',
    CONSTABLE_START = 'constable_start',
    CONSTABLE_END = 'constable_end',
    NIGHT_END = 'night_end'
}

type Step = {
    key: StepEnum;
    audio: AVPlaybackSource;
};

const steps: Step[] = [
    { key: StepEnum.NIGHT_START, audio: night.start },
    { key: StepEnum.WITCH_START, audio: night.witchStart },
    { key: StepEnum.WITCH_END, audio: night.witchEnd },
    { key: StepEnum.CONSTABLE_START, audio: night.constableStart },
    { key: StepEnum.CONSTABLE_END, audio: night.constableEnd },
    { key: StepEnum.NIGHT_END, audio: night.end }
];

export default function NightPage(props: NativeStackScreenProps<any>) {
    const [stepIndex, setStepIndex] = React.useState(0);
    const { navigation } = props;
    const players = useAppSelector((state) => state.data.players);
    const dispatch = useAppDispatch();
    const { constableEnabled, confessionTime } = useAppSelector((state) => state.data.settings);
    const step = steps[stepIndex];

    const renderExtra = (key: StepEnum) => {
        switch (key) {
            case StepEnum.WITCH_START:
            case StepEnum.CONSTABLE_START:
                return (
                    <PlayerPicker
                        players={players}
                        onPlayerPicked={() => setStepIndex(stepIndex + 1)}
                        pickedFor={
                            key === StepEnum.WITCH_START ? PlayerPicks.KILLED : PlayerPicks.GAVEL
                        }
                    />
                );
            case StepEnum.NIGHT_END:
                return (
                    <Timer
                        time={confessionTime}
                        timerKey="confession"
                        onTimeEnded={() => navigation.navigate('Day')}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <View style={styles.main}>
            <AudioPlayer
                audioFile={steps[stepIndex].audio}
                onAudioEnded={() => {
                    switch (step.key) {
                        case StepEnum.WITCH_END:
                            if (!constableEnabled) {
                                setStepIndex(steps.length - 1);
                            } else setStepIndex(stepIndex + 1);
                            break;
                        case StepEnum.NIGHT_START:
                        case StepEnum.CONSTABLE_END:
                            setStepIndex(stepIndex + 1);
                            break;
                        case StepEnum.NIGHT_END:
                            dispatch(startTimer('confession'));
                            break;
                        default:
                            break;
                    }
                }}
            />
            <div className="nightPage">
                <Image source={logo} style={{ width: 300, height: 150 }} />
                {renderExtra(step.key)}
            </div>
        </View>
    );
}
