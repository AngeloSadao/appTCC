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
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderTopWidth: 10,
    borderColor: '#84d89f',
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
    boxShadow: '0px -4px 12px rgba(0, 0, 0, 0.15)',
  },
  
  dragHandle: {
    width: 60,
    height: 6,
    borderRadius: 10,
    backgroundColor: '#d0d0d0',
    marginBottom: 1,
  },

  title: {
    lineHeight: 45,
    fontSize: 64,
    fontFamily: 'Gurajada',
    userSelect: 'none',
  },

  titleNome: {
    color: '#60BC7C',
  },

  text: {
    fontSize: 32,
    marginBottom: -40,
    fontFamily: 'Gurajada',
    userSelect: 'none',
  },

  text2: {
    fontSize: 32,
    fontFamily: 'Gurajada',
    userSelect: 'none',
  },

  formScroll: {
    width: '100%',
    flex: 1,
  },

  formScrollContent: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 50,
  },

  labelInput: {
    fontSize: 18,
    fontFamily: 'Gurajada',
    alignSelf: 'flex-start',
    marginTop: 8,
    color: '#333',
  },

  inputField: {
    borderWidth: 1,
    borderColor: '#468B5B',
    borderRadius: 8,
    padding: 8,
    width: '100%',
    marginBottom: 4,
    fontSize: 16,
    fontFamily: 'Gurajada',
  },

  input: {
    borderWidth: 1,
    borderColor: '#468B5B',
    borderRadius: 8,
    padding: 8,
    width: '100%',
    marginBottom: 4,
    fontSize: 16,
    fontFamily: 'Gurajada',
  },

  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 8,
    minHeight: 28,
  },

  checkboxLabel: {
    fontSize: 16,
    fontFamily: 'Gurajada',
    color: '#333',
    flex: 1,
  },

  checkboxAtivo: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: '#468B5B',
    borderWidth: 1,
    borderColor: '#468B5B',
    marginLeft: 10,
  },

  checkboxInativo: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#aaa',
    marginLeft: 10,
  },

  titleConfirmacao: {
    fontSize: 40,
    fontFamily: 'Gurajada',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },

  infoRow: {
    borderWidth: 1,
    borderColor: '#BCF2CD',
    borderRadius: 8,
    padding: 8,
    width: '100%',
    marginBottom: 4,
  },

  infoText: {
    fontSize: 16,
    fontFamily: 'Gurajada',
    color: '#333',
  },

  button: {
    backgroundColor: '#60BC7C',
    padding: 10,
    borderRadius: 10,
    marginTop: 1,
    marginBottom: 10,
    alignItems: 'center',
  },

  buttonConfirmar: {
    backgroundColor: '#60BC7C',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Gurajada',
  },

  sugestaoLista: {
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 4,
    maxHeight: 120,
    overflow: 'hidden',
  },

  sugestaoItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  sugestaoTexto: {
    fontSize: 13,
    fontFamily: 'Gurajada',
    color: '#333',
  },

  chatMotorista: {
    fontSize: 18,
    fontFamily: 'Gurajada',
    color: '#468B5B',
  },

  chatPassageiro: {
    fontSize: 18,
    fontFamily: 'Gurajada',
    color: '#435E91',
    marginBottom: 10,
  },

  chatContainer: {
    width: '100%',
  },

  mensagemEsquerda: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 8,
  },

  mensagemDireita: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: 8,
  },

  fotoUsuario: {
    width: 25,
    height: 25,
    borderRadius: 15,
    backgroundColor: '#ddd',
    marginHorizontal: 5,
  },

  balaoVerde: {
    borderWidth: 1,
    borderColor: '#468B5B',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    maxWidth: '70%',
  },

  balaoAzul: {
    borderWidth: 1,
    borderColor: '#435E91',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    maxWidth: '70%',
  },

  textoMensagem: {
    fontSize: 14,
    fontFamily: 'Gurajada',
    color: '#333',
  },

  chatNextButton: {
    alignSelf: 'flex-end',
    marginTop: 5,
    padding: 5,
  },

  chatNextText: {
    fontSize: 35,
    color: '#333',
  },

  tituloDestinoDestaque: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2A6DF4',
    textAlign: 'center',
  },

});