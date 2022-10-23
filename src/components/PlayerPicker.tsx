import React, { useEffect } from 'react';
import { Button } from 'react-native-paper';
import { ScrollView } from 'react-native';
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
            <ScrollView style={{ maxHeight: '75%', flexGrow: 0 }}>
                {list.map((player) => (
                    <Button
                        key={player}
                        mode="outlined"
                        onPress={() => {
                            dispatch(setPicked({ name: player, pickedFor }));
                            onPlayerPicked(player);
                        }}>
                        {player}
                    </Button>
                ))}
            </ScrollView>
        </div>
    );
}
