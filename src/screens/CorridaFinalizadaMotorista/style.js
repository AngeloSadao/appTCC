import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  titulosContainer: {
    position: 'absolute',
    top: 320,
    left: 0,
    right: 0,
    alignItems: 'center',
  },

  title: {
    color: '#526EAA',
    fontSize: 36,
    fontFamily: 'Gurajada',
    lineHeight: 32,
    userSelect: 'none',
  },

  title2: {
    color: '#7AC992',
    fontSize: 22,
    fontFamily: 'Gurajada',
    lineHeight: 22,
    userSelect: 'none',
  },

  cardsContainer: {
    position: 'absolute',
    top: 385,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    gap: 8,
  },

  containerResumo: {
    backgroundColor: '#fafafa',
    borderWidth: 5,
    borderRadius: 16,
    borderColor: '#f4f4f4',
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 4,
  },

  resumoCardLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#3D5A99',
  },

  resumoBody: {
    flexDirection: 'row',
    gap: 8,
  },

  resumoEsquerda: {
    flex: 1.4,
    gap: 4,
  },

  resumoDireita: {
    flex: 1,
    gap: 3,
  },

  resumoLabel: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#404348',
  },

  resumoValor: {
    fontSize: 9,
    fontWeight: 'normal',
    color: '#404348',
  },

  resumoInfoLabel: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#404348',
  },

  resumoInfoValor: {
    fontSize: 9,
    fontWeight: 'normal',
    color: '#404348',
  },

  containerRecompensa: {
    backgroundColor: '#fafafa',
    borderWidth: 5,
    borderRadius: 16,
    borderColor: '#f4f4f4',
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 5,
  },

  titleRecompensas: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#3D5A99',
  },

  subtitleRecompensas: {
    fontSize: 10,
    color: '#404348',
  },

  recompensasBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  recompensaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    backgroundColor: '#e1f2e5',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 7,
    gap: 5,
  },

  recompensaTitulo: {
    fontSize: 8,
    color: '#468B5B',
    fontWeight: 'bold',
  },

  pontos: {
    fontSize: 14,
    color: '#468B5B',
    fontWeight: 'bold',
    marginTop: 1,
  },

  recompensaPequeno: {
    fontSize: 6,
    color: '#468B5B',
    marginTop: 1,
  },

  containerExperiencia: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fafafa',
    borderWidth: 5,
    borderRadius: 16,
    borderColor: '#f4f4f4',
    paddingHorizontal: 12,
    height: 50,
  },

  titleExperiencia: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#404348',
  },

  subtitleExperiencia: {
    fontSize: 9,
    color: '#666',
    marginTop: 2,
  },

  estrelasContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  estrela: {
    marginHorizontal: 1,
  },

  buttonConfirmar: {
    top: 8,
    height: 42,
    backgroundColor: '#9AD7AA',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },

  carregando: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  textoCarregando: {
    marginTop: 10,
    fontSize: 15,
    color: '#555',
  },

  erro: {
    color: '#555',
    fontSize: 16,
  },

});