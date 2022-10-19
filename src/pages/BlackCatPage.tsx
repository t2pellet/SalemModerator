import React from 'react';
import { useAppSelector } from '../redux/hooks';
import DisplayPlayer from '../components/DisplayPlayer';

export default function BlackCatPage() {
    const pickedPlayer = useAppSelector((state) => state.players.picked);

    return <DisplayPlayer playerName={pickedPlayer} description="Black Cat" />;
}
