import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  scroll: {
    paddingBottom: 35,
  },

  backgroundImage: {
    width: '100%',
    height: '90%',
    position: 'absolute',
  },

  backButton: {
    position: 'absolute',
    left: 18,
    bottom: 8,
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },

  titleArea: {
    alignItems: 'center',
    marginTop: 180,
    marginBottom: 8,
  },

  title: {
    fontFamily: 'Gurajada',
    fontSize: 60,
    lineHeight: 40,
    color: '#435E91',
    textAlign: 'center',
  },

  subtitle: {
    fontFamily: 'Gurajada',
    fontSize: 35,
    lineHeight: 23,
    color: '#60b68a',
    textAlign: 'center',
    marginTop: -2,
    marginBottom: 20,
  },


  // FOTO DE PERFIL
  fotoContainer: {
    alignSelf: 'center',
    position: 'relative',
    marginTop: 3,
    marginBottom: 20,
  },

  foto: {
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 2,
    borderColor: '#60b68a',
  },

  fotoVazia: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: '#F3F7F5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#60b68a',
  },

  camera: {
    position: 'absolute',
    right: -2,
    bottom: 0,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#60b68a',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#60b68a',
  },

  fotoTexto: {
    display: 'none',
  },

  containerInput: {
    borderRadius: 18,
    borderColor: '#e9e9e9ff',
    borderWidth: 5,
    alignSelf: 'center',
    backgroundColor: "#FAFAFA",
    width: 390,
    alignItems: 'none',
  },
  
  sectionTitle: {
    display: 'none',
  },

  label: {
    fontFamily: 'Gurajada',
    fontSize: 22,
    color: '#60b68a',
    marginTop: 1,
    marginBottom: 2,
  },

  input: {
    height: 47,
    borderWidth: 1.4,
    borderColor: '#60b68a',
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 2,
    backgroundColor: '#FFFFFF',
  },

  inputText: {
    flex: 1,
    fontFamily: 'Gurajada',
    fontSize: 22,
    marginLeft: 8,
    color: '#555555',
    paddingVertical: 0,
  },

  button: {
    height: 53,
    backgroundColor: '#91DDB5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 40,
    marginTop: 17,
  },

  buttonText: {
    fontFamily: 'Gurajada',
    fontSize: 50,
    color: '#285A48',
  },

  // EXCLUIR / CANCELAR
  cancelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 9,
    marginBottom: 5,
  },

  cancelText: {
    fontFamily: 'Gurajada',
    fontSize: 25,
    color: '#D9534F',
  },

});