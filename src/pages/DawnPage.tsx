import React from 'react';
import { Image, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AVPlaybackSource } from 'expo-av';
import PlayerPicker from '../components/PlayerPicker';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { dawn } from '../utils/sounds';
import AudioPlayer from '../components/AudioPlayer';
import { startTimer } from '../redux/slices/timer';
import { PlayerPicks } from '../redux/slices/picks';
import styles from '../utils/styles';

const logo = require('../assets/img/logo.png');

enum StepEnum {
    DAWN_START = 'dawn_start',
    WITCH_START = 'dawn_witch_start',
    WITCH_END = 'dawn_witch_end',
    DAWN_END = 'dawn-end'
}

type Step = {
    key: StepEnum;
    audio: AVPlaybackSource;
};

const steps: Step[] = [
    { key: StepEnum.DAWN_START, audio: dawn.start },
    { key: StepEnum.WITCH_START, audio: dawn.witchStart },
    { key: StepEnum.WITCH_END, audio: dawn.witchEnd },
    { key: StepEnum.DAWN_END, audio: dawn.end }
];

function DawnPage(props: NativeStackScreenProps<any>) {
    const [stepIndex, setStepIndex] = React.useState(0);
    const { navigation } = props;
    const players = useAppSelector((state) => state.data.players);
    const dispatch = useAppDispatch();
    const step = steps[stepIndex];

    const renderExtra = () => {
        if (step.key === StepEnum.WITCH_START) {
            return (
                <PlayerPicker
                    players={players}
                    onPlayerPicked={() => setStepIndex(stepIndex + 1)}
                    pickedFor={PlayerPicks.BLACK_CAT}
                />
            );
        }

        return null;
    };

    return (
        <View style={styles.main}>
            <AudioPlayer
                audioFile={step.audio}
                onAudioEnded={() => {
                    if (step.key === StepEnum.DAWN_END) navigation.navigate('Day');
                    else if (step.key === StepEnum.WITCH_START) dispatch(startTimer(step.key));
                    else setStepIndex(stepIndex + 1);
                }}
            />
            <Image source={logo} style={{ width: 300, height: 150 }} />
            {renderExtra()}
        </View>
    );
}

export default DawnPage;
