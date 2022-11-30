import React from 'react';
import { Text } from 'react-native-paper';

interface DisplayProps {
    playerName: string;
    description: string;
}

export default function DisplayPlayer(props: DisplayProps) {
    const { playerName, description } = props;

    return (
        <div className="displayPlayer" style={{ textAlign: 'center' }}>
            <Text variant="displayMedium">{playerName}</Text>
            <Text variant="bodyMedium">{description}</Text>
        </div>
    );
}
