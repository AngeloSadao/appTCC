import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },

    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },

    title: {
        marginTop: 375,
        color: '#526EAA',
        alignSelf: 'center',
        fontSize: 48,
        fontFamily: 'Gurajada',
        lineHeight: 35,
        userSelect: 'none',
    },

    title2: {
        color: '#7AC992',
        alignSelf: 'center',
        fontSize: 32,
        fontFamily: 'Gurajada',
        lineHeight: 25,
        userSelect: 'none',
        marginBottom: 15,
    },

    containerResumo: {
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: 350,
        height: 125,
        backgroundColor: "#fafafa",
        borderWidth: 6,
        borderRadius: 18,
        borderColor: "#f4f4f4",
        marginBottom: 10,
    },

    //Container Resumo
    containerResumo: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: 350,
        minHeight: 125,
        backgroundColor: "#fafafa",
        borderWidth: 6,
        borderRadius: 18,
        borderColor: "#f4f4f4",
        marginBottom: 10,
        padding: 12,
        gap: 8,
    },

    resumoEsquerda: {
        flex: 1.4,
        justifyContent: 'space-around',
        gap: 8,
    },

    resumoDireita: {
        flex: 1,
        justifyContent: 'space-around',
        gap: 4,
    },

    resumoLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#7AC992',
    },

    resumoValor: {
        fontSize: 12,
        fontWeight: 'normal',
        color: '#404348',
    },

    resumoInfoLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#404348',
    },

    resumoInfoValor: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#404348',
    },

    containerExperiencia: {
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: 350,
        height: 54,
        backgroundColor: "#fafafa",
        borderWidth: 6,
        borderRadius: 18,
        borderColor: "#f4f4f4",
    },

    buttonConfirmar: {
        width: 294,
        height: 90,
        backgroundColor: '#D3DEF5',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 18,
        alignSelf: 'center',
    },
});