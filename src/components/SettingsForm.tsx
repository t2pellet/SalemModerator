import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'react-native-paper';
import { SettingsState } from '../redux/slices/settings';
import FormTextInput from './form/FormTextInput';
import FormCheckbox from './form/FormCheckbox';

export interface SettingsProps {
    initialState: SettingsState;
    onSettingsSubmit: (data) => void;
}

export default function SettingsForm(props: SettingsProps) {
    const { initialState, onSettingsSubmit } = props;
    const { handleSubmit, control } = useForm<SettingsState>({
        defaultValues: initialState
    });

    return (
        <div className="settingsForm">
            <FormTextInput
                name="playerCount"
                control={control}
                rules={{ required: true, min: 4, max: 12 }}
                label="Player Count"
                errMsg="Must enter player count between 4 and 12"
            />
            <FormTextInput
                name="confessionTime"
                control={control}
                rules={{ required: true, min: 5, max: 30 }}
                label="Confession Time"
                errMsg="Must enter confession time between 5 and 30"
            />
            <FormTextInput
                name="displayTime"
                control={control}
                rules={{ required: true, min: 1, max: 10 }}
                label="Choice Display Time"
                errMsg="Must enter display time between 1 and 10"
            />
            <FormCheckbox name="constableEnabled" control={control} label="Using Constable" />
            <Button mode="contained" onPress={handleSubmit(onSettingsSubmit)}>
                Submit
            </Button>
        </div>
    );
}
