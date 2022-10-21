import React from 'react';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import PlayerPicker from '../components/PlayerPicker';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { dawn } from '../utils/sounds';
import Timer from '../components/Timer';
import AudioPlayer from '../components/audio/AudioPlayer';
import { startTimer } from '../redux/slices/timer';
import { PlayerPicks } from '../redux/slices/players';

enum Step {
    DAWN_START = 'dawn_start',
    WITCH_START = 'dawn_witch_start',
    WITCH_END = 'dawn_witch_end',
    DAWN_END = 'dawn-end'
}

const soundMap = {
    [Step.DAWN_START]: dawn.start,
    [Step.WITCH_START]: dawn.witchStart,
    [Step.WITCH_END]: dawn.witchEnd,
    [Step.DAWN_END]: dawn.end
};

function DawnPage(props: NativeStackScreenProps<any>) {
    const [step, setStep] = React.useState(Step.DAWN_START);
    const { navigation } = props;
    const players = useAppSelector((state) => state.data.players);
    const delayTime = useAppSelector((state) => state.data.settings.delayTime);
    const dispatch = useAppDispatch();
    const setTimer = (key: string) => dispatch(startTimer(key));

    const renderFromStep = () => {
        switch (step) {
            case Step.DAWN_START:
                return (
                    <>
                        <Timer
                            timerKey={step}
                            time={delayTime}
                            onTimeEnded={() => setStep(Step.WITCH_START)}
                        />
                        <AudioPlayer
                            audioFile={soundMap[step]}
                            onAudioEnded={() => setTimer(step)}
                        />
                    </>
                );
            case Step.WITCH_START:
                return (
                    <>
                        <Timer
                            timerKey={step}
                            time={delayTime}
                            onTimeEnded={() => setStep(Step.WITCH_END)}
                        />
                        <PlayerPicker
                            players={players}
                            onPlayerPicked={() => setStep(Step.WITCH_END)}
                            pickedFor={PlayerPicks.BLACK_CAT}
                        />
                        <AudioPlayer
                            audioFile={soundMap[step]}
                            onAudioEnded={() => setTimer(step)}
                        />
                    </>
                );
            case Step.WITCH_END:
                return (
                    <>
                        <Timer
                            timerKey={step}
                            time={delayTime}
                            onTimeEnded={() => setStep(Step.DAWN_END)}
                        />
                        <AudioPlayer
                            audioFile={soundMap[step]}
                            onAudioEnded={() => setTimer(step)}
                        />
                    </>
                );
            case Step.DAWN_END:
            default:
                return (
                    <AudioPlayer
                        audioFile={soundMap[step]}
                        onAudioEnded={() => navigation.navigate('Day')}
                    />
                );
        }
    };

    return <View>{renderFromStep()}</View>;
}

export default DawnPage;
