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

    menuContainer: {
        position: 'absolute',
        top: 42,
        left: 27,
        zIndex: 20,
    },

    botaoMenu: {
        width: 45,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
    },

    titulosContainer: {
        position: 'absolute',
        top: 335,
        width: '100%',
        alignItems: 'center',
        zIndex: 20,
    },

    title: {
        color: '#4B68A1',
        fontSize: 30,
        fontWeight: 'bold',
    },

    title2: {
        color: '#72C989',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 2,
    },

    scroll: {
        flex: 1,
        marginTop: 410,
    },

    conteudoScroll: {
        alignItems: 'center',
        paddingTop: 12,
        paddingBottom: 30,
        top: 10,
    },

    cardBonificacoes: {
        width: '88%',
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 15,
        borderWidth: 1,
        borderColor: '#E8E8E8',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },

    cardTitulo: {
        color: '#222222',
        fontSize: 16,
        fontWeight: 'bold',
    },

    cardSubtitulo: {
        color: '#777777',
        fontSize: 9,
        marginTop: 3,
    },

    linha: {
        width: '100%',
        height: 1,
        backgroundColor: '#E8E8E8',
        marginVertical: 12,
    },

    itemBonificacao: {
        width: '100%',
        minHeight: 78,
        backgroundColor: '#E8F6EB',
        borderRadius: 10,
        padding: 11,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 9,
    },

    iconeContainer: {
        width: 45,
        height: 45,
        borderRadius: 23,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 11,
    },

    info: {
        flex: 1,
    },

    itemTitulo: {
        color: '#222222',
        fontSize: 12,
        fontWeight: 'bold',
    },

    itemDescricao: {
        color: '#777777',
        fontSize: 8,
        marginTop: 2,
    },

    valor: {
        color: '#468B5B',
        fontSize: 19,
        fontWeight: 'bold',
        marginTop: 5,
    },

    valorPontos: {
        color: '#468B5B',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 5,
    },

    cardCupons: {
        width: '88%',
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 15,
        marginTop: 13,
        borderWidth: 1,
        borderColor: '#E8E8E8',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },

    cabecalhoCupons: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    cardTituloCupons: {
        color: '#222222',
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 7,
    },

    textoCupons: {
        color: '#777777',
        fontSize: 9,
        marginTop: 7,
        lineHeight: 14,
    },

    emBreve: {
        width: '100%',
        marginTop: 11,
        backgroundColor: '#E8F6EB',
        borderRadius: 9,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },

    textoEmBreve: {
        color: '#468B5B',
        fontSize: 8,
        fontWeight: 'bold',
        marginLeft: 6,
        flex: 1,
    },

    espacoFinal: {
        height: 200,
    },

    carregando: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },

    textoCarregando: {
        marginTop: 10,
        color: '#468B5B',
        fontSize: 13,
    },

    erro: {
        color: '#555555',
        fontSize: 13,
    },

});