import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  PanResponder,
  ScrollView,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';

import styles from './style';

const icon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function CaronasDisponiveis({ route }) {
  const navigation = useNavigation();

  const nome = route.params?.nome ?? 'Usuário';
  const idPassageiro = route.params?.idPassageiro;

  const [caronas, setCaronas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // PAINEL
  const alturaPainel = 500;
  const alturaFechada = 55;
  const fechadoY = alturaPainel - alturaFechada;

  const alturaAnim = useRef(
    new Animated.Value(alturaPainel)
  ).current;

  const translateY = useRef(
    new Animated.Value(0)
  ).current;

  const startY = useRef(0);

  useEffect(() => {
    buscarCaronas();
  }, []);

  async function buscarCaronas() {
    try {
      setCarregando(true);

      const resposta = await fetch(
        'http://localhost/appTcc/buscarCaronas.php'
      );

      const dados = await resposta.json();

      console.log('Resposta das caronas:', dados);

      if (dados.sucesso) {
        setCaronas(dados.caronas || []);
      } else {
        window.alert(
          dados.mensagem ||
          'Não foi possível carregar as caronas.'
        );
      }

    } catch (erro) {
      console.log(
        'Erro ao buscar caronas:',
        erro
      );

      window.alert(
        'Não foi possível carregar as caronas disponíveis.'
      );

    } finally {
      setCarregando(false);
    }
  }

  /*
   * O PanResponder fica SOMENTE na barrinha.
   *
   * Assim o ScrollView consegue receber
   * o gesto de rolagem normalmente.
   */
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gesture) => {
      return Math.abs(gesture.dy) > 5;
    },

    onPanResponderGrant: () => {
      startY.current = translateY.__getValue();
    },

    onPanResponderMove: (_, gesture) => {
      let novoValor =
        startY.current + gesture.dy;

      if (novoValor < 0) {
        novoValor = 0;
      }

      if (novoValor > fechadoY) {
        novoValor = fechadoY;
      }

      translateY.setValue(novoValor);
    },

    onPanResponderRelease: (_, gesture) => {

      if (gesture.dy > 20) {

        Animated.timing(translateY, {
          toValue: fechadoY,
          duration: 300,
          useNativeDriver: false,
        }).start();

        return;
      }

      if (gesture.dy < -20) {

        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start();

        return;
      }

      const meio = fechadoY / 2;

      Animated.timing(translateY, {
        toValue:
          translateY.__getValue() > meio
            ? fechadoY
            : 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    },
  });

  function formatarData(data) {
    if (!data) return '';

    const partes = data.split('-');

    if (partes.length !== 3) {
      return data;
    }

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  }

  function formatarHorario(horario) {
    if (!horario) return '';

    return horario.substring(0, 5);
  }

  function quantidadeDeVagas(carona) {
    const quantidade =
      Number(carona.quantidadeVagas);

    if (!quantidade || quantidade < 1) {
      return 1;
    }

    return quantidade;
  }

  function mostrarPreferencias(carona) {
    const preferencias = [];

    if (
      Number(carona.passageiroMasculino) === 1
    ) {
      preferencias.push(
        'Passageiro masculino'
      );
    }

    if (
      Number(carona.passageiroFeminino) === 1
    ) {
      preferencias.push(
        'Passageira feminina'
      );
    }

    if (
      Number(carona.comPet) === 1
    ) {
      preferencias.push(
        'Aceita pet'
      );
    }

    return preferencias;
  }

  function selecionarCarona(carona) {
    navigation.navigate(
      'DetalhesCarona',
      {
        carona: carona,
        nome: nome,
        idPassageiro: idPassageiro,
      }
    );
  }

  return (
    <View style={styles.container}>

      {/* MAPA */}
      <View style={styles.mapContainer}>

        <MapContainer
          center={[-24.4979, -47.8449]}
          zoom={15}
          zoomControl={false}
          attributionControl={false}
          style={{
            width: '100%',
            height: '100%',
          }}
        >

          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />

          {/* MARCADORES DAS CARONAS */}
          {caronas.map((carona) => {

            const latitude = Number(
              carona.latitudeOrigem
            );

            const longitude = Number(
              carona.longitudeOrigem
            );

            if (
              !Number.isFinite(latitude) ||
              !Number.isFinite(longitude)
            ) {
              return null;
            }

            return (
              <Marker
                key={`marcador-${carona.idCarona}`}
                position={[
                  latitude,
                  longitude,
                ]}
                icon={icon}
              >
                <Popup>
                  <div style={{ minWidth: '220px' }}>

                    <div
                      style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: '#526EAA',
                        marginBottom: '8px',
                      }}
                    >
                      {carona.nomeMotorista}
                    </div>

                    <div
                      style={{
                        fontSize: '14px',
                        marginBottom: '4px',
                      }}
                    >
                      <strong>Origem:</strong>{' '}
                      {carona.origemCarona}
                    </div>

                    <div
                      style={{
                        fontSize: '14px',
                        marginBottom: '4px',
                      }}
                    >
                      <strong>Destino:</strong>{' '}
                      {carona.destinoCarona}
                    </div>

                    <div
                      style={{
                        fontSize: '14px',
                        marginBottom: '4px',
                      }}
                    >
                      <strong>Data:</strong>{' '}
                      {formatarData(carona.dataCarona)}
                    </div>

                    <div
                      style={{
                        fontSize: '14px',
                        marginBottom: '4px',
                      }}
                    >
                      <strong>Horário:</strong>{' '}
                      {formatarHorario(carona.horarioCarona)}
                    </div>

                    <div
                      style={{
                        fontSize: '14px',
                        marginBottom: '8px',
                      }}
                    >
                      <strong>Vagas:</strong>{' '}
                      {quantidadeDeVagas(carona)}
                    </div>

                    {mostrarPreferencias(carona).length > 0 && (
                      <div
                        style={{
                          fontSize: '13px',
                          marginBottom: '10px',
                        }}
                      >
                        <strong>Preferências:</strong>
                        <br />
                        {mostrarPreferencias(carona).join(' • ')}
                      </div>
                    )}

                    {Number(carona.maisDeUma) === 1 && (
                      <div
                        style={{
                          fontSize: '13px',
                          marginBottom: '10px',
                        }}
                      >
                        Aceita mais de uma pessoa
                      </div>
                    )}

                    <button
                      onClick={() => {
                        window.alert(
                          'Carona escolhida! O chat com o motorista será aberto aqui.'
                        );
                      }}
                      style={{
                        width: '100%',
                        padding: '9px',
                        border: 'none',
                        borderRadius: '7px',
                        backgroundColor: '#526EAA',
                        color: '#FFFFFF',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                      }}
                    >
                      Escolher esta carona
                    </button>

                  </div>
                </Popup>
              </Marker>
            );
          })}

        </MapContainer>

      </View>

      {/* MENU */}
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.openDrawer()}
      >
        <Ionicons
          name="menu"
          size={38}
          color="#435E91"
        />
      </TouchableOpacity>

      {/* PAINEL */}
      <Animated.View
        style={[
          styles.bottomSheet,
          {
            height: alturaAnim,
            transform: [
              {
                translateY: translateY,
              },
            ],
          },
        ]}
      >

        {/* BARRINHA DO PAINEL */}
        <View
          {...panResponder.panHandlers}
          style={styles.dragArea}
        >
          <View style={styles.dragHandle} />
        </View>

        {/* TÍTULO */}
        <View style={styles.tituloContainer}>

          <Text style={styles.titulo}>
            Caronas disponíveis
          </Text>

        </View>

        {/* CARREGANDO */}
        {carregando && (
          <Text style={styles.mensagem}>
            Carregando caronas...
          </Text>
        )}

        {/* NENHUMA CARONA */}
        {!carregando &&
          caronas.length === 0 && (
            <Text style={styles.mensagem}>
              Nenhuma carona disponível no momento.
            </Text>
          )}

        {/* LISTA */}
        {!carregando &&
          caronas.length > 0 && (

            <ScrollView
              style={styles.listaScroll}
              contentContainerStyle={
                styles.lista
              }
              showsVerticalScrollIndicator={true}
              nestedScrollEnabled={true}
            >

              {caronas.map((carona) => {

                const preferencias =
                  mostrarPreferencias(
                    carona
                  );

                const vagas =
                  quantidadeDeVagas(
                    carona
                  );

                return (

                  <TouchableOpacity
                    key={carona.idCarona}
                    style={styles.caronaCard}
                    onPress={() =>
                      selecionarCarona(
                        carona
                      )
                    }
                  >

                    {/* ÍCONE */}
                    <View
                      style={
                        styles.usuarioIcon
                      }
                    >
                      <Ionicons
                        name="person-outline"
                        size={24}
                        color="#81A1DF"
                      />
                    </View>

                    {/* INFORMAÇÕES */}
                    <View
                      style={
                        styles.informacoes
                      }
                    >

                      {/* MOTORISTA */}
                      <Text
                        style={
                          styles.motorista
                        }
                        numberOfLines={1}
                      >
                        {carona.nomeMotorista}
                      </Text>

                      {/* ORIGEM */}
                      <Text
                        style={
                          styles.origem
                        }
                        numberOfLines={2}
                      >
                        {carona.origemCarona}
                      </Text>

                      {/* DESTINO */}
                      <Text
                        style={
                          styles.destino
                        }
                        numberOfLines={2}
                      >
                        {carona.destinoCarona}
                      </Text>

                      {/* DATA E HORÁRIO */}
                      <Text
                        style={
                          styles.dataHorario
                        }
                      >
                        {formatarData(
                          carona.dataCarona
                        )}
                        {' às '}
                        {formatarHorario(
                          carona.horarioCarona
                        )}
                      </Text>

                      {/* PREFERÊNCIAS */}
                      {preferencias.length > 0 && (

                        <Text
                          style={
                            styles.preferencias
                          }
                          numberOfLines={2}
                        >
                          {preferencias.join(
                            ' • '
                          )}
                        </Text>

                      )}

                      {/* MAIS DE UMA PESSOA */}
                      {Number(
                        carona.maisDeUma
                      ) === 1 && (

                          <Text
                            style={
                              styles.preferencias
                            }
                          >
                            Aceita mais de uma pessoa
                          </Text>

                        )}

                    </View>

                    {/* VAGAS */}
                    <View
                      style={
                        styles.vagasContainer
                      }
                    >

                      <Text
                        style={
                          styles.vagasNumero
                        }
                      >
                        {vagas}
                      </Text>

                      <Text
                        style={
                          styles.vagasTexto
                        }
                      >
                        {vagas === 1
                          ? 'vaga'
                          : 'vagas'}
                      </Text>

                      <Text
                        style={
                          styles.vagasTexto
                        }
                      >
                        disponíveis
                      </Text>

                    </View>

                  </TouchableOpacity>

                );

              })}

            </ScrollView>

          )}

      </Animated.View>

    </View>
  );
}