import React from 'react';
import { PlayersState, setPicked } from '../redux/slices/players';
import { useAppDispatch } from '../redux/hooks';

interface PickerProps {
    players: PlayersState;
    onPlayerPicked: (name: string) => void;
}

export default function PlayerPicker(props: PickerProps) {
    const {
        players: { list },
        onPlayerPicked
    } = props;
    const dispatch = useAppDispatch();

    return (
        <div className="playerPicker">
            {list.map((player) => (
                <button
                    type="button"
                    onClick={() => {
                        dispatch(setPicked(player));
                        onPlayerPicked(player);
                    }}>
                    {player}
                </button>
            ))}
        </div>
    );
}
