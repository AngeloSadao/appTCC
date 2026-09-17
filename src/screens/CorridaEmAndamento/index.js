import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from 'react-leaflet';

import L from 'leaflet';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import 'leaflet/dist/leaflet.css';
import styles from './style';

const API_URL = 'http://localhost/appTcc';

const icon = new L.Icon({
  iconUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function CorridaEmAndamento({ route }) {
  const navigation = useNavigation();

  const {
    idCorrida,
    idCarona,
    idMotorista,
    idPassageiro,
    tipoUsuario,
    nomeOutroUsuario,
  } = route.params || {};

  const [corrida, setCorrida] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [finalizando, setFinalizando] = useState(false);

  const navegandoParaFinalizada = useRef(false);

  useEffect(() => {
    buscarCorrida();

    const intervalo = setInterval(() => {
      buscarCorrida();
    }, 3000);

    return () => clearInterval(intervalo);
  }, [idCorrida]);

  async function buscarCorrida() {
    if (!idCorrida) {
      setCarregando(false);
      return;
    }

    try {
      const resposta = await fetch(
        `${API_URL}/buscarCorrida.php?idCorrida=${idCorrida}`
      );

      const texto = await resposta.text();

      console.log(
        'Resposta buscar corrida:',
        texto
      );

      const dados = JSON.parse(texto);

      if (!dados.sucesso || !dados.corrida) {
        setCarregando(false);
        return;
      }

      const corridaAtual = dados.corrida;

      console.log(
        'Status da corrida:',
        corridaAtual.status
      );

      console.log(
        'Gorjeta confirmada:',
        corridaAtual.gorjetaConfirmada
      );

      if (
        corridaAtual.status === 'finalizada' &&
        tipoUsuario === 'passageiro'
      ) {
        if (!navegandoParaFinalizada.current) {
          navegandoParaFinalizada.current = true;

          navigation.replace(
            'CorridaFinalizadaPassageiro',
            {
              idCorrida,
              idCarona,
              idMotorista,
              idPassageiro,
              tipoUsuario: 'passageiro',
              nomePassageiro:
                corridaAtual.nomeCompletoPassageiro,
            }
          );
        }

        return;
      }

      if (
        corridaAtual.status === 'finalizada' &&
        tipoUsuario === 'motorista' &&
        Number(corridaAtual.gorjetaConfirmada) === 1
      ) {
        if (!navegandoParaFinalizada.current) {
          navegandoParaFinalizada.current = true;

          navigation.replace(
            'CorridaFinalizadaMotorista',
            {
              idCorrida,
              idCarona,
              idMotorista,
              idPassageiro,
              tipoUsuario: 'motorista',
            }
          );
        }

        return;
      }

      setCorrida(corridaAtual);

    } catch (erro) {

      console.log(
        'Erro ao buscar corrida:',
        erro
      );

    } finally {
      setCarregando(false);
    }
  }

  async function finalizarCorrida() {
    if (
      !idCorrida ||
      !idMotorista ||
      finalizando
    ) {
      return;
    }

    const confirmar =
      window.confirm(
        'Deseja realmente finalizar a corrida?'
      );

    if (!confirmar) {
      return;
    }

    setFinalizando(true);

    try {
      const resposta = await fetch(
        `${API_URL}/finalizarCorrida.php`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idCorrida,
            idMotorista,
          }),
        }
      );

      const texto = await resposta.text();

      console.log(
        'Resposta finalizar corrida:',
        texto
      );

      const dados = JSON.parse(texto);

      if (!dados.sucesso) {
        window.alert(
          dados.mensagem ||
          'Não foi possível finalizar a corrida.'
        );

        return;
      }

      window.alert(
        'Corrida finalizada! Aguardando a confirmação do passageiro.'
      );

    } catch (erro) {

      console.log(
        'Erro ao finalizar corrida:',
        erro
      );

      window.alert(
        'Não foi possível finalizar a corrida.'
      );

    } finally {
      setFinalizando(false);
    }
  }

  if (carregando) {
    return (
      <View style={styles.carregando}>
        <ActivityIndicator
          size="large"
          color="#468B5B"
        />
      </View>
    );
  }

  if (!corrida) {
    return (
      <View style={styles.carregando}>
        <Text style={styles.erro}>
          Corrida não encontrada.
        </Text>
      </View>
    );
  }

  const latitudeOrigem =
    Number(corrida.latitudeOrigem);

  const longitudeOrigem =
    Number(corrida.longitudeOrigem);

  const latitudeDestino =
    Number(corrida.latitudeDestino);

  const longitudeDestino =
    Number(corrida.longitudeDestino);

  const origemValida =
    Number.isFinite(latitudeOrigem) &&
    Number.isFinite(longitudeOrigem);

  const destinoValido =
    Number.isFinite(latitudeDestino) &&
    Number.isFinite(longitudeDestino);

  const pontosRota = [];

  if (origemValida) {
    pontosRota.push([
      latitudeOrigem,
      longitudeOrigem,
    ]);
  }

  if (destinoValido) {
    pontosRota.push([
      latitudeDestino,
      longitudeDestino,
    ]);
  }

  const centroMapa =
    origemValida
      ? [
        latitudeOrigem,
        longitudeOrigem,
      ]
      : [-24.4979, -47.8449];

  return (
    <View style={styles.container}>

      <View style={styles.mapa}>

        <MapContainer
          center={centroMapa}
          zoom={14}
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

          {origemValida && (
            <Marker
              position={[
                latitudeOrigem,
                longitudeOrigem,
              ]}
              icon={icon}
            >
              <Popup>
                <strong>Origem</strong>
                <br />
                {corrida.origemCarona}
              </Popup>
            </Marker>
          )}

          {destinoValido && (
            <Marker
              position={[
                latitudeDestino,
                longitudeDestino,
              ]}
              icon={icon}
            >
              <Popup>
                <strong>Destino</strong>
                <br />
                {corrida.destinoCarona}
              </Popup>
            </Marker>
          )}

          {pontosRota.length === 2 && (
            <Polyline
              positions={pontosRota}
              color="#468B5B"
              weight={5}
            />
          )}

        </MapContainer>

        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() =>
            navigation.goBack()
          }
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color="#468B5B"
          />
        </TouchableOpacity>

      </View>

      <View style={styles.painel}>

        <Text style={styles.titulo}>
          Corrida em andamento
        </Text>

        <View style={styles.linha} />

        <View style={styles.informacao}>

          <Ionicons
            name="person-outline"
            size={21}
            color="#468B5B"
          />

          <View style={styles.textos}>

            <Text style={styles.label}>
              {tipoUsuario === 'motorista'
                ? 'Passageiro'
                : 'Motorista'}
            </Text>

            <Text style={styles.valor}>
              {tipoUsuario === 'motorista'
                ? corrida.nomeCompletoPassageiro
                : corrida.nomeMotorista}
            </Text>

          </View>

        </View>

        <View style={styles.informacao}>

          <Ionicons
            name="location-outline"
            size={21}
            color="#468B5B"
          />

          <View style={styles.textos}>

            <Text style={styles.label}>
              Origem
            </Text>

            <Text
              style={styles.valor}
              numberOfLines={2}
            >
              {corrida.origemCarona}
            </Text>

          </View>

        </View>

        <View style={styles.informacao}>

          <Ionicons
            name="flag-outline"
            size={21}
            color="#468B5B"
          />

          <View style={styles.textos}>

            <Text style={styles.label}>
              Destino
            </Text>

            <Text
              style={styles.valor}
              numberOfLines={2}
            >
              {corrida.destinoCarona}
            </Text>

          </View>

        </View>

        <View style={styles.statusContainer}>

          <View
            style={styles.statusBolinha}
          />

          <Text style={styles.statusTexto}>
            Corrida em andamento
          </Text>

        </View>

        {tipoUsuario === 'motorista' && (

          <TouchableOpacity
            style={
              styles.botaoFinalizar
            }
            onPress={
              finalizarCorrida
            }
            disabled={finalizando}
          >

            {finalizando ? (

              <ActivityIndicator
                size="small"
                color="#fff"
              />

            ) : (

              <>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={21}
                  color="#fff"
                />

                <Text
                  style={
                    styles.textoBotaoFinalizar
                  }
                >
                  Finalizar corrida
                </Text>
              </>

            )}

          </TouchableOpacity>

        )}

      </View>

    </View>
  );
}