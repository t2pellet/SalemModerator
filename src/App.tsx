import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store';
import SettingsPage from './pages/SettingsPage';
import PlayersPage from './pages/PlayersPage';
import DawnPage from './pages/DawnPage';
import DayPage from './pages/DayPage';
import NightPage from './pages/NightPage';

const Stack = createNativeStackNavigator();

function App() {
    return (
        <StoreProvider store={store}>
            <PaperProvider>
                <PersistGate persistor={persistor} loading={null}>
                    <NavigationContainer>
                        <Stack.Navigator screenOptions={{ headerShown: false }}>
                            <Stack.Screen name="Settings" component={SettingsPage} />
                            <Stack.Screen name="Players" component={PlayersPage} />
                            <Stack.Screen name="Dawn" component={DawnPage} />
                            <Stack.Screen name="Day" component={DayPage} />
                            <Stack.Screen name="Night" component={NightPage} />
                        </Stack.Navigator>
                    </NavigationContainer>
                </PersistGate>
            </PaperProvider>
        </StoreProvider>
    );
}

registerRootComponent(App);
