import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';

import {
  useFocusEffect,
  useNavigation,
  DrawerActions
} from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';

import styles from './style';

const API_URL = 'http://localhost/appTcc';

export default function HistoricoMotorista({ route }) {
  const navigation = useNavigation();

  const idMotorista = route.params?.idMotorista;

  const [historico, setHistorico] = useState([]);
  const [carregando, setCarregando] = useState(true);

  async function buscarHistorico() {
    if (!idMotorista) {
      setCarregando(false);
      return;
    }

    try {
      setCarregando(true);

      const resposta = await fetch(
        `${API_URL}/buscarHistorico.php?idMotorista=${idMotorista}`
      );

      const texto = await resposta.text();

      console.log('Histórico motorista:', texto);

      let dados;

      try {
        dados = JSON.parse(texto);
      } catch (erro) {
        console.log('Resposta inválida:', texto);
        window.alert('O servidor retornou uma resposta inválida.');
        return;
      }

      if (dados.sucesso) {
        setHistorico(dados.historico || []);
      } else {
        window.alert(
          dados.mensagem || 'Não foi possível buscar o histórico.'
        );
      }

    } catch (erro) {
      console.log('Erro ao buscar histórico:', erro);
      window.alert('Não foi possível carregar o histórico.');
    } finally {
      setCarregando(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      buscarHistorico();
    }, [idMotorista])
  );

  function formatarData(data) {
    if (!data) return '';

    const partes = String(data).split('-');

    if (partes.length !== 3) {
      return data;
    }

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  }

  function formatarHorario(horario) {
    if (!horario) return '';

    return String(horario).slice(0, 5);
  }

  function formatarDuracao(segundos) {
    const valor = Number(segundos);

    if (isNaN(valor) || valor <= 0) {
      return '0 s';
    }

    if (valor < 60) {
      return `${valor} s`;
    }

    const horas = Math.floor(valor / 3600);
    const minutos = Math.floor((valor % 3600) / 60);
    const segundosRestantes = valor % 60;

    if (horas > 0) {
      if (minutos > 0) {
        return `${horas}h ${minutos}min`;
      }

      return `${horas}h`;
    }

    if (segundosRestantes > 0) {
      return `${minutos}min ${segundosRestantes}s`;
    }

    return `${minutos} min`;
  }

  function formatarDistancia(distancia) {
    const valor = Number(distancia);

    if (isNaN(valor)) {
      return '0 km';
    }

    return `${valor.toFixed(2).replace('.', ',')} km`;
  }

  function formatarDinheiro(valor) {
    const numero = Number(valor);

    if (isNaN(numero)) {
      return 'R$ 0,00';
    }

    return `R$ ${numero.toFixed(2).replace('.', ',')}`;
  }

  function renderEstrelas(avaliacao) {
    const nota = Number(avaliacao) || 0;

    return (
      <View style={styles.avaliacaoContainer}>
        {[1, 2, 3, 4, 5].map(numero => (
          <Ionicons
            key={numero}
            name={numero <= nota ? 'star' : 'star-outline'}
            size={13}
            color={numero <= nota ? '#468B5B' : '#9DB2D4'}
            style={styles.estrela}
          />
        ))}
      </View>
    );
  }

  function renderItem({ item }) {
    return (
      <View style={styles.card}>

        <View style={styles.linhaData}>
          <Text style={styles.data}>
            {formatarData(item.dataCarona)} • {formatarHorario(item.horarioCarona)}
          </Text>

          <Text style={styles.statusTexto}>
            Finalizada
          </Text>
        </View>

        <View style={styles.linhaLocal}>
          <View style={styles.iconeLocal}>
            <Ionicons
              name="location"
              size={15}
              color="#468B5B"
            />
          </View>

          <View style={styles.textoLocalContainer}>
            <Text style={styles.labelLocal}>
              Origem:
            </Text>

            <Text style={styles.textoLocal}>
              {item.origemCarona}
            </Text>
          </View>
        </View>

        <View style={styles.linhaLocal}>
          <View style={styles.iconeLocal}>
            <Ionicons
              name="flag"
              size={15}
              color="#468B5B"
            />
          </View>

          <View style={styles.textoLocalContainer}>
            <Text style={styles.labelLocal}>
              Destino:
            </Text>

            <Text style={styles.textoLocal}>
              {item.destinoCarona}
            </Text>
          </View>
        </View>

        <View style={styles.linha} />

        <View style={styles.informacoes}>

          <View style={styles.informacao}>
            <Text style={styles.informacaoLabel}>
              Trajeto:
            </Text>

            <Text style={styles.informacaoValor}>
              {formatarDistancia(item.distanciaKm)}
            </Text>
          </View>

          <View style={styles.informacao}>
            <Text style={styles.informacaoLabel}>
              Tempo:
            </Text>

            <Text style={styles.informacaoValor}>
              {formatarDuracao(item.duracaoSegundos)}
            </Text>
          </View>

          <View style={styles.informacao}>
            <Text style={styles.informacaoLabel}>
              Passageiro:
            </Text>

            <Text style={styles.informacaoValor}>
              {item.nomeCompletoPassageiro}
            </Text>
          </View>

          <View style={styles.informacao}>
            <Text style={styles.informacaoLabel}>
              Corrida:
            </Text>

            <Text style={styles.informacaoValor}>
              #{item.idCorrida}
            </Text>
          </View>

        </View>

        <Text style={styles.avaliacaoTexto}>
          Avaliação recebida:
        </Text>

        {renderEstrelas(item.avaliacaoPassageiro)}

        <View style={styles.gorjetaContainer}>
          <Text style={styles.gorjetaLabel}>
            Gorjeta recebida:
          </Text>

          <Text style={styles.gorjetaValor}>
            {formatarDinheiro(item.valorGorjeta)}
          </Text>
        </View>

      </View>
    );
  }

  if (carregando) {
    return (
      <View style={styles.carregando}>
        <ActivityIndicator
          size="large"
          color="#468B5B"
        />

        <Text style={styles.carregandoTexto}>
          Carregando histórico...
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

          <Text style={styles.title}>
            Histórico
          </Text>

          <Text style={styles.title2}>
            de caronas
          </Text>

        </View>

        <View style={styles.menuContainer}>

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
          
        </View>

        <View style={styles.cardsContainer}>

          {historico.length === 0 ? (

            <View style={styles.vazio}>

              <Ionicons
                name="car-outline"
                size={45}
                color="#AAAAAA"
              />

              <Text style={styles.vazioTitulo}>
                Nenhuma carona no histórico
              </Text>

              <Text style={styles.vazioTexto}>
                Quando você finalizar uma carona,
                ela aparecerá aqui.
              </Text>

            </View>

          ) : (

            <FlatList
              data={historico}
              keyExtractor={(item) =>
                String(item.idCorrida)
              }
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.lista}
            />

          )}

        </View>

      </ImageBackground>

    </View>
  );
}