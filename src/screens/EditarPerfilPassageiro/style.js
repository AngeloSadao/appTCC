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
    lineHeight: 60,
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
  },


  // FOTO DE PERFIL
  fotoContainer: {
    alignSelf: 'center',
    position: 'relative',
    marginTop: 3,
    marginBottom: 7,
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

  formCard: {
    marginHorizontal: 24,
    marginTop: 5,
    paddingHorizontal: 17,
    paddingTop: 12,
    paddingBottom: 17,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.10,
    shadowRadius: 7,
    elevation: 4,
  },
  

  sectionTitle: {
    display: 'none',
  },

  label: {
    fontFamily: 'Gurajada',
    fontSize: 22,
    color: '#60b68a',
    marginTop: 7,
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
    fontSize: 20,
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
    fontSize: 20,
    color: '#D9534F',
  },

});