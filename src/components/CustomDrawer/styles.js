import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  fotoPerfil: {
    width: 130,
    height: 130,
    borderRadius: 100,
    marginTop: 20,
    marginBottom: 8,
  },

  textNomeUsuario: {
    fontSize: 40,
    lineHeight: 30,
    fontFamily: 'Gurajada',
    color: '#1a1a1a',
    textAlign: 'center',
  },

  nomeUsuario: {
    fontSize: 40,
    color: '#81A1DF',
    textAlign: 'center',
  },

  editarPerfil: {
    fontSize: 24,
    lineHeight: 20,
    fontFamily: 'Gurajada',
    color: '#81A1DF',
    marginBottom: 24,
  },

  button: {
    alignSelf: 'flex-start',
    backgroundColor: '#D1DEF9',
    padding: 14,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    marginBottom: 10,
    width: 230,
    height: 50,
  },

  buttonText: {
    color: '#435E91',
    fontWeight: '500',
    fontSize: 15,
  },

  rodape: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingBottom: 20,
  },

  fecharMenu: {
    fontSize: 15,
    color: '#435E91',
    fontWeight: 'bold',
    marginBottom: 4,
  },

  sairRow: {
    flexDirection: 'row',
    gap: 4,
  },

  sairLabel: {
    fontSize: 13,
    color: '#6B7280',
  },

  sairLink: {
    fontSize: 13,
    color: '#435E91',
    fontWeight: 'bold',
  },
});