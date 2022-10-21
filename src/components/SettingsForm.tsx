import React from 'react';
import { useForm } from 'react-hook-form';
import { SettingsState } from '../redux/slices/settings';

export interface SettingsProps {
    initialState: SettingsState;
    onSettingsSubmit: (data) => void;
}

export default function SettingsForm(props: SettingsProps) {
    const { initialState, onSettingsSubmit } = props;
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<SettingsState>({
        defaultValues: initialState
    });

    return (
        <form onSubmit={handleSubmit(onSettingsSubmit)}>
            <div>
                <label htmlFor="playerCount">How Many Players?</label>
                <input
                    name="playerCount"
                    {...register('playerCount', { required: true, min: 4, max: 12 })}
                    type="text"
                />
            </div>
            {errors.playerCount && (
                <span className="errorText">Must enter a player count between 4 and 12</span>
            )}
            <div>
                <label htmlFor="delayTime">Delay Time</label>
                <input
                    name="delayTime"
                    {...register('delayTime', { required: true, min: 2, max: 30 })}
                    type="text"
                />
            </div>
            {errors.delayTime && (
                <span className="errorText">Must enter a delay time between 5 and 30</span>
            )}
            <div>
                <label htmlFor="constableEnabled">Using Constable?</label>
                <input name="constableEnabled" {...register('constableEnabled')} type="checkbox" />
            </div>

            <input type="submit" />
        </form>
    );
}
