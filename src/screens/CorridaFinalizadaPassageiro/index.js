import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './style';

const API_URL = 'http://localhost/appTcc';

export default function CorridaFinalizadaPassageiro({ navigation, route }) {
  const {
    idCorrida,
    idCarona,
    idMotorista,
    idPassageiro,
  } = route.params || {};

  const [corrida, setCorrida] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [gorjetaSelecionada, setGorjetaSelecionada] = useState(null);
  const [outroValor, setOutroValor] = useState('');
  const [avaliacao, setAvaliacao] = useState(0);

  const opcoesGorjeta = ['R$2,00', 'R$5,00', 'R$10,00', 'Outro valor'];

  useEffect(() => {
    buscarCorrida();
  }, []);

  async function buscarCorrida() {
    try {
      const resposta = await fetch(
        `${API_URL}/buscarCorrida.php?idCorrida=${idCorrida}`
      );

      const texto = await resposta.text();
      console.log('Resposta buscarCorrida:', texto);

      const dados = JSON.parse(texto);

      if (dados.sucesso) {
        setCorrida(dados.corrida);
      } else {
        window.alert(dados.mensagem || 'Não foi possível carregar a corrida.');
      }
    } catch (erro) {
      console.error(erro);
      window.alert('Erro ao carregar os dados da corrida.');
    } finally {
      setCarregando(false);
    }
  }

  function formatarData(data) {
    if (!data) return '--/--/----';

    const partes = data.split('-');

    if (partes.length === 3) {
      return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }

    return data;
  }

  function formatarHorario(horario) {
    if (!horario) return '--:--';

    return horario.substring(0, 5);
  }

  function calcularDistancia() {
    if (
      !corrida?.latitudeOrigem ||
      !corrida?.longitudeOrigem ||
      !corrida?.latitudeDestino ||
      !corrida?.longitudeDestino
    ) {
      return 'Não disponível';
    }

    const lat1 = Number(corrida.latitudeOrigem);
    const lon1 = Number(corrida.longitudeOrigem);
    const lat2 = Number(corrida.latitudeDestino);
    const lon2 = Number(corrida.longitudeDestino);

    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distancia = R * c;

    return `${distancia.toFixed(1).replace('.', ',')} km`;
  }

  function calcularTempo() {
    if (!corrida?.dataInicio || !corrida?.dataFinalizacao) {
      return 'Não disponível';
    }

    const inicio = new Date(
      corrida.dataInicio.replace(' ', 'T')
    );

    const fim = new Date(
      corrida.dataFinalizacao.replace(' ', 'T')
    );

    const diferenca = fim - inicio;

    if (diferenca < 0) {
      return 'Não disponível';
    }

    const minutos = Math.floor(diferenca / 60000);
    const segundos = Math.floor((diferenca % 60000) / 1000);

    return `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')} min`;
  }

  function selecionarGorjeta(opcao) {
    setGorjetaSelecionada(
      gorjetaSelecionada === opcao ? null : opcao
    );

    if (opcao !== 'Outro valor') {
      setOutroValor('');
    }
  }

  function handleOutroValor(text) {
    const apenasNumeros = text.replace(/[^0-9]/g, '');
    const centavos = parseInt(apenasNumeros || '0');

    const reais = Math.floor(centavos / 100);
    const centavosStr = String(centavos % 100).padStart(2, '0');

    setOutroValor(`${reais},${centavosStr}`);
  }

  function confirmar() {
    if (avaliacao === 0) {
      window.alert('Selecione uma avaliação de 1 a 5 estrelas.');
      return;
    }

    window.alert(
      `Avaliação de ${avaliacao} estrela${avaliacao > 1 ? 's' : ''} registrada!`
    );

    navigation.navigate('Login');
  }

  if (carregando) {
    return (
      <View style={styles.carregando}>
        <ActivityIndicator size="large" />
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
          Não foi possível encontrar os dados da corrida.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/backgroundGoTogether.png')}
        style={styles.background}
        resizeMode="stretch"
      >
        <View style={styles.titulosContainer}>
          <Text style={styles.title}>Corrida Finalizada!</Text>
          <Text style={styles.title2}>
            Obrigado por viajar conosco
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
                    {corrida.origemCarona || 'Não informado'}
                  </Text>
                </Text>

                <Text style={styles.resumoLabel}>
                  Destino:{' '}
                  <Text style={styles.resumoValor}>
                    {corrida.destinoCarona || 'Não informado'}
                  </Text>
                </Text>
              </View>

              <View style={styles.resumoDireita}>
                <Text style={styles.resumoInfoLabel}>
                  Data:{' '}
                  <Text style={styles.resumoInfoValor}>
                    {formatarData(corrida.dataCarona)}
                  </Text>
                </Text>

                <Text style={styles.resumoInfoLabel}>
                  Horário:{' '}
                  <Text style={styles.resumoInfoValor}>
                    {formatarHorario(corrida.horarioCarona)}
                  </Text>
                </Text>

                <Text style={styles.resumoInfoLabel}>
                  Trajeto:{' '}
                  <Text style={styles.resumoInfoValor}>
                    {calcularDistancia()}
                  </Text>
                </Text>

                <Text style={styles.resumoInfoLabel}>
                  Tempo:{' '}
                  <Text style={styles.resumoInfoValor}>
                    {calcularTempo()}
                  </Text>
                </Text>
              </View>

            </View>
          </View>

          <View style={styles.containerRecompensa}>
            <Text style={styles.recompensaTitulo}>
              Recompensas
            </Text>

            <Text style={styles.recompensaSubtitulo}>
              Deseja recompensar o motorista com gorjeta?
            </Text>

            <View style={styles.gorjetasContainer}>
              {opcoesGorjeta.map((opcao) => (
                <TouchableOpacity
                  key={opcao}
                  onPress={() => selecionarGorjeta(opcao)}
                  style={[
                    styles.botaoGorjeta,
                    gorjetaSelecionada === opcao &&
                      styles.botaoGorjetaSelecionado,
                  ]}
                >
                  <Text
                    style={[
                      styles.textoGorjeta,
                      gorjetaSelecionada === opcao &&
                        styles.textoGorjetaSelecionado,
                    ]}
                  >
                    {opcao}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {gorjetaSelecionada === 'Outro valor' && (
              <TextInput
                style={styles.inputOutroValor}
                value={outroValor}
                onChangeText={handleOutroValor}
                placeholder="Digite o valor"
                keyboardType="numeric"
                maxLength={10}
              />
            )}
          </View>

          <View style={styles.containerExperiencia}>
            <Text style={styles.titleExperiencia}>
              Experiência do usuário
            </Text>

            <View style={styles.estrelasContainer}>
              {[1, 2, 3, 4, 5].map((numero) => (
                <TouchableOpacity
                  key={numero}
                  onPress={() => setAvaliacao(numero)}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={
                      numero <= avaliacao
                        ? 'star'
                        : 'star-outline'
                    }
                    size={30}
                    color="#F5B700"
                    style={styles.estrela}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.textoAvaliacao}>
              {avaliacao === 0
                ? 'Nenhuma avaliação selecionada'
                : `${avaliacao} estrela${avaliacao > 1 ? 's' : ''}`}
            </Text>
          </View>

          <TouchableOpacity
            onPress={confirmar}
            style={styles.buttonConfirmar}
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