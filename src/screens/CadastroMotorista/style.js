import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  container: {
    flex: 1,
  },

  title: {
    marginTop: 0,
    fontSize: 27,
    fontWeight: 'bold',
    color: '#4D6CB3',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 15,
    color: '#7BC17D',
    textAlign: 'center',
    marginBottom: 22,
    fontWeight: '600',
  },

  input: {
    width: '100%',
    height: 46,
    backgroundColor: '#fff',
    borderWidth: 1.2,
    borderColor: '#7D9BE6',
    borderRadius: 8,
    paddingHorizontal: 13,
    marginBottom: 9,
    fontSize: 13,
    color: '#4A4A4A',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },

  containerInput: {
    borderRadius: 18,
    borderColor: '#e9e9e9ff',
    borderWidth: 5,
    alignSelf: 'center',
    backgroundColor: "#FAFAFA",
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  inputHalfLeft: {
    width: '48%',
    height: 46,
    backgroundColor: '#fff',
    borderWidth: 1.2,
    borderColor: '#7D9BE6',
    borderRadius: 8,
    paddingHorizontal: 13,
    marginBottom: 9,
    fontSize: 13,
    color: '#4A4A4A',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },

  inputHalfRight: {
    width: '48%',
    height: 46,
    backgroundColor: '#fff',
    borderWidth: 1.2,
    borderColor: '#7D9BE6',
    borderRadius: 8,
    paddingHorizontal: 13,
    marginBottom: 9,
    fontSize: 13,
    color: '#4A4A4A',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },

  inputContainer: {
    width: '100%',
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1.2,
    borderColor: '#7D9BE6',
    borderRadius: 8,
    paddingHorizontal: 13,
    marginBottom: 9,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },

  inputSenha: {
    flex: 1,
    fontSize: 13,
    color: '#4A4A4A',
  },

  button: {
    width: '100%',
    height: 46,
    backgroundColor: '#C8D5F2',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 7,
    marginBottom: 18,
  },

  buttonText: {
    color: '#4D6CB3',
    fontSize: 25,
    fontWeight: 'bold',
  },

  textLogar: {
    fontFamily: 'Gurajada',
    fontSize: 25,
    color: '#404348',
    textAlign: 'center',
  },

  logarText: {
    fontFamily: 'Gurajada',
    fontSize: 25,
    color: '#468B5B',
    textAlign: 'center',
    marginTop: -20,
    marginBottom: 5,
  },

  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  overlay: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 130,
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
    backgroundColor: '#4E9B5B',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },

  stepInactive: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#D9E2F7',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },

  stepTextActive: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  stepTextInactive: {
    color: '#4D6CB3',
    fontSize: 20,
    fontWeight: 'bold',
  },

  stepLabelActive: {
    marginTop: 10,
    color: '#4E9B5B',
    fontSize: 13,
    fontWeight: '600',
  },

  stepLabelInactive: {
    marginTop: 10,
    color: '#404348',
    fontSize: 13,
    fontWeight: '600',
  },

});