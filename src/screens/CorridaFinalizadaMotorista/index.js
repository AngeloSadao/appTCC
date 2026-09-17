import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import styles from './style';

const API_URL = 'http://localhost/appTcc';

export default function CorridaFinalizadaMotorista({ route }) {
  const navigation = useNavigation();

  const {
    idCorrida,
    idCarona,
    idMotorista,
    idPassageiro,
  } = route.params || {};

  const [corrida, setCorrida] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    buscarCorrida();
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
        'Corrida finalizada motorista:',
        texto
      );

      const dados = JSON.parse(texto);

      if (dados.sucesso && dados.corrida) {
        setCorrida(dados.corrida);
      } else {
        window.alert(
          dados.mensagem ||
          'Não foi possível carregar os dados da corrida.'
        );
      }

    } catch (erro) {
      console.log(
        'Erro ao buscar corrida finalizada:',
        erro
      );

      window.alert(
        'Não foi possível carregar os dados da corrida.'
      );

    } finally {
      setCarregando(false);
    }
  }

  function voltarHome() {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'HomeMotorista',
          params: {
            idMotorista,
            tipoUsuario: 'motorista',
            nome: corrida.nomeMotorista,
          },
        },
      ],
    });
  }

  function obterDistanciaKm() {
    if (
      corrida.latitudeOrigem === null ||
      corrida.latitudeOrigem === undefined ||
      corrida.longitudeOrigem === null ||
      corrida.longitudeOrigem === undefined ||
      corrida.latitudeDestino === null ||
      corrida.latitudeDestino === undefined ||
      corrida.longitudeDestino === null ||
      corrida.longitudeDestino === undefined
    ) {
      return null;
    }

    const lat1 = Number(corrida.latitudeOrigem);
    const lon1 = Number(corrida.longitudeOrigem);
    const lat2 = Number(corrida.latitudeDestino);
    const lon2 = Number(corrida.longitudeDestino);

    if (
      !Number.isFinite(lat1) ||
      !Number.isFinite(lon1) ||
      !Number.isFinite(lat2) ||
      !Number.isFinite(lon2)
    ) {
      return null;
    }

    const R = 6371;

    const dLat =
      (lat2 - lat1) * Math.PI / 180;

    const dLon =
      (lon2 - lon1) * Math.PI / 180;

    const a =
      Math.sin(dLat / 2) *
      Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

    const c =
      2 *
      Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1 - a)
      );

    return R * c;
  }

  function calcularDistanciaKm() {
    const distancia = obterDistanciaKm();

    if (distancia === null) {
      return 'Não disponível';
    }

    return `${distancia.toFixed(1).replace('.', ',')} km`;
  }

  function calcularPontos() {
    const distancia = obterDistanciaKm();

    if (distancia === null) {
      return 0;
    }

    return Math.round(distancia * 10);
  }

  function calcularTempo() {
    if (
      !corrida.dataInicio ||
      !corrida.dataFinalizacao
    ) {
      return 'Não disponível';
    }

    const inicio = new Date(
      corrida.dataInicio.replace(' ', 'T')
    );

    const fim = new Date(
      corrida.dataFinalizacao.replace(' ', 'T')
    );

    const diferenca =
      Math.floor(
        (fim - inicio) / 1000
      );

    if (diferenca < 0) {
      return 'Não disponível';
    }

    const minutos =
      Math.floor(diferenca / 60);

    const segundos =
      diferenca % 60;

    if (minutos >= 60) {
      const horas =
        Math.floor(minutos / 60);

      const minutosRestantes =
        minutos % 60;

      return `${horas}h ${String(
        minutosRestantes
      ).padStart(2, '0')}min`;
    }

    return `${minutos}:${String(
      segundos
    ).padStart(2, '0')} min`;
  }

  if (carregando) {
    return (
      <View style={styles.carregando}>
        <ActivityIndicator
          size="large"
          color="#468B5B"
        />

        <Text style={styles.textoCarregando}>
          Carregando dados da corrida...
        </Text>
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

  const data = corrida.dataCarona
    ? corrida.dataCarona
      .split('-')
      .reverse()
      .join('/')
    : '--/--/----';

  const horario = corrida.horarioCarona
    ? corrida.horarioCarona.substring(0, 5)
    : '--:--';

  const valorGorjeta =
    Number(corrida.valorGorjeta || 0);

  const valorFormatado =
    valorGorjeta.toLocaleString(
      'pt-BR',
      {
        style: 'currency',
        currency: 'BRL',
      }
    );

  const avaliacao =
    Number(
      corrida.avaliacaoPassageiro || 0
    );

  const distancia =
    calcularDistanciaKm();

  const tempo =
    calcularTempo();

  const pontos =
    calcularPontos();

  return (
    <View style={styles.container}>

      <ImageBackground
        source={require('../../../assets/backgroundGoTogether.png')}
        style={styles.background}
        resizeMode="stretch"
      >

        <View style={styles.titulosContainer}>

          <Text style={styles.title}>
            Corrida Finalizada!
          </Text>

          <Text style={styles.title2}>
            Obrigado por dirigir conosco
          </Text>

        </View>

        <View style={styles.cardsContainer}>

          <View style={styles.containerResumo}>

            <Text style={styles.resumoCardLabel}>
              Resumo da carona
            </Text>

            <View style={styles.resumoBody}>

              <View style={styles.resumoEsquerda}>

                <Text style={styles.resumoLabel}>
                  Origem:{' '}
                  <Text style={styles.resumoValor}>
                    {corrida.origemCarona}
                  </Text>
                </Text>

                <Text style={styles.resumoLabel}>
                  Destino:{' '}
                  <Text style={styles.resumoValor}>
                    {corrida.destinoCarona}
                  </Text>
                </Text>

              </View>

              <View style={styles.resumoDireita}>

                <Text style={styles.resumoInfoLabel}>
                  Data:{' '}
                  <Text style={styles.resumoInfoValor}>
                    {data}
                  </Text>
                </Text>

                <Text style={styles.resumoInfoLabel}>
                  Horário:{' '}
                  <Text style={styles.resumoInfoValor}>
                    {horario}
                  </Text>
                </Text>

                <Text style={styles.resumoInfoLabel}>
                  Trajeto:{' '}
                  <Text style={styles.resumoInfoValor}>
                    {distancia}
                  </Text>
                </Text>

                <Text style={styles.resumoInfoLabel}>
                  Tempo:{' '}
                  <Text style={styles.resumoInfoValor}>
                    {tempo}
                  </Text>
                </Text>

              </View>

            </View>

          </View>

          <View style={styles.containerRecompensa}>

            <Text style={styles.titleRecompensas}>
              Recompensas
            </Text>

            <Text style={styles.subtitleRecompensas}>
              Pontos e gorjetas recebidas
            </Text>

            <View style={styles.recompensasBody}>

              <View style={styles.recompensaItem}>

                <Ionicons
                  name="star-outline"
                  size={34}
                  color="#468B5B"
                />

                <View>

                  <Text style={styles.recompensaTitulo}>
                    Pontos recebidos
                  </Text>

                  <Text style={styles.pontos}>
                    {pontos}
                  </Text>

                  <Text style={styles.recompensaPequeno}>
                    Troque por cupons
                  </Text>

                </View>

              </View>

              <View style={styles.recompensaItem}>

                <Ionicons
                  name="cash-outline"
                  size={34}
                  color="#468B5B"
                />

                <View>

                  <Text style={styles.recompensaTitulo}>
                    Gorjetas recebidas
                  </Text>

                  <Text style={styles.pontos}>
                    {valorFormatado}
                  </Text>

                  <Text style={styles.recompensaPequeno}>
                    Disponível para saque
                  </Text>

                </View>

              </View>

            </View>

          </View>

          <View style={styles.containerExperiencia}>

            <View>

              <Text style={styles.titleExperiencia}>
                Experiência do usuário
              </Text>

              <Text style={styles.subtitleExperiencia}>
                Avaliação: {avaliacao} estrelas
              </Text>

            </View>

            <View style={styles.estrelasContainer}>

              {[1, 2, 3, 4, 5].map(
                (estrela) => (
                  <Ionicons
                    key={estrela}
                    name={
                      estrela <= avaliacao
                        ? 'star'
                        : 'star-outline'
                    }
                    size={18}
                    color={
                      estrela <= avaliacao
                        ? '#468B5B'
                        : '#9DB2D4'
                    }
                    style={styles.estrela}
                  />
                )
              )}

            </View>

          </View>

          <TouchableOpacity
            style={styles.buttonConfirmar}
            onPress={voltarHome}
          >

            <Text style={styles.buttonText}>
              Confirmar
            </Text>

          </TouchableOpacity>

        </View>

      </ImageBackground>

    </View>
  );
}