import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },

  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  title: {
    marginTop: 310,
    color: '#526EAA',
    alignSelf: 'center',
    fontSize: 45,
    fontFamily: 'Gurajada',
    marginBottom: -50,
    userSelect: 'none',
  },

  title2: {
    color: '#7AC992',
    alignSelf: 'center',
    fontSize: 30,
    fontFamily: 'Gurajada',
    userSelect: 'none',
  },

  containerInput: {
    borderRadius: 18,
    borderColor: '#e9e9e9ff',
    borderWidth: 5,
    alignSelf: 'center',
    backgroundColor: "#FAFAFA",
    width: 340,
    height: 310,
    alignContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontFamily: 'Gurajada',
    fontSize: 24,
    marginBottom: -10,
    alignSelf: 'flex-start',
    marginLeft: 30,
    color: '#404348',
    userSelect: 'none',
  },

  input: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#81A1DF',
    borderRadius: 6,
    padding: 15,
    height: 38,
    width: 275,
  },    

  inputText: {
    height: 20,
    width: 100,
    flex: 1,
    marginHorizontal: 10,
    fontSize: 24,
    color: '#81A1DF',
    fontFamily: 'Gurajada',
    outlineStyle: 'none',
  },

  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 275,
  },

  option: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  radioText: {
    fontSize: 24,
    fontFamily: 'Gurajada',
    color: '#435E91',
  },

  activeText: {
    color: '#435E91',
  },

  circle: {
    width: 16,
    height: 16,
    borderRadius: 50,
    marginLeft: 6,
  },

  activeCircle: {
    backgroundColor: '#435E91',
  },

  inactiveCircle: {
    backgroundColor: '#D1DEF9',
  },

  button: {
    width: 300,
    height: 50,
    backgroundColor: '#D3DEF5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },

  buttonText: {
    color: '#526EAA',
    fontFamily: 'Gurajada',
    fontSize: 48,
  },

  containerCadastro: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
  },

  textCadastro: {
    fontFamily: 'Gurajada',
    fontSize: 24,
    color: '#404348',
  },

  cadastrarText: {
    fontFamily: 'Gurajada',
    fontSize: 24,
    color: '#468B5B',
    marginLeft: 5,
  },
});