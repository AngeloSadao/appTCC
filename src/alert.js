import { Alert, Platform } from 'react-native';

export function mostrarAlert(titulo, mensagem) {

    if (Platform.OS === 'web') {

        window.alert(
            titulo + '\n\n' + mensagem
        );

    } else {

        Alert.alert(
            titulo,
            mensagem
        );

    }
}