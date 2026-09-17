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
    top: 390,
    left: 28,
    width: 32,
    height: 28,
    justifyContent: 'space-between',
    zIndex: 999,
    elevation: 10,
  },

  menuLinha: {
    width: 28,
    height: 2,
    backgroundColor: '#60BC7C',
    borderRadius: 2,
  },

  titulosContainer: {
    position: 'absolute',
    top: 320,
    left: 0,
    right: 0,
    alignItems: 'center',
    marginTop: 50,
    zIndex: 10,
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
    zIndex: 10,
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
    width: '100%',
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
    borderColor: '#60BC7C',
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
    backgroundColor: '#05ba3e2c',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textoBotao: {
    color: '#60BC7C',
    fontSize: 22,
    fontWeight: 'bold',
  },

  contatoCard: {
    width: '100%',
    minHeight: 50,
    marginTop: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#05ba3e2c',
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
    color: '#2b795c',
  },

  contatoTelefone: {
    marginTop: 2,
    fontSize: 10,
    color: '#2b795c',
  },

  remover: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#2b795c',
  },

  botaoContinuar: {
    width: '100%',
    height: 42,
    marginTop: 12,
    backgroundColor: '#60BC7C',
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