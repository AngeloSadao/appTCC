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
    top: 285,
    left: 0,
    right: 0,
    alignItems: 'center',
  },

  title: {
    color: '#526EAA',
    fontSize: 55,
    fontFamily: 'Gurajada',
    lineHeight: 32,
    userSelect: 'none',
  },

  title2: {
    color: '#7AC992',
    fontSize: 38,
    fontFamily: 'Gurajada',
    lineHeight: 22,
    userSelect: 'none',
  },

  menuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1000,
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

  cardsContainer: {
    position: 'absolute',
    top: 360,
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
  },

  lista: {
    paddingBottom: 20,
  },

  card: {
    backgroundColor: '#fafafa',
    borderWidth: 5,
    borderRadius: 16,
    borderColor: '#f4f4f4',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
    gap: 4,
  },

  linhaData: {
    alignItems: 'center',
    marginBottom: 4,
  },

  data: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#404348',
  },

  statusTexto: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#468B5B',
    marginTop: 2,
  },

  linhaLocal: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
  },

  iconeLocal: {
    width: 18,
    alignItems: 'center',
    paddingTop: 1,
  },

  textoLocalContainer: {
    flex: 1,
  },

  labelLocal: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#468B5B',
  },

  textoLocal: {
    fontSize: 8,
    color: '#404348',
    lineHeight: 11,
  },

  linha: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 3,
  },

  informacoes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 3,
  },

  informacao: {
    width: '48%',
  },

  informacaoLabel: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#468B5B',
  },

  informacaoValor: {
    fontSize: 8,
    color: '#404348',
  },

  botaoCancelar: {
    width: '100%',
    height: 32,
    backgroundColor: '#C94A4A',
    borderRadius: 8,
    marginTop: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },

  textoBotaoCancelar: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  carregando: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  carregandoTexto: {
    marginTop: 10,
    fontSize: 15,
    color: '#555',
  },

  vazio: {
    backgroundColor: '#fafafa',
    borderWidth: 5,
    borderRadius: 16,
    borderColor: '#f4f4f4',
    padding: 20,
    alignItems: 'center',
  },

  vazioTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
    marginTop: 10,
    textAlign: 'center',
  },

  vazioTexto: {
    fontSize: 10,
    color: '#777',
    textAlign: 'center',
    marginTop: 5,
  },

});
