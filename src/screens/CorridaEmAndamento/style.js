import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  mapa: {
    flex: 1,
    position: 'relative',
  },

  botaoVoltar: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    elevation: 5,
  },

  painel: {
    backgroundColor: '#fff',
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    elevation: 10,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },

  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#468B5B',
    textAlign: 'center',
    marginBottom: 12,
  },

  linha: {
    height: 1,
    backgroundColor: '#ddd',
    marginBottom: 14,
  },

  informacao: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  textos: {
    marginLeft: 10,
    flex: 1,
  },

  label: {
    fontSize: 12,
    color: '#777',
    marginBottom: 2,
  },

  valor: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },

  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 15,
  },

  statusBolinha: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#468B5B',
    marginRight: 7,
  },

  statusTexto: {
    fontSize: 14,
    color: '#468B5B',
    fontWeight: 'bold',
  },

  botaoFinalizar: {
    height: 48,
    borderRadius: 10,
    backgroundColor: '#468B5B',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  textoBotaoFinalizar: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 8,
  },

  carregando: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  erro: {
    color: '#555',
    fontSize: 16,
  },

});