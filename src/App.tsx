import React from 'react';
import { Provider } from 'react-redux';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store';
import SettingsPage from './pages/SettingsPage';
import PlayersPage from './pages/PlayersPage';

const Stack = createNativeStackNavigator();

function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={null}>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="Settings" component={SettingsPage} />
                        <Stack.Screen name="Players" component={PlayersPage} />
                    </Stack.Navigator>
                </NavigationContainer>
            </PersistGate>
        </Provider>
    );
}

registerRootComponent(App);
