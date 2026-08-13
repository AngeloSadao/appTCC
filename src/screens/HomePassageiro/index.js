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

// ÍCONE
const icon = new L.Icon({
  iconUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',

  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',

  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// ÍCONE DO MOTORISTA (CARRINHO)
const carIcon = new L.divIcon({
  html: '<div style="font-size: 30px; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;">🚗</div>',
  className: 'car-icon-wrapper',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

// COMPONENTE QUE ATUALIZA A VISTA DO MAPA
function AtualizarMapa({ origem, destino }) {
  const map = useMap();

  useEffect(() => {
    if (origem && destino) {
      map.flyToBounds([origem, destino], {
        padding: [50, 50],
        duration: 1.2, // duração da animação em segundos
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

  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [coordMotorista, setCoordMotorista] = useState(null); // posição simulada

  const [preferencias, setPreferencias] = useState({
    motoristaMasculino: false,
    motoristaFeminino: false,
    comPet: false,
    maisDeUma: false,
  });

  function togglePreferencia(chave) {
    setPreferencias(prev => ({
      ...prev,
      [chave]: !prev[chave],
    }));
  }

  const [etapa, setEtapa] = useState(1);

  const navigation = useNavigation();

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
    2: 450,
    3: 550,
    4: 700,
    5: 220,
  };

  const alturaVisivel = 50;

  const fechadoY = alturas[etapa] - alturaVisivel;

  const startY = useRef(0);

  // AUTOCOMPLETE E ROTA
  const [origemTexto, setOrigemTexto] = useState('');
  const [destinoTexto, setDestinoTexto] = useState('');
  const [sugestoesOrigem, setSugestoesOrigem] = useState([]);
  const [sugestoesDestino, setSugestoesDestino] = useState([]);
  const [coordOrigem, setCoordOrigem] = useState(null);
  const [coordDestino, setCoordDestino] = useState(null);
  const selecionouOrigem = useRef(false);
  const selecionouDestino = useRef(false);
  const [rota, setRota] = useState([]);

  async function buscarSugestoes(texto, tipo) {
    if (texto.length < 3) {
      if (tipo === 'origem') setSugestoesOrigem([]);
      else setSugestoesDestino([]);
      return;
    }

    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${texto}&countrycodes=br`;
      const resposta = await fetch(url, {
        headers: { 'Accept-Language': 'pt-BR' },
      });
      const dados = await resposta.json();

      if (tipo === 'origem') setSugestoesOrigem(dados);
      else setSugestoesDestino(dados);
    } catch (erro) {
      console.log('Erro:', erro);
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
      cOrigem[1] + ',' + cOrigem[0] + ';' +
      cDestino[1] + ',' + cDestino[0] +
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

  useEffect(() => {
    if (rota.length === 0) {
      setCoordMotorista(null);
      return;
    }

    let indice = 0;

    const intervalo = setInterval(() => {
      if (indice >= rota.length) {
        clearInterval(intervalo);
        return;
      }

      setCoordMotorista(rota[indice]);
      indice++;
    }, 180); // velocidade: menor = mais rápido

    return () => clearInterval(intervalo);
  }, [rota]);

  function mudarEtapa(novaEtapa) {
    const novaAltura = alturas[novaEtapa];

    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 600,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {

      setEtapa(novaEtapa);

      translateY.setValue(0);

      Animated.parallel([
        Animated.timing(alturaAnim, {
          toValue: novaAltura,
          duration: 800,
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

  const panResponder = PanResponder.create({

    onMoveShouldSetPanResponder: (_, gesture) => {
      return Math.abs(gesture.dy) > 5;
    },

    onPanResponderGrant: () => {
      startY.current = translateY.__getValue();
    },

    onPanResponderMove: (_, gesture) => {
      let novoValor = startY.current + gesture.dy;

      // Nunca deixa passar do topo
      if (novoValor < 0) {
        novoValor = 0;
      }

      // Nunca deixa passar do ponto fechado
      if (novoValor > fechadoY) {
        novoValor = fechadoY;
      }

      translateY.setValue(novoValor);
    },

    onPanResponderRelease: (_, gesture) => {

      // Se arrastou para baixo
      if (gesture.dy > 20) {

        Animated.timing(translateY, {
          toValue: fechadoY,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }).start();

        return;
      }

      // Se arrastou para cima
      if (gesture.dy < -20) {

        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }).start();

        return;
      }

      // Se praticamente não mexeu,
      // decide pelo ponto onde o painel ficou
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
          style={{ width: '100%', height: '100%' }}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />

          {coordOrigem && (
            <Marker position={coordOrigem} icon={icon}>
              <Popup>Origem</Popup>
            </Marker>
          )}

          {coordDestino && (
            <Marker position={coordDestino} icon={icon}>
              <Popup>Destino</Popup>
            </Marker>
          )}

          {coordMotorista && (
            <Marker position={coordMotorista} icon={carIcon}>
              <Popup>Motorista</Popup>
            </Marker>
          )}

          {rota.length > 0 && (
            <Polyline positions={rota} color="blue" weight={5} />
          )}

          <AtualizarMapa origem={coordOrigem} destino={coordDestino} />

        </MapContainer>
      </View>

      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.openDrawer()}
      >
        <Text style={styles.menuIcon}>☰</Text>
      </TouchableOpacity>

      {/* PAINEL INFERIOR */}
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.bottomSheet,
          {
            height: alturaAnim,
            transform: [{ translateY: translateY }],
          },
        ]}
      >

        <View style={styles.dragHandle} />

        <Animated.View style={{ opacity: fadeAnim, width: '100%', alignItems: 'center' }}>

          {etapa === 1 && (
            <>
              <Text style={styles.title} numberOfLines={2} adjustsFontSizeToFit>
                Olá, <Text style={styles.titleNome}>{nome}!</Text>
              </Text>

              <Text style={styles.text}>
                Precisa de uma carona?
              </Text>

              <Text style={styles.text2}>
                Para onde vai?
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

          {etapa === 2 && (
            <>
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
                <ScrollView style={styles.sugestaoLista} nestedScrollEnabled>
                  {sugestoesOrigem.map((item, index) => (
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
                        setOrigem(item.display_name);
                        setOrigemTexto(item.display_name);
                        setSugestoesOrigem([]);
                      }}
                    >
                      <Text style={styles.sugestaoTexto}>
                        {item.display_name}
                      </Text>
                    </TouchableOpacity>
                  ))}
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
                <ScrollView style={styles.sugestaoLista} nestedScrollEnabled>
                  {sugestoesDestino.map((item, index) => (
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
                        setDestino(item.display_name);
                        setDestinoTexto(item.display_name);
                        setSugestoesDestino([]);
                      }}
                    >
                      <Text style={styles.sugestaoTexto}>
                        {item.display_name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}

              <Text style={styles.labelInput}>
                Preferências:
              </Text>

              <TouchableOpacity
                style={styles.checkboxRow}
                onPress={() => togglePreferencia('motoristaMasculino')}
              >
                <Text style={styles.checkboxLabel}>
                  Motorista do sexo masculino
                </Text>
                <View style={preferencias.motoristaMasculino ? styles.checkboxAtivo : styles.checkboxInativo} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.checkboxRow}
                onPress={() => togglePreferencia('motoristaFeminino')}
              >
                <Text style={styles.checkboxLabel}>
                  Motorista do sexo feminino
                </Text>
                <View style={preferencias.motoristaFeminino ? styles.checkboxAtivo : styles.checkboxInativo} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.checkboxRow}
                onPress={() => togglePreferencia('comPet')}
              >
                <Text style={styles.checkboxLabel}>
                  Carona com pet
                </Text>
                <View style={preferencias.comPet ? styles.checkboxAtivo : styles.checkboxInativo} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.checkboxRow}
                onPress={() => togglePreferencia('maisDeUma')}
              >
                <Text style={styles.checkboxLabel}>
                  Carona para mais de uma pessoa
                </Text>
                <View style={preferencias.maisDeUma ? styles.checkboxAtivo : styles.checkboxInativo} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => mudarEtapa(3)}
              >
                <Text style={styles.buttonText}>→</Text>
              </TouchableOpacity>
            </>
          )}

          {etapa === 3 && (
            <>
              <Text style={styles.labelInput}>
                Motorista está em:
              </Text>

              <View style={styles.infoRow}>
                <Text style={styles.infoText}>
                  Prefeitura Municipal de Registro
                </Text>
              </View>

              <Text style={styles.labelInput}>
                Você está em:
              </Text>

              <View style={styles.infoRow}>
                <Text style={styles.infoText}>
                  {origemTexto}
                </Text>
              </View>

              <Text style={styles.labelInput}>
                Destino em comum:
              </Text>

              <View style={styles.infoRow}>
                <Text style={styles.infoText}>
                  {destinoTexto}
                </Text>
              </View>

              {(preferencias.motoristaMasculino || preferencias.motoristaFeminino || preferencias.comPet || preferencias.maisDeUma) && (
                <>
                  <Text style={styles.labelInput}>
                    Preferências selecionadas:
                  </Text>

                  {preferencias.motoristaMasculino && (
                    <Text style={styles.infoText}>• Motorista do sexo masculino</Text>
                  )}

                  {preferencias.motoristaFeminino && (
                    <Text style={styles.infoText}>• Motorista do sexo feminino</Text>
                  )}

                  {preferencias.comPet && (
                    <Text style={styles.infoText}>• Carona com pet</Text>
                  )}

                  {preferencias.maisDeUma && (
                    <Text style={styles.infoText}>• Carona para mais de uma pessoa</Text>
                  )}
                </>
              )}

              <TouchableOpacity
                style={styles.button}
                onPress={() => mudarEtapa(4)}
              >
                <Text style={styles.buttonText}>
                  Confirmar Carona
                </Text>

                <Text style={styles.buttonSubText}>
                  Ir para o Chat
                </Text>
              </TouchableOpacity>
            </>
          )}

          {etapa === 4 && (
            <>

              {/* CABEÇALHO DO CHAT */}

              <Text style={styles.chatMotorista}>
                Motorista: <Text style={styles.chatNomeVerde}>Giovanna</Text>
              </Text>

              <Text style={styles.chatPassageiro}>
                Passageiro: <Text style={styles.chatNomeAzul}>Thissiany</Text>
              </Text>


              {/* MENSAGENS */}

              <View style={styles.chatContainer}>

                {/* MENSAGEM DO PASSAGEIRO */}

                <View style={styles.mensagemEsquerda}>

                  <View style={styles.fotoUsuario}>
                    <Text style={styles.fotoTexto}>
                      👩🏻
                    </Text>
                  </View>

                  <View style={styles.balaoVerde}>
                    <Text style={styles.textoMensagem}>
                      Oii, me chamo Thissiany
                    </Text>
                  </View>

                </View>


                {/* MENSAGEM DO MOTORISTA */}

                <View style={styles.mensagemDireita}>

                  <View style={styles.balaoAzul}>
                    <Text style={styles.textoMensagem}>
                      Olá! Sou a Giovanna
                    </Text>
                  </View>

                  <View style={styles.fotoUsuario}>
                    <Text style={styles.fotoTexto}>
                      👩🏻
                    </Text>
                  </View>

                </View>


                {/* MENSAGEM DO PASSAGEIRO */}

                <View style={styles.mensagemEsquerda}>

                  <View style={styles.fotoUsuario}>
                    <Text style={styles.fotoTexto}>
                      👩🏻
                    </Text>
                  </View>

                  <View style={styles.balaoVerde}>
                    <Text style={styles.textoMensagem}>
                      Estamos perto uma da outra
                    </Text>
                  </View>

                </View>


                {/* MENSAGEM DO MOTORISTA */}

                <View style={styles.mensagemDireita}>

                  <View style={styles.balaoAzul}>
                    <Text style={styles.textoMensagem}>
                      E vamos para o mesmo lugar
                    </Text>
                  </View>

                  <View style={styles.fotoUsuario}>
                    <Text style={styles.fotoTexto}>
                      👩🏻
                    </Text>
                  </View>

                </View>


                {/* MENSAGEM DO PASSAGEIRO */}

                <View style={styles.mensagemEsquerda}>

                  <View style={styles.fotoUsuario}>
                    <Text style={styles.fotoTexto}>
                      👩🏻
                    </Text>
                  </View>

                  <View style={styles.balaoVerde}>
                    <Text style={styles.textoMensagem}>
                      Quer uma carona?
                    </Text>
                  </View>

                </View>


                {/* MENSAGEM DO MOTORISTA */}

                <View style={styles.mensagemDireita}>

                  <View style={styles.balaoAzul}>
                    <Text style={styles.textoMensagem}>
                      Tá na Fatec, né? Te busco aí!
                    </Text>
                  </View>

                  <View style={styles.fotoUsuario}>
                    <Text style={styles.fotoTexto}>
                      👩🏻
                    </Text>
                  </View>

                </View>


                {/* MENSAGEM DO PASSAGEIRO */}

                <View style={styles.mensagemEsquerda}>

                  <View style={styles.fotoUsuario}>
                    <Text style={styles.fotoTexto}>
                      👩🏻
                    </Text>
                  </View>

                  <View style={styles.balaoVerde}>
                    <Text style={styles.textoMensagem}>
                      Okay, te espero aqui!
                    </Text>
                  </View>

                </View>

              </View>


              {/* BOTÃO PARA AVANÇAR */}

              <TouchableOpacity
                style={styles.chatNextButton}
                onPress={() => mudarEtapa(5)}
              >
                <Text style={styles.chatNextText}>
                  →
                </Text>
              </TouchableOpacity>

            </>
          )}

          {etapa === 5 && (
            <>
              <Text style={styles.title}>
                Você chegou
              </Text>

              <Text style={styles.titleNome}>
                ao seu destino!
              </Text>

              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  // aqui você navega pra tela de avaliação/gorjeta,
                  // que parece ser a próxima tela do seu fluxo (a de "Corrida Finalizada")
                  navigation.navigate('CorridaFinalizada');
                }}
              >
                <Text style={styles.buttonText}>
                  Finalizar corrida
                </Text>
              </TouchableOpacity>
            </>
          )}

        </Animated.View>
      </Animated.View>

    </View>
  );
}