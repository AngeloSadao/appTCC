import React, { useState, useRef, useEffect } from 'react';

import { Ionicons } from '@expo/vector-icons';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  PanResponder,
  Easing,
  ScrollView,
} from 'react-native';

import 'leaflet/dist/leaflet.css';
import { useNavigation } from '@react-navigation/native';

import L from 'leaflet';

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from 'react-leaflet';

import styles from './style';

const formatarData = (texto) => {
  const numeros = texto.replace(/\D/g, '').slice(0, 8);

  if (numeros.length <= 2) {
    return numeros;
  }

  if (numeros.length <= 4) {
    return numeros.slice(0, 2) + '/' + numeros.slice(2);
  }

  return (
    numeros.slice(0, 2) +
    '/' +
    numeros.slice(2, 4) +
    '/' +
    numeros.slice(4)
  );
};

const formatarHorario = (texto) => {
  const numeros = texto.replace(/\D/g, '').slice(0, 4);

  if (numeros.length <= 2) {
    return numeros;
  }

  return numeros.slice(0, 2) + ':' + numeros.slice(2);
};

const icon = new L.Icon({
  iconUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',

  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',

  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function AtualizarMapa({ origem, destino }) {
  const map = useMap();

  useEffect(() => {
    if (origem && destino) {
      map.flyToBounds([origem, destino], {
        padding: [50, 50],
        duration: 1.2,
      });
    } else if (origem) {
      map.flyTo(origem, 14, {
        duration: 1.2,
      });
    }
  }, [origem, destino]);

  return null;
}

export default function HomePassageiro({ route }) {

  const nome = route.params?.nome ?? 'Usuário';
  const idPassageiro = route.params?.idPassageiro;

  const navigation = useNavigation();

  const [origemTexto, setOrigemTexto] = useState('');
  const [destinoTexto, setDestinoTexto] = useState('');
  const [dataSolicitacao, setDataSolicitacao] = useState('');
  const [horarioSolicitacao, setHorarioSolicitacao] = useState('');
  const [quantidadePassageiros, setQuantidadePassageiros] = useState('');

  const [preferencias, setPreferencias] = useState({
    motoristaMasculino: false,
    motoristaFeminino: false,
    comPet: false,
    maisDeUma: false,
  });

  function togglePreferencia(chave) {
    setPreferencias(prev => {
      const novoValor = !prev[chave];

      if (chave === 'maisDeUma' && !novoValor) {
        setQuantidadePassageiros('');
      }

      return {
        ...prev,
        [chave]: novoValor,
      };
    });
  }

  const [sugestoesOrigem, setSugestoesOrigem] = useState([]);
  const [sugestoesDestino, setSugestoesDestino] = useState([]);

  const [coordOrigem, setCoordOrigem] = useState(null);
  const [coordDestino, setCoordDestino] = useState(null);

  const selecionouOrigem = useRef(false);
  const selecionouDestino = useRef(false);

  const [rota, setRota] = useState([]);

  const [etapa, setEtapa] = useState(1);

  const alturaAnim = useRef(
    new Animated.Value(220)
  ).current;

  const translateY = useRef(
    new Animated.Value(0)
  ).current;

  const fadeAnim = useRef(
    new Animated.Value(1)
  ).current;

  const alturas = {
    1: 220,
    2: 600,
    3: 600,
  };

  const alturaVisivel = 50;

  const fechadoY =
    alturas[etapa] - alturaVisivel;

  const startY = useRef(0);

  async function buscarSugestoes(texto, tipo) {

    if (texto.length < 3) {

      if (tipo === 'origem') {
        setSugestoesOrigem([]);
      } else {
        setSugestoesDestino([]);
      }

      return;
    }

    try {

      const url =
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(texto)}&countrycodes=br`;

      const resposta = await fetch(url, {
        headers: {
          'Accept-Language': 'pt-BR',
        },
      });

      const dados = await resposta.json();

      if (tipo === 'origem') {
        setSugestoesOrigem(dados);
      } else {
        setSugestoesDestino(dados);
      }

    } catch (erro) {

      console.log(
        'Erro ao buscar endereço:',
        erro
      );
    }
  }


  useEffect(() => {

    if (selecionouOrigem.current) {

      selecionouOrigem.current = false;

      return;
    }

    const timer = setTimeout(() => {
      buscarSugestoes(
        origemTexto,
        'origem'
      );
    }, 1000);

    return () => clearTimeout(timer);

  }, [origemTexto]);


  useEffect(() => {

    if (selecionouDestino.current) {

      selecionouDestino.current = false;

      return;
    }

    const timer = setTimeout(() => {
      buscarSugestoes(
        destinoTexto,
        'destino'
      );
    }, 1000);

    return () => clearTimeout(timer);

  }, [destinoTexto]);


  async function calcularRota(
    cOrigem,
    cDestino
  ) {

    if (!cOrigem || !cDestino) {
      return;
    }

    const url =
      'https://router.project-osrm.org/route/v1/driving/' +
      cOrigem[1] +
      ',' +
      cOrigem[0] +
      ';' +
      cDestino[1] +
      ',' +
      cDestino[0] +
      '?overview=full&geometries=geojson';

    try {

      const resposta = await fetch(url);

      const dados = await resposta.json();

      if (
        dados.routes &&
        dados.routes.length > 0
      ) {

        const coords =
          dados.routes[0].geometry.coordinates;

        const latlngs =
          coords.map(c => [c[1], c[0]]);

        setRota(latlngs);
      }

    } catch (erro) {

      console.log(
        'Erro ao calcular rota:',
        erro
      );
    }
  }

  useEffect(() => {

    if (coordOrigem && coordDestino) {
      calcularRota(
        coordOrigem,
        coordDestino
      );
    }

  }, [coordOrigem, coordDestino]);

  function mudarEtapa(novaEtapa) {

    const novaAltura =
      alturas[novaEtapa];

    Animated.timing(
      fadeAnim,
      {
        toValue: 0,
        duration: 400,
        easing: Easing.out(
          Easing.cubic
        ),
        useNativeDriver: true,
      }
    ).start(() => {

      setEtapa(novaEtapa);

      translateY.setValue(0);

      Animated.parallel([

        Animated.timing(
          alturaAnim,
          {
            toValue: novaAltura,
            duration: 700,
            easing: Easing.out(
              Easing.cubic
            ),
            useNativeDriver: false,
          }
        ),

        Animated.timing(
          fadeAnim,
          {
            toValue: 1,
            duration: 400,
            easing: Easing.out(
              Easing.cubic
            ),
            useNativeDriver: true,
          }
        ),

      ]).start();

    });
  }

  function voltarEtapa() {
    if (etapa === 3) {
      mudarEtapa(2);
    } else if (etapa === 2) {
      mudarEtapa(1);
    }
  }

  function limparSolicitacao() {

    setOrigemTexto('');
    setDestinoTexto('');
    setDataSolicitacao('');
    setHorarioSolicitacao('');
    setQuantidadePassageiros('');

    setSugestoesOrigem([]);
    setSugestoesDestino([]);

    setCoordOrigem(null);
    setCoordDestino(null);

    setRota([]);

    setPreferencias({
      motoristaMasculino: false,
      motoristaFeminino: false,
      comPet: false,
      maisDeUma: false,
    });
  }


  function validarSolicitacao() {

    if (!origemTexto.trim()) {

      window.alert(
        'Informe o local onde você está.'
      );

      return false;
    }

    if (!destinoTexto.trim()) {

      window.alert(
        'Informe o local para onde você vai.'
      );

      return false;
    }

    if (dataSolicitacao.length !== 10) {

      window.alert(
        'Informe a data da solicitação no formato DD/MM/AAAA.'
      );

      return false;
    }

    if (horarioSolicitacao.length !== 5) {

      window.alert(
        'Informe o horário da solicitação no formato HH:MM.'
      );

      return false;
    }

    if (preferencias.maisDeUma) {

      const quantidade =
        parseInt(
          quantidadePassageiros,
          10
        );

      if (
        !quantidadePassageiros ||
        isNaN(quantidade) ||
        quantidade < 2
      ) {

        window.alert(
          'Informe a quantidade de passageiros.'
        );

        return false;
      }
    }

    return true;
  }

  async function confirmarSolicitacao() {

    if (!idPassageiro) {

      window.alert(
        'Não foi possível identificar o passageiro.'
      );

      return;
    }

    if (!validarSolicitacao()) {
      return;
    }

    try {

      const resposta = await fetch(
        'http://localhost/appTcc/salvarSolicitacaoCarona.php',
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify({

            idPassageiro:
              idPassageiro,

            nomePassageiro:
              nome,

            origem:
              origemTexto,

            destino:
              destinoTexto,

            data:
              dataSolicitacao,

            horario:
              horarioSolicitacao,

            motoristaMasculino:
              preferencias.motoristaMasculino,

            motoristaFeminino:
              preferencias.motoristaFeminino,

            comPet:
              preferencias.comPet,

            maisDeUmaPessoa:
              preferencias.maisDeUma,

            quantidadePassageiros:
              preferencias.maisDeUma
                ? parseInt(
                  quantidadePassageiros,
                  10
                )
                : 1,

            latitudeOrigem:
              coordOrigem
                ? coordOrigem[0]
                : null,

            longitudeOrigem:
              coordOrigem
                ? coordOrigem[1]
                : null,

            latitudeDestino:
              coordDestino
                ? coordDestino[0]
                : null,

            longitudeDestino:
              coordDestino
                ? coordDestino[1]
                : null,
          }),
        }
      );

      const dados =
        await resposta.json();

      if (dados.sucesso) {

        window.alert(
          'Solicitação de carona cadastrada com sucesso!'
        );

        limparSolicitacao();

        setEtapa(1);

        translateY.setValue(0);

        Animated.parallel([

          Animated.timing(
            alturaAnim,
            {
              toValue: alturas[1],
              duration: 500,
              easing: Easing.out(
                Easing.cubic
              ),
              useNativeDriver: false,
            }
          ),

          Animated.timing(
            fadeAnim,
            {
              toValue: 1,
              duration: 300,
              useNativeDriver: true,
            }
          ),

        ]).start();

      } else {

        window.alert(
          dados.mensagem ||
          'Não foi possível cadastrar a solicitação.'
        );
      }

    } catch (erro) {

      console.log(
        'Erro ao cadastrar solicitação:',
        erro
      );

      window.alert(
        'Não foi possível cadastrar a solicitação.'
      );
    }
  }

  const panResponder =
    PanResponder.create({

      onMoveShouldSetPanResponder:
        (_, gesture) => {

          return (
            Math.abs(gesture.dy) > 5
          );
        },

      onPanResponderGrant: () => {

        startY.current =
          translateY.__getValue();
      },

      onPanResponderMove:
        (_, gesture) => {

          let novoValor =
            startY.current +
            gesture.dy;

          if (novoValor < 0) {
            novoValor = 0;
          }

          if (novoValor > fechadoY) {
            novoValor = fechadoY;
          }

          translateY.setValue(
            novoValor
          );
        },

      onPanResponderRelease:
        (_, gesture) => {

          if (gesture.dy > 20) {

            Animated.timing(
              translateY,
              {
                toValue: fechadoY,
                duration: 300,
                easing: Easing.out(
                  Easing.cubic
                ),
                useNativeDriver: true,
              }
            ).start();

            return;
          }

          if (gesture.dy < -20) {

            Animated.timing(
              translateY,
              {
                toValue: 0,
                duration: 300,
                easing: Easing.out(
                  Easing.cubic
                ),
                useNativeDriver: true,
              }
            ).start();

            return;
          }

          const meio =
            fechadoY / 2;

          Animated.timing(
            translateY,
            {
              toValue:
                translateY.__getValue() >
                  meio
                  ? fechadoY
                  : 0,

              duration: 300,

              easing: Easing.out(
                Easing.cubic
              ),

              useNativeDriver: true,
            }
          ).start();
        },
    });

  return (
    <View style={styles.container}>

      <View style={styles.mapContainer}>

        <MapContainer
          center={[
            -24.4979,
            -47.8449
          ]}
          zoomControl={false}
          attributionControl={false}
          zoom={16}
          style={{
            width: '100%',
            height: '100%',
          }}
        >

          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {coordOrigem && (
            <Marker
              position={coordOrigem}
              icon={icon}
            >
              <Popup>
                Origem
              </Popup>
            </Marker>
          )}

          {coordDestino && (
            <Marker
              position={coordDestino}
              icon={icon}
            >
              <Popup>
                Destino
              </Popup>
            </Marker>
          )}

          {rota.length > 0 && (
            <Polyline
              positions={rota}
              color="blue"
              weight={5}
            />
          )}

          <AtualizarMapa
            origem={coordOrigem}
            destino={coordDestino}
          />

        </MapContainer>

      </View>

      <TouchableOpacity
        style={styles.menuButton}
        onPress={() =>
          navigation.openDrawer()
        }
      >
        <Text style={styles.menuIcon}>
          ☰
        </Text>
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.bottomSheet,
          {
            height: alturaAnim,
            transform: [
              {
                translateY:
                  translateY,
              },
            ],
          },
        ]}
      >

        <View
          {...panResponder.panHandlers}
        >
          <View
            style={styles.dragHandle}
          />
        </View>

        <Animated.View
          style={{
            opacity: fadeAnim,
            width: '100%',
            flex: 1,
            alignItems: 'center',
          }}
        >

          {etapa === 1 && (
            <>
              <Text
                style={styles.title}
                numberOfLines={2}
                adjustsFontSizeToFit
              >
                Olá,{' '}
                <Text
                  style={styles.titleNome}
                >
                  {nome}!
                </Text>
              </Text>

              <Text style={styles.text}>
                Precisa de uma carona?
              </Text>

              <Text style={styles.text2}>
                Para onde vai?
              </Text>

              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  mudarEtapa(2)
                }
              >
                <Text
                  style={styles.buttonText}
                >
                  Digite aqui
                </Text>
              </TouchableOpacity>
            </>
          )}

          {etapa === 2 && (
            <ScrollView
              style={styles.formScroll}
              contentContainerStyle={
                styles.formScrollContent
              }
              showsVerticalScrollIndicator={true}
              nestedScrollEnabled={true}
            >

              <Text
                style={styles.labelInput}
              >
                Você está em:
              </Text>

              <View style={styles.inputFieldWrapper}>
                <TextInput
                  style={styles.inputFieldInner}
                  placeholder="Origem"
                  value={origemTexto}
                  onChangeText={setOrigemTexto}
                />
                <Ionicons name="pencil-outline" size={18} color="#468B5B" />
              </View>

              {sugestoesOrigem.length >
                0 && (
                  <ScrollView
                    style={
                      styles.sugestaoLista
                    }
                    nestedScrollEnabled
                  >
                    {sugestoesOrigem.map(
                      (
                        item,
                        index
                      ) => (

                        <TouchableOpacity
                          key={index}
                          style={
                            styles.sugestaoItem
                          }
                          onPress={() => {

                            const coord = [
                              parseFloat(
                                item.lat
                              ),
                              parseFloat(
                                item.lon
                              ),
                            ];

                            selecionouOrigem.current =
                              true;

                            setCoordOrigem(
                              coord
                            );

                            setOrigemTexto(
                              item.display_name
                            );

                            setSugestoesOrigem(
                              []
                            );
                          }}
                        >

                          <Text
                            style={
                              styles.sugestaoTexto
                            }
                          >
                            {
                              item.display_name
                            }
                          </Text>

                        </TouchableOpacity>
                      )
                    )}
                  </ScrollView>
                )}

              <Text
                style={styles.labelInput}
              >
                Você vai para:
              </Text>

              <TextInput
                style={styles.inputField}
                placeholder="Destino"
                value={destinoTexto}
                onChangeText={
                  setDestinoTexto
                }
              />

              {sugestoesDestino.length >
                0 && (
                  <ScrollView
                    style={
                      styles.sugestaoLista
                    }
                    nestedScrollEnabled
                  >
                    {sugestoesDestino.map(
                      (
                        item,
                        index
                      ) => (

                        <TouchableOpacity
                          key={index}
                          style={
                            styles.sugestaoItem
                          }
                          onPress={() => {

                            const coord = [
                              parseFloat(
                                item.lat
                              ),
                              parseFloat(
                                item.lon
                              ),
                            ];

                            selecionouDestino.current =
                              true;

                            setCoordDestino(
                              coord
                            );

                            setDestinoTexto(
                              item.display_name
                            );

                            setSugestoesDestino(
                              []
                            );
                          }}
                        >

                          <Text
                            style={
                              styles.sugestaoTexto
                            }
                          >
                            {
                              item.display_name
                            }
                          </Text>

                        </TouchableOpacity>

                      )
                    )}
                  </ScrollView>
                )}

              <Text
                style={styles.labelInput}
              >
                Dia da carona:
              </Text>

              <TextInput
                style={styles.input}
                placeholder="DD/MM/AAAA"
                value={dataSolicitacao}
                onChangeText={(texto) =>
                  setDataSolicitacao(
                    formatarData(texto)
                  )
                }
                keyboardType="numeric"
                maxLength={10}
              />

              <Text
                style={styles.labelInput}
              >
                Horário da carona:
              </Text>

              <TextInput
                style={styles.input}
                placeholder="HH:MM"
                value={horarioSolicitacao}
                onChangeText={(texto) =>
                  setHorarioSolicitacao(
                    formatarHorario(texto)
                  )
                }
                keyboardType="numeric"
                maxLength={5}
              />

              <Text
                style={styles.labelInput}
              >
                Preferências:
              </Text>

              <TouchableOpacity
                style={styles.checkboxRow}
                onPress={() =>
                  togglePreferencia(
                    'motoristaMasculino'
                  )
                }
              >

                <Text
                  style={
                    styles.checkboxLabel
                  }
                >
                  Motorista do sexo masculino
                </Text>

                {preferencias.motoristaMasculino
                  ? <Text style={styles.checkboxAtivo}>✓</Text>
                  : <View style={styles.checkboxInativo} />}


              </TouchableOpacity>

              <TouchableOpacity
                style={styles.checkboxRow}
                onPress={() =>
                  togglePreferencia(
                    'motoristaFeminino'
                  )
                }
              >

                <Text
                  style={
                    styles.checkboxLabel
                  }
                >
                  Motorista do sexo feminino
                </Text>

                {preferencias.motoristaFeminino
                  ? <Text style={styles.checkboxAtivo}>✓</Text>
                  : <View style={styles.checkboxInativo} />}


              </TouchableOpacity>

              <TouchableOpacity
                style={styles.checkboxRow}
                onPress={() =>
                  togglePreferencia(
                    'comPet'
                  )
                }
              >

                <Text
                  style={
                    styles.checkboxLabel
                  }
                >
                  Carona com pet
                </Text>

                {preferencias.comPet
                  ? <Text style={styles.checkboxAtivo}>✓</Text>
                  : <View style={styles.checkboxInativo} />}

              </TouchableOpacity>

              <TouchableOpacity
                style={styles.checkboxRow}
                onPress={() =>
                  togglePreferencia(
                    'maisDeUma'
                  )
                }
              >

                <Text
                  style={
                    styles.checkboxLabel
                  }
                >
                  Carona para mais de uma pessoa
                </Text>

                {preferencias.maisDeUma
                  ? <Text style={styles.checkboxAtivo}>✓</Text>
                  : <View style={styles.checkboxInativo} />}

              </TouchableOpacity>

              {preferencias.maisDeUma && (
                <>
                  <Text
                    style={
                      styles.labelInput
                    }
                  >
                    Quantidade de passageiros:
                  </Text>

                  <TextInput
                    style={styles.input}
                    placeholder="Ex.: 2"
                    value={
                      quantidadePassageiros
                    }
                    onChangeText={texto =>
                      setQuantidadePassageiros(
                        texto
                          .replace(
                            /\D/g,
                            ''
                          )
                          .slice(0, 2)
                      )
                    }
                    keyboardType="numeric"
                    maxLength={2}
                  />
                </>
              )}

              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 8,
                  marginTop: 5,
                  paddingHorizontal: 10,
                  boxSizing: 'border-box',
                }}
              >

                <TouchableOpacity
                  onPress={voltarEtapa}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#4563A0',
                  }}
                >
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 25,
                      fontWeight: 'bold',
                      lineHeight: 28,
                    }}
                  >
                    ←
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.button,
                    {
                      width: 38,
                      height: 38,
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                  ]}
                  onPress={() => {

                    if (
                      validarSolicitacao()
                    ) {
                      mudarEtapa(3);
                    }

                  }}
                >

                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 25,
                      fontWeight: 'bold',
                      lineHeight: 28,
                    }}
                  >
                    →
                  </Text>

                </TouchableOpacity>

              </View>

            </ScrollView>
          )}

          {etapa === 3 && (
            <ScrollView
              style={styles.formScroll}
              contentContainerStyle={
                styles.formScrollContent
              }
              showsVerticalScrollIndicator={true}
              nestedScrollEnabled={true}
            >

              <Text
                style={
                  styles.titleConfirmacao
                }
              >
                Confirmar solicitação
              </Text>

              <Text
                style={styles.labelInput}
              >
                Passageiro:
              </Text>

              <View
                style={styles.infoRow}
              >
                <Text
                  style={styles.infoText}
                >
                  {nome}
                </Text>
              </View>

              <Text
                style={styles.labelInput}
              >
                Data:
              </Text>

              <View
                style={styles.infoRow}
              >
                <Text
                  style={styles.infoText}
                >
                  {dataSolicitacao}
                </Text>
              </View>

              <Text
                style={styles.labelInput}
              >
                Horário:
              </Text>

              <View
                style={styles.infoRow}
              >
                <Text
                  style={styles.infoText}
                >
                  {horarioSolicitacao}
                </Text>
              </View>

              <Text
                style={styles.labelInput}
              >
                Origem:
              </Text>

              <View
                style={styles.infoRow}
              >
                <Text
                  style={styles.infoText}
                >
                  {origemTexto}
                </Text>
              </View>

              <Text
                style={styles.labelInput}
              >
                Destino:
              </Text>

              <View
                style={styles.infoRow}
              >
                <Text
                  style={styles.infoText}
                >
                  {destinoTexto}
                </Text>
              </View>

              {preferencias.maisDeUma && (
                <>
                  <Text
                    style={
                      styles.labelInput
                    }
                  >
                    Quantidade de passageiros:
                  </Text>

                  <View
                    style={styles.infoRow}
                  >
                    <Text
                      style={
                        styles.infoText
                      }
                    >
                      {quantidadePassageiros}
                    </Text>
                  </View>
                </>
              )}

              <Text style={styles.labelInput}>
                Preferências selecionadas:
              </Text>

              <View style={styles.infoRow}>
                {preferencias.motoristaMasculino && (
                  <Text style={styles.infoText}>
                    • Motorista do sexo masculino
                  </Text>
                )}
                {preferencias.motoristaFeminino && (
                  <Text style={styles.infoText}>
                    • Motorista do sexo feminino
                  </Text>
                )}
                {preferencias.comPet && (
                  <Text style={styles.infoText}>
                    • Carona com pet
                  </Text>
                )}
                {preferencias.maisDeUma && (
                  <Text style={styles.infoText}>
                    • Mais de uma pessoa
                  </Text>
                )}
                {!preferencias.motoristaMasculino &&
                  !preferencias.motoristaFeminino &&
                  !preferencias.comPet &&
                  !preferencias.maisDeUma && (
                    <Text style={styles.infoText}>
                      • Nenhuma preferência selecionada
                    </Text>
                  )}
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 10,
                  marginTop: 5,
                }}
              >

                <TouchableOpacity
                  onPress={voltarEtapa}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#4563A0',
                  }}
                >
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 25,
                      fontWeight: 'bold',
                      lineHeight: 28,
                    }}
                  >
                    ←
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.buttonConfirmar,
                    {
                      width: '65%',
                      height: 38,
                      margin: 0,
                    },
                  ]}
                  onPress={
                    confirmarSolicitacao
                  }
                >

                  <Text
                    style={styles.buttonText}
                  >
                    Confirmar solicitação
                  </Text>

                </TouchableOpacity>

              </View>

            </ScrollView>
          )}

        </Animated.View>

      </Animated.View>

    </View>
  );
}