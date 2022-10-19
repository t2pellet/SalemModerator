import React from 'react';
import { AVPlaybackSource } from 'expo-av';
import AudioPlayer from './AudioPlayer';

interface AudioProps {
    audioFile: AVPlaybackSource;
    delayTime: number;
    onTimeEnded: () => void;
}

export default function TimedAudioPlayer(props: AudioProps) {
    const { delayTime, onTimeEnded } = props;
    const audioEnded = () => {
        setTimeout(() => {
            onTimeEnded();
        }, delayTime);
    };

    return <AudioPlayer {...props} onAudioEnded={audioEnded} />;
}
