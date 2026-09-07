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
    height: '150%',
  },

  overlay: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 150,
  },



  stepsContainer: {
    width: '100%',
    height: 70,
    justifyContent: 'center',
    marginBottom: 40,
  },

  line: {
    position: 'absolute',
    top: 20,
    left: 55,
    right: 55,
    height: 3,
    backgroundColor: '#808080',
  },

  stepsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  stepWrapper: {
    alignItems: 'center',
  },

  stepActive: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#D9E2F7',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },

  stepInactive: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#4E9B5B',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },

  stepTextActive: {
    color: '#4D6CB3',
    fontSize: 20,
    fontWeight: 'bold',
  },

  stepTextInactive: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  stepLabelActive: {
    marginTop: 10,
    color: '#404348',
    fontSize: 13,
    fontWeight: '600',
  },

  stepLabelInactive: {
    marginTop: 10,
    color: '#4E9B5B',
    fontSize: 13,
    fontWeight: '600',
  },


});