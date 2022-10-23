import React from 'react';
import { Audio, AVPlaybackSource } from 'expo-av';
import { Sound } from 'expo-av/build/Audio/Sound';

interface AudioProps {
    audioFile: AVPlaybackSource;
    onAudioEnded: () => void;
}

interface AudioState {
    audio: Sound;
}

class AudioPlayer extends React.Component<AudioProps, AudioState> {
    async componentDidMount() {
        await this.play();
    }

    async componentDidUpdate(prevProps: Readonly<AudioProps>) {
        const { audioFile } = this.props;

        if (prevProps.audioFile !== audioFile) {
            await this.cleanup();
            await this.play();
        }
    }

    async componentWillUnmount() {
        await this.cleanup();
    }

    async play() {
        const { audioFile, onAudioEnded } = this.props;
        const { sound } = await Audio.Sound.createAsync(audioFile);
        sound.setOnPlaybackStatusUpdate((status) => {
            if (status.isLoaded && status.didJustFinish) onAudioEnded();
        });

        this.setState({ audio: sound });
        await sound.playAsync();
    }

    async cleanup() {
        const { audio } = this.state;

        if (audio) {
            await audio.unloadAsync();
        }
    }

    render() {
        return null;
    }
}

export default AudioPlayer;
