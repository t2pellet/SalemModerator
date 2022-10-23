import React, { useEffect } from 'react';
import { PlayersState } from '../redux/slices/players';
import { PlayerPicks, setPicked } from '../redux/slices/picks';
import { useAppDispatch } from '../redux/hooks';

interface PickerProps {
    players: PlayersState;
    pickedFor: PlayerPicks;
    onPlayerPicked: (name: string) => void;
}

export default function PlayerPicker(props: PickerProps) {
    const {
        players: { list },
        pickedFor,
        onPlayerPicked
    } = props;
    const dispatch = useAppDispatch();

    useEffect(() => {
        const defaultPick = list[0];
        dispatch(setPicked({ name: defaultPick, pickedFor }));
    }, [dispatch, list, pickedFor]);

    return (
        <div className="playerPicker">
            {list.map((player) => (
                <button
                    key={player}
                    type="button"
                    onClick={() => {
                        dispatch(setPicked({ name: player, pickedFor }));
                        onPlayerPicked(player);
                    }}>
                    {player}
                </button>
            ))}
        </div>
    );
}
