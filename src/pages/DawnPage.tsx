import React, { useState } from 'react';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import TimedAudioPlayer from '../components/audio/TimedAudioPlayer';
import PlayerPicker from '../components/PlayerPicker';
import { useAppSelector } from '../redux/hooks';
import BlackCatPage from './BlackCatPage';

enum Step {
    VAMPIRE_AUDIO,
    VAMPIRE_PICK,
    PLAYER_AUDIO,
    BLACK_CAT
}
const vampireAudioSource = require('../assets/sound/dawn/vampire_audio.mp3');
const playerAudioSource = require('../assets/sound/dawn/player_audio.mp3');

type DawnProps = NativeStackScreenProps<any> & {
    delayTime: number;
};

function DawnPage(props: DawnProps) {
    const [step, setStep] = useState(Step.VAMPIRE_AUDIO);
    const { delayTime } = props;
    const players = useAppSelector((state) => state.players);

    const renderFromStep = () => {
        switch (step) {
            case Step.VAMPIRE_AUDIO:
                return (
                    <TimedAudioPlayer
                        audioFile={vampireAudioSource}
                        delayTime={delayTime * 1000}
                        onTimeEnded={() => setStep(Step.VAMPIRE_PICK)}
                    />
                );
            case Step.VAMPIRE_PICK:
                return (
                    <PlayerPicker
                        players={players}
                        onPlayerPicked={() => setStep(Step.PLAYER_AUDIO)}
                    />
                );
            case Step.PLAYER_AUDIO:
                return (
                    <TimedAudioPlayer
                        audioFile={playerAudioSource}
                        delayTime={delayTime * 1000}
                        onTimeEnded={() => setStep(Step.BLACK_CAT)}
                    />
                );
            case Step.BLACK_CAT:
            default:
                return <BlackCatPage />;
        }
    };

    return <View>{renderFromStep()}</View>;
}

export default DawnPage;
