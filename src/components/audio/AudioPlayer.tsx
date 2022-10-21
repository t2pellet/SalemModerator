import React from 'react';
import { Audio, AVPlaybackSource } from 'expo-av';

interface AudioProps {
    audioFile: AVPlaybackSource;
    onAudioEnded: () => void;
}

export default function AudioPlayer(props: AudioProps) {
    const { audioFile, onAudioEnded } = props;
    const [audio, setAudio] = React.useState(null);
    const playCallback = React.useCallback(async () => {
        const { sound } = await Audio.Sound.createAsync(audioFile);
        sound.setOnPlaybackStatusUpdate((status) => {
            if (status.isLoaded && status.didJustFinish) onAudioEnded();
        });
        setAudio(sound);
        await sound.playAsync();
    }, [audioFile, setAudio, onAudioEnded]);

    React.useEffect(() => {
        playCallback();
    }, [playCallback]);
    React.useEffect(() => (audio ? () => audio.unloadAsync() : undefined), [audio]);

    return null;
}
