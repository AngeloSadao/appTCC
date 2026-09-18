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
    color: '#435E91',
  },

  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderTopWidth: 10,
    borderColor: '#435E91',
    padding: 20,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
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
    marginBottom: 5,
  },

  title: {
    lineHeight: 45,
    fontSize: 64,
    fontFamily: 'Gurajada',
    userSelect: 'none',
  },

  titleNome: {
    color: '#435E91',
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
    paddingTop: 0,
    paddingBottom: 25,
  },

  labelInput: {
    fontSize: 22,
    lineHeight: 22,
    fontFamily: 'Gurajada',
    alignSelf: 'flex-start',
    marginTop: 5,
    marginBottom: 3,
    color: '#435E91',
  },

  inputFieldWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D3DEF5',
    borderRadius: 6,
    outlineStyle: 'none',
    borderWidth: 1,
    borderColor: '#435E91',
    width: '100%',
    height: 32,
    marginBottom: 3,
  },

  inputFieldInner: {
    flex: 1,
    outlineStyle: 'none',
    paddingHorizontal: 9,
    paddingVertical: 0,
    height: 30,
    fontSize: 18,
    fontFamily: 'Gurajada',
  },

  inputIcon: {
    paddingHorizontal: 8,
    fontSize: 18,
  },

  inputField: {
    backgroundColor: '#D3DEF5',
    borderWidth: 1,
    borderColor: '#435E91',
    borderRadius: 6,
    outlineStyle: 'none',
    paddingHorizontal: 9,
    paddingVertical: 0,
    width: '100%',
    height: 34,
    marginBottom: 3,
    fontSize: 18,
    fontFamily: 'Gurajada',
  },

  input: {
    backgroundColor: '#D3DEF5',
    borderWidth: 1,
    outlineStyle: 'none',
    borderColor: '#435E91',
    borderRadius: 6,
    paddingHorizontal: 9,
    paddingVertical: 0,
    width: '100%',
    height: 34,
    marginBottom: 3,
    fontSize: 18,
    fontFamily: 'Gurajada',
  },

  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 2,
    minHeight: 27,
  },

  checkboxLabel: {
    fontSize: 19,
    lineHeight: 21,
    fontFamily: 'Gurajada',
    color: '#333',
    flex: 1,
  },

  checkboxAtivo: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: '#435E91',
    borderWidth: 1,
    borderColor: '#435E91',
    marginLeft: 10,
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 19,
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
    fontSize: 34,
    lineHeight: 34,
    fontFamily: 'Gurajada',
    color: '#333',
    marginTop: 0,
    marginBottom: 2,
    textAlign: 'center',
  },

  infoRow: {
    backgroundColor: '#D3DEF5',
    borderWidth: 1,
    borderColor: '#435E91',
    borderRadius: 6,
    paddingHorizontal: 9,
    paddingVertical: 4,
    width: '100%',
    marginBottom: 3,
    minHeight: 32,
  },

  infoText: {
    fontSize: 18,
    lineHeight: 21,
    fontFamily: 'Gurajada',
    color: '#333',
  },

  button: {
    backgroundColor: '#435E91',
    padding: 10,
    borderRadius: 10,
    marginTop: -3,
    marginBottom: 10,
    alignItems: 'center',
  },

  /* BOTÃO DE CONFIRMAR MANTIDO */
  buttonConfirmar: {
    backgroundColor: '#435E91',
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
    marginTop: -14,
  },

  sugestaoLista: {
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 2,
    maxHeight: 100,
    overflow: 'hidden',
  },

  sugestaoItem: {
    padding: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  sugestaoTexto: {
    fontSize: 13,
    lineHeight: 15,
    fontFamily: 'Gurajada',
    color: '#333',
  },

});