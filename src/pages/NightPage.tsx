import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AVPlaybackSource } from 'expo-av';
import { View } from 'react-native';
import { night } from '../utils/sounds';
import Timer from '../components/Timer';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import AudioPlayer from '../components/audio/AudioPlayer';
import { startTimer } from '../redux/slices/timer';
import PlayerPicker from '../components/PlayerPicker';
import { PlayerPicks } from '../redux/slices/players';

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
    const { delayTime, constableEnabled } = useAppSelector((state) => state.data.settings);
    const dispatch = useAppDispatch();
    const setTimer = (key: string) => dispatch(startTimer(key));
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
            default:
                return null;
        }
    };

    return (
        <View>
            <div className="night-page">
                <Timer
                    timerKey={step.key}
                    time={delayTime}
                    onTimeEnded={() => {
                        if (step.key === StepEnum.NIGHT_END) navigation.navigate('Day');
                        else {
                            const nextIndex =
                                constableEnabled && step.key === StepEnum.WITCH_END
                                    ? stepIndex + 1
                                    : stepIndex + 3;
                            setStepIndex(nextIndex);
                        }
                    }}
                />
                <AudioPlayer
                    audioFile={steps[stepIndex].audio}
                    onAudioEnded={() => setTimer(step.key)}
                />
                {renderExtra(step.key)}
            </div>
        </View>
    );
}
