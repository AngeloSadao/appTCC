import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },

    titulosContainer: {
        position: 'absolute',
        top: 305,
        left: 0,
        right: 0,
        alignItems: 'center',
    },

    title: {
        color: '#526EAA',
        fontSize: 36,
        fontFamily: 'Gurajada',
        lineHeight: 32,
        userSelect: 'none',
    },

    title2: {
        color: '#7AC992',
        fontSize: 22,
        fontFamily: 'Gurajada',
        lineHeight: 22,
        userSelect: 'none',
    },

    cardsContainer: {
        position: 'absolute',
        top: 365,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        gap: 7,
    },

    cardMotorista: {
        backgroundColor: '#fafafa',
        borderWidth: 5,
        borderRadius: 16,
        borderColor: '#f4f4f4',
        paddingVertical: 8,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    infoMotorista: {
        flex: 1,
    },

    nomeMotorista: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#468B5B',
    },

    tipoMotorista: {
        fontSize: 9,
        color: '#404348',
        marginTop: 2,
    },

    cpfContainer: {
        backgroundColor: '#e1f2e5',
        borderRadius: 8,
        paddingVertical: 5,
        paddingHorizontal: 12,
        alignItems: 'center',
        minWidth: 105,
    },

    cpfTitulo: {
        fontSize: 9,
        fontWeight: 'bold',
        color: '#468B5B',
    },

    cpfValor: {
        fontSize: 9,
        fontWeight: 'bold',
        color: '#404348',
        marginTop: 2,
    },

    cardPix: {
        backgroundColor: '#fafafa',
        borderWidth: 5,
        borderRadius: 16,
        borderColor: '#f4f4f4',
        paddingVertical: 8,
        paddingHorizontal: 12,
    },

    pixConteudo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 18,
    },

    qrContainer: {
        width: 105,
        height: 105,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    fotoContainer: {
        width: 75,
        height: 75,
        borderRadius: 40,
        backgroundColor: '#dcefe1',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },

    fotoMotorista: {
        width: 75,
        height: 75,
        borderRadius: 40,
    },

    instrucao: {
        backgroundColor: '#e1f2e5',
        borderRadius: 7,
        paddingVertical: 5,
        paddingHorizontal: 8,
        marginTop: 7,
        fontSize: 8,
        lineHeight: 11,
        color: '#404348',
        textAlign: 'center',
    },

    chavePix: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#468B5B',
        textAlign: 'center',
        marginTop: 5,
    },

    cardValor: {
        backgroundColor: '#fafafa',
        borderWidth: 5,
        borderRadius: 16,
        borderColor: '#f4f4f4',
        paddingVertical: 7,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    valorTitulo: {
        fontSize: 9,
        color: '#404348',
    },

    valor: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#468B5B',
        marginTop: 1,
    },

    botaoAlterar: {
        backgroundColor: '#e1f2e5',
        borderRadius: 8,
        paddingVertical: 7,
        paddingHorizontal: 12,
    },

    textoAlterar: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#468B5B',
    },

    botaoConfirmar: {
        height: 40,
        backgroundColor: '#9AD7AA',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 25,
        marginTop: 1,
    },

    textoConfirmar: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    },

});