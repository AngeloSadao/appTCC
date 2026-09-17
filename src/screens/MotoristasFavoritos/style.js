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
    fontSize: 50,
    fontFamily: 'Gurajada',
    lineHeight: 32,
    userSelect: 'none',
  },

  title2: {
    color: '#7AC992',
    fontSize: 35,
    fontFamily: 'Gurajada',
    lineHeight: 22,
    userSelect: 'none',
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

  botaoMenu: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  conteudo: {
    position: 'absolute',
    top: 410,
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
  },

  botaoAdicionar: {
    backgroundColor: '#468B5B',
    height: 42,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    marginBottom: 10,
  },

  textoBotaoAdicionar: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },

  adicionarContainer: {
    backgroundColor: '#fafafa',
    borderWidth: 5,
    borderColor: '#f4f4f4',
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
  },

  label: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#468B5B',
    marginBottom: 5,
  },

  input: {
    height: 38,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    fontSize: 11,
    color: '#404348',
  },

  botaoConfirmar: {
    backgroundColor: '#7AC992',
    height: 35,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },

  textoBotaoConfirmar: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },

  listaContainer: {
    flex: 1,
  },

  lista: {
    paddingBottom: 20,
  },

  card: {
    backgroundColor: '#fafafa',
    borderWidth: 5,
    borderRadius: 16,
    borderColor: '#f4f4f4',
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },

  fotoContainer: {
    width: 65,
    alignItems: 'center',
    justifyContent: 'center',
  },

  foto: {
    width: 55,
    height: 55,
    borderRadius: 30,
    objectFit: 'cover',
  },

  informacoes: {
    flex: 1,
    marginLeft: 8,
  },

  nome: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#404348',
    marginBottom: 5,
  },

  linhaTelefone: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  telefone: {
    fontSize: 10,
    color: '#555555',
  },

  botaoFavorito: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
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