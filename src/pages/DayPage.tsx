import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export default function DayPage({ navigation }: NativeStackScreenProps<any>) {
    return (
        <div className="dayPage">
            <h1>Daytime</h1>
            <button type="button" onClick={() => navigation.navigate('Night')}>
                Nighttime
            </button>
        </div>
    );
}
