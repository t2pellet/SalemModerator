import React from 'react';
import { Provider } from 'react-redux';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { store } from './redux/store';
import SettingsPage from './pages/SettingsPage';

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Provider store={store}>
                <Stack.Navigator>
                    <Stack.Screen name="Settings" component={SettingsPage} />
                </Stack.Navigator>
            </Provider>
        </NavigationContainer>
    );
}

registerRootComponent(App);
