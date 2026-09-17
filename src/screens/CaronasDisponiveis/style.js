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
    color: '#526EAA',
  },

  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderTopWidth: 7,
    borderColor: '#526EAA',
    paddingHorizontal: 14,
    paddingTop: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
    boxShadow:
      '0px -4px 12px rgba(0, 0, 0, 0.15)',
  },

  dragArea: {
    width: '100%',
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },

  dragHandle: {
    width: 55,
    height: 6,
    borderRadius: 10,
    backgroundColor: '#cfcfcf',
  },

  tituloContainer: {
    width: '100%',
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },

  titulo: {
    fontSize: 40,
    fontFamily: 'Gurajada',
    color: '#526EAA',
  },

  listaScroll: {
    width: '100%',
    flex: 1,
  },

  lista: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 20,
  },

  caronaCard: {
    width: '100%',
    minHeight: 105,
    backgroundColor: '#C9D5ED',
    borderRadius: 12,
    marginBottom: 9,
    paddingHorizontal: 12,
    paddingVertical: 10,

    flexDirection: 'row',
    alignItems: 'center',
  },

  usuarioIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#526EAA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  usuarioIconTexto: {
    fontSize: 24,
  },

  informacoes: {
    flex: 1,
    paddingRight: 8,
  },

  motorista: {
    fontSize: 20,
    lineHeight: 19,
    fontFamily: 'Gurajada',
    color: '#435E91',
    fontWeight: 'bold',
    marginBottom: 2,
  },

  origem: {
    fontSize: 15,
    lineHeight: 15,
    fontFamily: 'Gurajada',
    color: '#435E91',
  },

  destino: {
    fontSize: 15,
    lineHeight: 15,
    fontFamily: 'Gurajada',
    color: '#435E91',
    marginTop: 2,
  },

  dataHorario: {
    fontSize: 15,
    lineHeight: 14,
    fontFamily: 'Gurajada',
    color: '#404348',
    marginTop: 4,
  },

  preferencias: {
    fontSize: 15,
    lineHeight: 13,
    fontFamily: 'Gurajada',
    color: '#435E91',
    marginTop: 3,
  },

  vagasContainer: {
    width: 72,
    minHeight: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#AAB8D5',
    paddingLeft: 8,
  },

  vagasNumero: {
    fontSize: 26,
    lineHeight: 28,
    fontFamily: 'Gurajada',
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  vagasTexto: {
    fontSize: 11,
    lineHeight: 12,
    fontFamily: 'Gurajada',
    color: '#333',
    textAlign: 'center',
  },

  mensagem: {
    fontSize: 17,
    fontFamily: 'Gurajada',
    color: '#435E91',
    textAlign: 'center',
    marginTop: 15,
  },

});