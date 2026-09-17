import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },

    menuButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1000,
        padding: 10,
        borderRadius: 10,
    },

    menuIcon: {
        fontSize: 40,
        color: '#7AC992',
    },

    titulosContainer: {
        position: 'absolute',
        top: 320,
        left: 0,
        right: 0,
        alignItems: 'center',
        marginTop: 50,
    },

    title: {
        color: '#526EAA',
        fontSize: 50,
        fontFamily: 'Gurajada',
        lineHeight: 32,
        userSelect: 'none',
    },

    title2: {
        color: '#7AC992',
        fontSize: 30,
        fontFamily: 'Gurajada',
        lineHeight: 22,
        userSelect: 'none',
    },

    linha: {
        position: 'absolute',
        top: 435,
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: '#AAB3BB',
    },

    conteudo: {
        position: 'absolute',
        top: 460,
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 28,
    },

    scrollConteudo: {
        flex: 1,
        width: '100%',
    },

    scrollConteudoInterno: {
        width: '100%',
        alignItems: 'center',
        paddingBottom: 30,
    },

    cardCadastro: {
        backgroundColor: '#FAFAFA',
        borderWidth: 4,
        borderColor: '#F2F2F2',
        borderRadius: 16,
        paddingHorizontal: 18,
        paddingVertical: 14,
        alignItems: 'center',
    },

    textoExplicativo: {
        fontSize: 13,
        color: '#353638',
        textAlign: 'center',
        lineHeight: 13,
    },

    input: {
        width: '100%',
        height: 36,
        marginTop: 8,
        paddingHorizontal: 12,
        borderWidth: 1.5,
        borderColor: '#7D9BE6',
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        fontSize: 13,
        color: '#404348',
        textAlign: 'center',
    },

    botaoAdicionar: {
        width: '80%',
        height: 40,
        marginTop: 10,
        backgroundColor: '#D3DEF5',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },

    textoBotao: {
        color: '#526EAA',
        fontSize: 22,
        fontWeight: 'bold',
    },

    contatoCard: {
        width: '100%',
        minHeight: 50,
        marginTop: 8,
        paddingHorizontal: 14,
        paddingVertical: 8,
        backgroundColor: '#D3DEF5',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    contatoInformacoes: {
        flex: 1,
    },

    contatoNome: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#526EAA',
    },

    contatoTelefone: {
        marginTop: 2,
        fontSize: 10,
        color: '#526EAA',
    },

    remover: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#526EAA',
    },

    botaoContinuar: {
        width: '100%',
        height: 42,
        marginTop: 12,
        backgroundColor: '#526EAA',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    textoBotaoContinuar: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: 'bold',
    },

});