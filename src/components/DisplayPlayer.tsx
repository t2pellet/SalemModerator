import React from 'react';

interface DisplayProps {
    playerName: string;
    description: string;
}

export default function DisplayPlayer(props: DisplayProps) {
    const { playerName, description } = props;

    return (
        <div className="displayPlayer">
            <h1>{playerName}</h1>
            <p>{description}</p>
        </div>
    );
}
