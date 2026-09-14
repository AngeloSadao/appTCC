import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },

  mapContainer: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
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
    color: '#60BC7C',
  },

  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    borderTopWidth: 7,
    borderColor: '#60BC7C',
    paddingHorizontal: 16,
    paddingTop: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
    boxShadow: '0px -4px 12px rgba(0,0,0,0.15)',
  },

  dragArea: {
    width: '100%',
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },

  dragHandle: {
    width: 55,
    height: 5,
    borderRadius: 10,
    backgroundColor: '#D0D0D0',
  },

  tituloContainer: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  titulo: {
    fontSize: 31,
    fontFamily: 'Gurajada',
    color: '#468B5B',
    marginLeft: 7,
  },

  linhaTitulo: {
    height: 1,
    width: '100%',
    backgroundColor: '#D5D5D5',
  },

  lista: {
    flex: 1,
    width: '100%',
  },

  listaConteudo: {
    paddingHorizontal: 2,
    paddingTop: 10,
    paddingBottom: 25,
  },

  card: {
    backgroundColor: '#D9F5E2',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 8,
    width: '100%',
  },

  cardLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#B8E8C8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 9,
  },

  cardInfo: {
    flex: 1,
    paddingRight: 5,
  },

  nome: {
    fontSize: 18,
    fontFamily: 'Gurajada',
    color: '#468B5B',
    marginBottom: 1,
  },

  rota: {
    fontSize: 13,
    fontFamily: 'Gurajada',
    color: '#333333',
    marginBottom: 1,
  },

  informacoes: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
    flexWrap: 'wrap',
  },

  info: {
    fontSize: 12,
    fontFamily: 'Gurajada',
    color: '#333333',
    marginRight: 14,
  },

  compatibilidade: {
    width: 85,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 3,
  },

  compatibilidadeNumero: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#468B5B',
  },

  compatibilidadeTexto: {
    fontSize: 10,
    fontFamily: 'Gurajada',
    color: '#468B5B',
    marginTop: -2,
    textAlign: 'center',
  },

  botaoVer: {
    marginTop: 3,
    paddingVertical: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  botaoVerTexto: {
    fontSize: 13,
    fontFamily: 'Gurajada',
    color: '#468B5B',
    marginRight: 4,
  },

  detalhesContainer: {
    width: '100%',
  },

  divisor: {
    height: 1,
    backgroundColor: '#A8DDB8',
    marginVertical: 7,
  },

  detalhesTitulo: {
    fontSize: 17,
    fontFamily: 'Gurajada',
    color: '#468B5B',
    marginBottom: 5,
  },

  detalhe: {
    fontSize: 13,
    fontFamily: 'Gurajada',
    color: '#333333',
    marginBottom: 3,
  },

  botaoEscolher: {
    marginTop: 9,
    backgroundColor: '#468B5B',
    borderRadius: 7,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  botaoEscolherTexto: {
    fontSize: 14,
    fontFamily: 'Gurajada',
    color: '#FFFFFF',
    marginRight: 5,
  },

  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 8,
    fontSize: 16,
    fontFamily: 'Gurajada',
    color: '#468B5B',
  },

  vazio: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },

  vazioTitulo: {
    fontSize: 22,
    fontFamily: 'Gurajada',
    color: '#333333',
    textAlign: 'center',
  },

  vazioTexto: {
    marginTop: 7,
    fontSize: 15,
    fontFamily: 'Gurajada',
    color: '#777777',
    textAlign: 'center',
  },

});