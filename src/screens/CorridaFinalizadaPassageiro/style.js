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
        top: 320,
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
        top: 385,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        gap: 8,
    },

    containerResumo: {
        backgroundColor: '#fafafa',
        borderWidth: 5,
        borderRadius: 16,
        borderColor: '#f4f4f4',
        paddingVertical: 8,
        paddingHorizontal: 12,
        gap: 4,
    },

    resumoCardLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#3D5A99',
    },

    resumoBody: {
        flexDirection: 'row',
        gap: 8,
    },

    resumoEsquerda: {
        flex: 1.4,
        gap: 4,
    },

    resumoDireita: {
        flex: 1,
        gap: 2,
    },

    resumoLabel: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#404348',
    },

    resumoValor: {
        fontSize: 10,
        fontWeight: 'normal',
        color: '#404348',
    },

    resumoInfoLabel: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#404348',
    },

    resumoInfoValor: {
        fontSize: 10,
        fontWeight: 'normal',
        color: '#404348',
    },

    containerRecompensa: {
        top: 5,
        backgroundColor: '#fafafa',
        borderWidth: 5,
        borderRadius: 16,
        borderColor: '#f4f4f4',
        paddingVertical: 8,
        paddingHorizontal: 12,
        gap: 6,
    },

    titleRecompensas: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#3D5A99',
    },

    subtitleRecompensas: {
        fontSize: 11,
        color: '#404348',
    },

    gorjetaRow: {
        flexDirection: 'row',
        gap: 8,
    },

    gorjetaBtn: {
        flex: 1,
        height: 36,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#D3DEF5',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },

    gorjetaBtnSelecionado: {
        backgroundColor: '#3D5A99',
        borderColor: '#3D5A99',
    },

    gorjetaBtnText: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#3D5A99',
        textAlign: 'center',
    },

    gorjetaBtnTextSelecionado: {
        color: '#fff',
    },

    inputOutroValor: {
        borderWidth: 1.5,
        borderColor: '#3D5A99',
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontSize: 12,
        color: '#404348',
        backgroundColor: '#fff',
    },

    containerExperiencia: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fafafa',
        borderWidth: 5,
        borderRadius: 16,
        borderColor: '#f4f4f4',
        paddingHorizontal: 12,
        height: 46,
        top: 5,
    },

    titleExperiencia: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#404348',
    },

    subtitleExperiencia: {
        fontSize: 11,
        color: '#404348',
    },

    buttonConfirmar: {
        top: 20,
        height: 42,
        backgroundColor: '#3D5A99',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    },

    inputOutroValor: {
        borderWidth: 1.5,
        borderColor: '#3D5A99',
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
    },

    inputOutroValorText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#3D5A99',
    },

    tecladoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 6,
        marginTop: 6,
        marginBottom: 6,
    },

    teclaBtn: {
        width: 60,
        height: 32,
        borderRadius: 8,
        backgroundColor: '#D3DEF5',
        justifyContent: 'center',
        alignItems: 'center',
    },

    teclaBtnText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#3D5A99',
    },

    carregando: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },

    textoCarregando: {
        marginTop: 10,
        fontSize: 15,
        color: '#555',
    },

    erro: {
        color: '#555',
        fontSize: 16,
    },

    recompensaTitulo: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#435E91',
        marginBottom: 5,
    },

    recompensaSubtitulo: {
        fontSize: 12,
        color: '#555',
        marginBottom: 10,
    },

    gorjetasContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    botaoGorjeta: {
        borderWidth: 1,
        borderColor: '#9DB2D4',
        borderRadius: 8,
        paddingVertical: 7,
        paddingHorizontal: 12,
        backgroundColor: '#fff',
    },

    botaoGorjetaSelecionado: {
        backgroundColor: '#435E91',
    },

    textoGorjeta: {
        fontSize: 11,
        color: '#435E91',
        fontWeight: '500',
    },

    textoGorjetaSelecionado: {
        color: '#fff',
    },

    inputOutroValor: {
        height: 38,
        borderWidth: 1,
        borderColor: '#9DB2D4',
        borderRadius: 8,
        marginTop: 10,
        paddingHorizontal: 12,
        fontSize: 13,
        backgroundColor: '#fff',
    },

    estrelasContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },

    estrela: {
        marginHorizontal: 3,
    },

    textoAvaliacao: {
        textAlign: 'center',
        marginTop: 5,
        fontSize: 12,
        color: '#666',
    },
});