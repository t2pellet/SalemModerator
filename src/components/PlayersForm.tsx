import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

export interface PlayersProps {
    players: string[];
    onPlayersSubmit: (data: any) => void;
}

type PlayersData = {
    name: string;
    players: { name: string }[];
};

export default function PlayersForm(props: PlayersProps) {
    const { onPlayersSubmit, players } = props;
    const { register, control, handleSubmit } = useForm<PlayersData>({
        defaultValues: {
            players: players.map((name) => ({ name }))
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
