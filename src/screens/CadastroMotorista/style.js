import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  container: {
    flex: 1,
  },

  logo: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#7D9BE6',
    textAlign: 'center',
    marginBottom: 20,
  },

  title: {
    marginTop: 70,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#4D6CB3',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 18,
    color: '#7BC17D',
    textAlign: 'center',
    marginBottom: 50,
    fontWeight: '600',
  },

  input: {
    width: '100%',
    height: 55,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#7D9BE6',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 15,
    color: '#4A4A4A',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },

  inputContainer: {
    width: '100%',
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#7D9BE6',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },

  inputSenha: {
    flex: 1,
    fontSize: 15,
    color: '#4A4A4A',
  },

  button: {
    width: '100%',
    height: 55,
    backgroundColor: '#C8D5F2',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },

  buttonText: {
    color: '#4D6CB3',
    fontSize: 20,
    fontWeight: 'bold',
  },

  textLogar: {
    fontFamily: 'Gurajada',
    fontSize: 24,
    color: '#404348',
    marginLeft: 90,
  },

  logarText: {
    fontFamily: 'Gurajada',
    fontSize: 24,
    color: '#468B5B',
    marginLeft: 215,
    marginTop: -48,
  },

  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  overlay: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 150,
  },

});