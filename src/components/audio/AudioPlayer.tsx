import React, { useCallback, useEffect, useState } from 'react';
import { Audio, AVPlaybackSource } from 'expo-av';

interface AudioProps {
    audioFile: AVPlaybackSource;
    onAudioEnded: () => void;
}

export default function AudioPlayer(props: AudioProps) {
    const { audioFile, onAudioEnded } = props;
    const [audio, setAudio] = useState(null);
    const playCallback = useCallback(async () => {
        const { sound } = await Audio.Sound.createAsync(audioFile);
        sound.setOnPlaybackStatusUpdate((status) => {
            if (status.isLoaded && status.didJustFinish) onAudioEnded();
        });
        setAudio(sound);
        await sound.playAsync();
    }, [audioFile, setAudio, onAudioEnded]);

    useEffect(() => {
        playCallback();
    }, [playCallback]);
    useEffect(() => (audio ? () => audio.unloadAsync() : undefined), [audio]);

    return (
        <div className="baseDisplay">
            <span>Listen, bitch</span>
        </div>
    );
}
