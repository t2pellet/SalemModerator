import React from 'react';
import { useForm } from 'react-hook-form';

export interface SettingsProps {
    initialState: {
        playerCount: number;
        constableEnabled: boolean;
    };
    onSettingsSubmit: (data) => void;
}

export default function SettingsForm(props: SettingsProps) {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const {
        initialState: { playerCount, constableEnabled },
        onSettingsSubmit
    } = props;

    return (
        <form onSubmit={handleSubmit(onSettingsSubmit)}>
            <div>
                <label htmlFor="playerCount">How Many Players?</label>
                <input
                    name="playerCount"
                    {...register('playerCount', { required: true })}
                    defaultValue={playerCount}
                    type="text"
                />
            </div>
            {errors.playerCount && <span>Must enter a player count</span>}
            <div>
                <label htmlFor="constableEnabled">Using Constable?</label>
                <input
                    name="constableEnabled"
                    {...register('constableEnabled')}
                    defaultChecked={constableEnabled}
                    type="checkbox"
                />
            </div>

            <input type="submit" />
        </form>
    );
}
