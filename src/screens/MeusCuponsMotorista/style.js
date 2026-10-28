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
        top: 275,
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
        marginTop: -1,
    },

    scroll: {
        flex: 1,
        marginTop: 340,
    },

    conteudoScroll: {
        alignItems: 'center',
        paddingTop: 12,
        paddingBottom: 30,
        top: 10,
    },

    listaCupons: {
        width: '88%',
    },

    cupomItem: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 15,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#DDEFE1',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },

    cupomCabecalho: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    cupomIcone: {
        width: 45,
        height: 45,
        borderRadius: 23,
        backgroundColor: '#E8F6EB',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 11,
    },

    cupomTituloContainer: {
        flex: 1,
    },

    cupomNome: {
        color: '#222222',
        fontSize: 14,
        fontWeight: 'bold',
    },

    cupomColaborador: {
        color: '#777777',
        fontSize: 12,
        marginTop: 3,
    },

    cupomDesconto: {
        color: '#468B5B',
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 12,
    },

    cupomDescricao: {
        color: '#777777',
        fontSize: 12,
        marginTop: 1,
    },

    cupomMinimo: {
        color: '#555555',
        fontSize: 12,
        marginTop: 8,
    },

    cupomValidade: {
        color: '#555555',
        fontSize: 12,
        marginTop: 4,
    },

    cupomPontos: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: '#E8F6EB',
        borderRadius: 8,
        paddingVertical: 7,
        paddingHorizontal: 9,
    },

    cupomPontosTexto: {
        color: '#468B5B',
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: 5,
    },

    cupomCodigo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        backgroundColor: '#F4FBF5',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#DDEFE1',
        paddingVertical: 7,
        paddingHorizontal: 9,
    },

    cupomCodigoTexto: {
        color: '#468B5B',
        fontSize: 10,
        fontWeight: 'bold',
        marginLeft: 5,
    },

    cupomResgate: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 9,
    },

    cupomResgateTexto: {
        color: '#777777',
        fontSize: 12,
        marginLeft: 5,
    },

    cardVazio: {
        width: '88%',
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 25,
        alignItems: 'center',
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

    tituloVazio: {
        color: '#222222',
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center',
    },

    textoVazio: {
        color: '#777777',
        fontSize: 12,
        marginTop: 6,
        textAlign: 'center',
        lineHeight: 14,
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

    cupomStatus: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 9,
    },

    cupomStatusExpirado: {
        color: '#C94C4C',
        fontSize: 11,
        fontWeight: 'bold',
        marginLeft: 5,
    },

    cupomStatusResgatado: {
        color: '#D99A00',
        fontSize: 11,
        fontWeight: 'bold',
        marginLeft: 5,
    },

    cupomStatusUtilizado: {
        color: '#468B5B',
        fontSize: 11,
        fontWeight: 'bold',
        marginLeft: 5,
    },

    botaoUtilizar: {
        width: '100%',
        height: 38,
        borderRadius: 8,
        backgroundColor: '#468B5B',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },

    textoBotaoUtilizar: {
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: 'bold',
    },

    botaoUtilizado: {
        width: '100%',
        height: 38,
        borderRadius: 8,
        backgroundColor: '#E8F6EB',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 10,
    },

    textoBotaoUtilizado: {
        color: '#468B5B',
        fontSize: 13,
        fontWeight: 'bold',
        marginLeft: 5,
    },

});