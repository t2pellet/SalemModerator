import React from 'react';
import { Controller } from 'react-hook-form';
import { Checkbox } from 'react-native-paper';

type FormTextInputProps = {
    name: string;
    control: any;
    rules?: any;
    label: string;
    errMsg?: string;
};

function FormTextInput({ name, control, rules, label, errMsg }: FormTextInputProps) {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                    <Checkbox.Item
                        key={name}
                        label={label}
                        onPress={() => onChange(!value)}
                        status={value ? 'checked' : 'unchecked'}
                    />
                    {error && <span>{errMsg}</span>}
                </>
            )}
        />
    );
}

FormTextInput.defaultProps = {
    rules: {},
    errMsg: 'Invalid input'
};

export default FormTextInput;
