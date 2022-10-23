import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Button } from 'react-native-paper';
import { PlayersState } from '../redux/slices/players';
import FormTextInput from './form/FormTextInput';

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
    const { control, handleSubmit } = useForm<PlayersData>({
        defaultValues: {
            players: list.map((name) => ({ name }))
        }
    });
    const { fields } = useFieldArray<PlayersData>({ control, name: 'players' });

    return (
        <div className="players-form">
            {fields.map((field, index) => (
                <FormTextInput
                    key={field.id}
                    name={`players.${index}.name`}
                    control={control}
                    placeHolder={`Player ${index + 1} Name`}
                    rules={{ required: true }}
                    errMsg="Must enter player name"
                />
            ))}
            <Button mode="contained" onPress={handleSubmit(onPlayersSubmit)}>
                Start
            </Button>
        </div>
    );
}
