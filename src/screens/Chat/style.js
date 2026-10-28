import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f4f6f4',
  },

  carregando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f6f4',
  },

  header: {
    height: 70,
    backgroundColor: '#526EAA',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  botaoVoltar: {
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },

  infoHeader: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 5,
  },

  nomesHeader: {
    flex: 1,
    justifyContent: 'center',
  },

  nomeMotoristaHeader: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 19,
  },

  nomePassageiroHeader: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 19,
  },

  avatarMensagem: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
    alignSelf: 'flex-end',
    overflow: 'hidden',
  },

  fotoMensagem: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },

  areaMensagens: {
    flex: 1,
  },

  listaMensagens: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },

  linhaMensagem: {
    width: '100%',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  linhaMinha: {
    justifyContent: 'flex-end',
  },

  linhaOutra: {
    justifyContent: 'flex-start',
  },

  balao: {
    maxWidth: '78%',
    minWidth: 70,
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 16,
  },

  balaoMinha: {
    backgroundColor: '#d9f0df',
    borderBottomRightRadius: 4,
  },

  balaoOutra: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#e2e2e2',
  },

  textoMensagem: {
    fontSize: 16,
    lineHeight: 21,
  },

  textoMinha: {
    color: '#1f3325',
  },

  textoOutra: {
    color: '#333',
  },

  informacoesMensagem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 4,
    gap: 3,
  },

  hora: {
    fontSize: 10,
  },

  horaMinha: {
    color: '#607565',
  },

  horaOutra: {
    color: '#888',
  },

  areaEntrada: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  input: {
    flex: 1,
    minHeight: 45,
    maxHeight: 110,
    backgroundColor: '#f1f1f1',
    borderRadius: 23,
    paddingHorizontal: 17,
    paddingVertical: 11,
    fontSize: 16,
    color: '#333',
    marginRight: 8,
    outlineStyle: 'none',
  },

  botaoEnviar: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: '#526EAA',
    justifyContent: 'center',
    alignItems: 'center',
  },

  botaoEnviarDesativado: {
    backgroundColor: '#aeb9b0',
  },

  semMensagens: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  textoSemMensagens: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },

  subtextoSemMensagens: {
    marginTop: 5,
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },

});
