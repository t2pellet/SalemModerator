import React from 'react';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import SettingsForm from '../components/SettingsForm';

function SettingsPage({ navigation }: NativeStackScreenProps<any>) {
    const handleSubmit = () => {
        navigation.navigate('Players');
    };

    return (
        <View>
            <SettingsForm onSettingsSubmit={handleSubmit} />
        </View>
    );
}

export default SettingsPage;
