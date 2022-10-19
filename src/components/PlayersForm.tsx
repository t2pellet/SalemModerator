import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { PlayersState } from '../redux/slices/players';

export interface PlayersProps {
    players: PlayersState;
    onPlayersSubmit: (data: any) => void;
}

type PlayersData = {
    name: string;
    players: { name: string }[];
};

export default function PlayersForm(props: PlayersProps) {
    const {
        onPlayersSubmit,
        players: { list }
    } = props;
    const { register, control, handleSubmit } = useForm<PlayersData>({
        defaultValues: {
            players: list.map((name) => ({ name }))
        }
    });
    const { fields } = useFieldArray<PlayersData>({ control, name: 'players' });

    return (
        <div className="players-form">
            <form onSubmit={handleSubmit(onPlayersSubmit)}>
                {fields.map((field, index) => (
                    <input
                        type="text"
                        key={field.id}
                        {...register(`players.${index}.name` as const)}
                        placeholder="Player name"
                        autoCapitalize="true"
                    />
                ))}
                <input type="submit" value="Start" />
            </form>
        </div>
    );
}
