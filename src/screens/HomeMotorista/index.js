import React, { useState, useRef, useEffect } from 'react';
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

  if (numeros.length <= 2) return numeros;

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

  if (numeros.length <= 2) return numeros;

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

export default function HomeMotorista({ route }) {
  const nome = route.params?.nome ?? 'Motorista';
  const idMotorista = route.params?.idMotorista;

  const navigation = useNavigation();

  const [origemTexto, setOrigemTexto] = useState('');
  const [destinoTexto, setDestinoTexto] = useState('');
  const [dataCarona, setDataCarona] = useState('');
  const [horario, setHorario] = useState('');
  const [quantidadeVagas, setQuantidadeVagas] = useState('');

  const [sugestoesOrigem, setSugestoesOrigem] = useState([]);
  const [sugestoesDestino, setSugestoesDestino] = useState([]);

  const [coordOrigem, setCoordOrigem] = useState(null);
  const [coordDestino, setCoordDestino] = useState(null);
  const [rota, setRota] = useState([]);

  const selecionouOrigem = useRef(false);
  const selecionouDestino = useRef(false);

  const [preferencias, setPreferencias] = useState({
    passageiroMasculino: false,
    passageiroFeminino: false,
    comPet: false,
    maisDeUma: false,
  });

  function togglePreferencia(chave) {
    setPreferencias(prev => {
      const novoValor = !prev[chave];

      if (chave === 'maisDeUma' && !novoValor) {
        setQuantidadeVagas('');
      }

      return {
        ...prev,
        [chave]: novoValor,
      };
    });
  }

  const [etapa, setEtapa] = useState(1);

  const alturaAnim = useRef(new Animated.Value(220)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const alturas = {
    1: 220,
    2: 650,
    3: 650,
  };

  const alturaVisivel = 50;
  const fechadoY = alturas[etapa] - alturaVisivel;
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
        `https://nominatim.openstreetmap.org/search?format=json&q=${texto}&countrycodes=br`;

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
      console.log('Erro ao buscar endereço:', erro);
    }
  }

  useEffect(() => {
    if (selecionouOrigem.current) {
      selecionouOrigem.current = false;
      return;
    }

    const timer = setTimeout(() => {
      buscarSugestoes(origemTexto, 'origem');
    }, 1000);

    return () => clearTimeout(timer);
  }, [origemTexto]);

  useEffect(() => {
    if (selecionouDestino.current) {
      selecionouDestino.current = false;
      return;
    }

    const timer = setTimeout(() => {
      buscarSugestoes(destinoTexto, 'destino');
    }, 1000);

    return () => clearTimeout(timer);
  }, [destinoTexto]);

  async function calcularRota(cOrigem, cDestino) {
    if (!cOrigem || !cDestino) return;

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

      if (dados.routes.length > 0) {
        const coords = dados.routes[0].geometry.coordinates;

        const latlngs = coords.map(c => [c[1], c[0]]);

        setRota(latlngs);
      }
    } catch (erro) {
      console.log('Erro rota:', erro);
    }
  }

  useEffect(() => {
    if (coordOrigem && coordDestino) {
      calcularRota(coordOrigem, coordDestino);
    }
  }, [coordOrigem, coordDestino]);

  function mudarEtapa(novaEtapa) {
    const novaAltura = alturas[novaEtapa];

    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 400,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      setEtapa(novaEtapa);

      translateY.setValue(0);

      Animated.parallel([
        Animated.timing(alturaAnim, {
          toValue: novaAltura,
          duration: 700,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: false,
        }),

        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
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

  function limparCarona() {
    setOrigemTexto('');
    setDestinoTexto('');
    setDataCarona('');
    setHorario('');
    setQuantidadeVagas('');

    setSugestoesOrigem([]);
    setSugestoesDestino([]);

    setCoordOrigem(null);
    setCoordDestino(null);
    setRota([]);

    setPreferencias({
      passageiroMasculino: false,
      passageiroFeminino: false,
      comPet: false,
      maisDeUma: false,
    });
  }

  function validarCarona() {
    if (!origemTexto.trim()) {
      window.alert('Informe o local de origem da carona.');
      return false;
    }

    if (!destinoTexto.trim()) {
      window.alert('Informe o local de destino da carona.');
      return false;
    }

    if (dataCarona.length !== 10) {
      window.alert(
        'Informe a data da carona no formato DD/MM/AAAA.'
      );
      return false;
    }

    if (horario.length !== 5) {
      window.alert(
        'Informe o horário da carona no formato HH:MM.'
      );
      return false;
    }

    if (preferencias.maisDeUma) {
      const vagas = parseInt(quantidadeVagas, 10);

      if (!quantidadeVagas || isNaN(vagas) || vagas < 2) {
        window.alert(
          'Informe a quantidade de vagas para a carona.'
        );
        return false;
      }
    }

    return true;
  }

  async function confirmarCarona() {
    if (!idMotorista) {
      window.alert('Não foi possível identificar o motorista.');
      return;
    }

    if (!origemTexto.trim()) {
      window.alert('Informe o local de origem da carona.');
      return;
    }

    if (!destinoTexto.trim()) {
      window.alert('Informe o local de destino da carona.');
      return;
    }

    if (dataCarona.length !== 10) {
      window.alert(
        'Informe a data da carona no formato DD/MM/AAAA.'
      );
      return;
    }

    if (horario.length !== 5) {
      window.alert(
        'Informe o horário da carona no formato HH:MM.'
      );
      return;
    }

    if (preferencias.maisDeUma) {
      const vagas = parseInt(quantidadeVagas, 10);

      if (!quantidadeVagas || isNaN(vagas) || vagas < 2) {
        window.alert(
          'Informe a quantidade de vagas para a carona.'
        );
        return;
      }
    }

    try {
      const resposta = await fetch(
        'http://localhost/appTcc/salvarCarona.php',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            idMotorista: idMotorista,
            nomeMotorista: nome,
            origem: origemTexto,
            destino: destinoTexto,
            data: dataCarona,
            horario: horario,
            passageiroMasculino:
              preferencias.passageiroMasculino,
            passageiroFeminino:
              preferencias.passageiroFeminino,
            comPet: preferencias.comPet,
            maisDeUmaPessoa: preferencias.maisDeUma,
            quantidadeVagas: preferencias.maisDeUma
              ? parseInt(quantidadeVagas, 10)
              : null,
            latitudeOrigem: coordOrigem
              ? coordOrigem[0]
              : null,
            longitudeOrigem: coordOrigem
              ? coordOrigem[1]
              : null,
            latitudeDestino: coordDestino
              ? coordDestino[0]
              : null,
            longitudeDestino: coordDestino
              ? coordDestino[1]
              : null,
          }),
        }
      );

      const dados = await resposta.json();

      if (dados.sucesso) {
        window.alert('Carona cadastrada com sucesso!');

        limparCarona();

        setEtapa(1);

        translateY.setValue(0);

        Animated.parallel([
          Animated.timing(alturaAnim, {
            toValue: alturas[1],
            duration: 500,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: false,
          }),

          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();
      } else {
        window.alert(dados.mensagem);
      }
    } catch (erro) {
      console.log('Erro ao cadastrar carona:', erro);

      window.alert(
        'Não foi possível cadastrar a carona.'
      );
    }
  }

  /*
   * O PanResponder agora fica somente na barrinha
   * superior do painel.
   *
   * Isso evita que o painel bloqueie o ScrollView.
   */
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gesture) => {
      return Math.abs(gesture.dy) > 5;
    },

    onPanResponderGrant: () => {
      startY.current = translateY.__getValue();
    },

    onPanResponderMove: (_, gesture) => {
      let novoValor = startY.current + gesture.dy;

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
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }).start();

        return;
      }

      if (gesture.dy < -20) {
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
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
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    },
  });

  return (
    <View style={styles.container}>

      {/* MAPA */}
      <View style={styles.mapContainer}>
        <MapContainer
          center={[-24.4979, -47.8449]}
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
              <Popup>Origem</Popup>
            </Marker>
          )}

          {coordDestino && (
            <Marker
              position={coordDestino}
              icon={icon}
            >
              <Popup>Destino</Popup>
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

      {/* MENU */}
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.openDrawer()}
      >
        <Text style={styles.menuIcon}>
          ☰
        </Text>
      </TouchableOpacity>

      {/* PAINEL */}
      <Animated.View
        style={[
          styles.bottomSheet,
          {
            height: alturaAnim,
            transform: [{ translateY }],
          },
        ]}
      >

        {/* BARRINHA PARA ARRASTAR */}
        <View
          {...panResponder.panHandlers}
        >
          <View style={styles.dragHandle} />
        </View>

        <Animated.View
          style={{
            opacity: fadeAnim,
            width: '100%',
            flex: 1,
            alignItems: 'center',
          }}
        >

          {/* ========================= */}
          {/* ETAPA 1 */}
          {/* ========================= */}

          {etapa === 1 && (
            <>
              <Text
                style={styles.title}
                numberOfLines={2}
                adjustsFontSizeToFit
              >
                Olá,{' '}
                <Text style={styles.titleNome}>
                  {nome}!
                </Text>
              </Text>

              <Text style={styles.text}>
                Quer oferecer uma carona?
              </Text>

              <Text style={styles.text2}>
                Publique sua viagem!
              </Text>

              <TouchableOpacity
                style={styles.button}
                onPress={() => mudarEtapa(2)}
              >
                <Text style={styles.buttonText}>
                  Digite aqui
                </Text>
              </TouchableOpacity>
            </>
          )}

          {/* ========================= */}
          {/* ETAPA 2 */}
          {/* ========================= */}

          {etapa === 2 && (
            <ScrollView
              style={styles.formScroll}
              contentContainerStyle={
                styles.formScrollContent
              }
              showsVerticalScrollIndicator={true}
              nestedScrollEnabled={true}
            >

              <Text style={styles.labelInput}>
                Você está em:
              </Text>

              <TextInput
                style={styles.inputField}
                placeholder="Origem"
                value={origemTexto}
                onChangeText={setOrigemTexto}
              />

              {sugestoesOrigem.length > 0 && (
                <ScrollView
                  style={styles.sugestaoLista}
                  nestedScrollEnabled
                >
                  {sugestoesOrigem.map(
                    (item, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.sugestaoItem}
                        onPress={() => {
                          const coord = [
                            parseFloat(item.lat),
                            parseFloat(item.lon),
                          ];

                          selecionouOrigem.current = true;

                          setCoordOrigem(coord);
                          setOrigemTexto(
                            item.display_name
                          );
                          setSugestoesOrigem([]);
                        }}
                      >
                        <Text
                          style={styles.sugestaoTexto}
                        >
                          {item.display_name}
                        </Text>
                      </TouchableOpacity>
                    )
                  )}
                </ScrollView>
              )}

              <Text style={styles.labelInput}>
                Você vai para:
              </Text>

              <TextInput
                style={styles.inputField}
                placeholder="Destino"
                value={destinoTexto}
                onChangeText={setDestinoTexto}
              />

              {sugestoesDestino.length > 0 && (
                <ScrollView
                  style={styles.sugestaoLista}
                  nestedScrollEnabled
                >
                  {sugestoesDestino.map(
                    (item, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.sugestaoItem}
                        onPress={() => {
                          const coord = [
                            parseFloat(item.lat),
                            parseFloat(item.lon),
                          ];

                          selecionouDestino.current = true;

                          setCoordDestino(coord);
                          setDestinoTexto(
                            item.display_name
                          );
                          setSugestoesDestino([]);
                        }}
                      >
                        <Text
                          style={styles.sugestaoTexto}
                        >
                          {item.display_name}
                        </Text>
                      </TouchableOpacity>
                    )
                  )}
                </ScrollView>
              )}

              <Text style={styles.labelInput}>
                Dia da carona:
              </Text>

              <TextInput
                style={styles.input}
                placeholder="DD/MM/AAAA"
                value={dataCarona}
                onChangeText={(texto) =>
                  setDataCarona(
                    formatarData(texto)
                  )
                }
                keyboardType="numeric"
                maxLength={10}
              />

              <Text style={styles.labelInput}>
                Horário da carona:
              </Text>

              <TextInput
                style={styles.input}
                placeholder="HH:MM"
                value={horario}
                onChangeText={(texto) =>
                  setHorario(
                    formatarHorario(texto)
                  )
                }
                keyboardType="numeric"
                maxLength={5}
              />

              <Text style={styles.labelInput}>
                Preferências:
              </Text>

              {/* MASCULINO */}
              <TouchableOpacity
                style={styles.checkboxRow}
                onPress={() =>
                  togglePreferencia(
                    'passageiroMasculino'
                  )
                }
              >
                <Text style={styles.checkboxLabel}>
                  Passageiro do sexo masculino
                </Text>

                {preferencias.passageiroMasculino
                  ? <Text style={styles.checkboxAtivo}>✓</Text>
                  : <View style={styles.checkboxInativo} />}

              </TouchableOpacity>

              {/* FEMININO */}
              <TouchableOpacity
                style={styles.checkboxRow}
                onPress={() =>
                  togglePreferencia(
                    'passageiroFeminino'
                  )
                }
              >
                <Text style={styles.checkboxLabel}>
                  Passageiro do sexo feminino
                </Text>

                {preferencias.passageiroFeminino
                  ? <Text style={styles.checkboxAtivo}>✓</Text>
                  : <View style={styles.checkboxInativo} />}

              </TouchableOpacity>

              {/* PET */}
              <TouchableOpacity
                style={styles.checkboxRow}
                onPress={() =>
                  togglePreferencia('comPet')
                }
              >
                <Text style={styles.checkboxLabel}>
                  Carona com pet
                </Text>

                {preferencias.comPet
                  ? <Text style={styles.checkboxAtivo}>✓</Text>
                  : <View style={styles.checkboxInativo} />}

              </TouchableOpacity>

              {/* MAIS DE UMA PESSOA */}
              <TouchableOpacity
                style={styles.checkboxRow}
                onPress={() =>
                  togglePreferencia('maisDeUma')
                }
              >
                <Text style={styles.checkboxLabel}>
                  Carona para mais de uma pessoa
                </Text>

                {preferencias.maisDeUma
                  ? <Text style={styles.checkboxAtivo}>✓</Text>
                  : <View style={styles.checkboxInativo} />}

              </TouchableOpacity>

              {preferencias.maisDeUma && (
                <>
                  <Text style={styles.labelInput}>
                    Quantidade de vagas:
                  </Text>

                  <TextInput
                    style={styles.input}
                    placeholder="Ex.: 3"
                    value={quantidadeVagas}
                    onChangeText={(texto) =>
                      setQuantidadeVagas(
                        texto.replace(/\D/g, '').slice(0, 2)
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
                    backgroundColor: '#468B5B',
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
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#468B5B',
                  }}
                  onPress={() => {
                    if (validarCarona()) {
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

          {/* ========================= */}
          {/* ETAPA 3 */}
          {/* ========================= */}

          {etapa === 3 && (
            <ScrollView
              style={styles.formScroll}
              contentContainerStyle={
                styles.formScrollContent
              }
              showsVerticalScrollIndicator={true}
              nestedScrollEnabled={true}
            >

              <Text style={styles.titleConfirmacao}>
                Confirmar carona
              </Text>

              <Text style={styles.labelInput}>
                Motorista responsável:
              </Text>

              <View style={styles.infoRow}>
                <Text style={styles.infoText}>
                  {nome}
                </Text>
              </View>

              <Text style={styles.labelInput}>
                Data:
              </Text>

              <View style={styles.infoRow}>
                <Text style={styles.infoText}>
                  {dataCarona}
                </Text>
              </View>

              <Text style={styles.labelInput}>
                Horário:
              </Text>

              <View style={styles.infoRow}>
                <Text style={styles.infoText}>
                  {horario}
                </Text>
              </View>

              <Text style={styles.labelInput}>
                Origem:
              </Text>

              <View style={styles.infoRow}>
                <Text style={styles.infoText}>
                  {origemTexto}
                </Text>
              </View>

              <Text style={styles.labelInput}>
                Destino:
              </Text>

              <View style={styles.infoRow}>
                <Text style={styles.infoText}>
                  {destinoTexto}
                </Text>
              </View>

              {preferencias.maisDeUma && (
                <>
                  <Text style={styles.labelInput}>
                    Quantidade de vagas:
                  </Text>

                  <View style={styles.infoRow}>
                    <Text style={styles.infoText}>
                      {quantidadeVagas}
                    </Text>
                  </View>
                </>
              )}

              <Text style={styles.labelInput}>
                Preferências selecionadas:
              </Text>

              {preferencias.passageiroMasculino && (
                <Text style={styles.infoText}>
                  • Passageiro do sexo masculino
                </Text>
              )}

              {preferencias.passageiroFeminino && (
                <Text style={styles.infoText}>
                  • Passageiro do sexo feminino
                </Text>
              )}

              {preferencias.comPet && (
                <Text style={styles.infoText}>
                  • Carona com pet
                </Text>
              )}

              {preferencias.maisDeUma && (
                <Text style={styles.infoText}>
                  • Carona para mais de uma pessoa
                </Text>
              )}

              {!preferencias.passageiroMasculino &&
                !preferencias.passageiroFeminino &&
                !preferencias.comPet &&
                !preferencias.maisDeUma && (
                  <Text style={styles.infoText}>
                    • Nenhuma preferência selecionada
                  </Text>
                )}

              {/* BOTÕES FINAIS */}
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
                    backgroundColor: '#468B5B',
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
                  onPress={confirmarCarona}
                >
                  <Text style={styles.buttonText}>
                    Confirmar carona
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