import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  container: {
    flex: 1,
  },

  title: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#4D6CB3',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 20,
    color: '#7BC17D',
    textAlign: 'center',
    marginBottom: 26,
    fontWeight: '600',
  },

  containerInput: {
    borderRadius: 18,
    borderColor: '#e9e9e9ff',
    borderWidth: 5,
    alignSelf: 'center',
    backgroundColor: "#FAFAFA",
    width: 390,
    alignContent: 'center',
    alignItems: 'center',
  },

  input: {
    width: 380,
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
    paddingTop: 110,
  },

});