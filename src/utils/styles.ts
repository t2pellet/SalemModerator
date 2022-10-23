import { MD3DarkTheme as darkTheme, MD3LightTheme as lightTheme } from 'react-native-paper';
import { StyleSheet, ViewStyle } from 'react-native';

const main: ViewStyle = {
    flex: 1,
    height: '100%',
    backgroundColor: darkTheme.colors.background,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
};

const styles = StyleSheet.create({
    main,
    day: {
        ...main,
        backgroundColor: lightTheme.colors.backdrop
    }
});

export default styles;
