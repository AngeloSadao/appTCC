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
} from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';

import styles from './style';

const API_URL = 'http://localhost/appTcc';

export default function MinhasCaronasMotorista({ route }) {
  const navigation = useNavigation();

  const idMotorista = route.params?.idMotorista;

  const [caronas, setCaronas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  async function buscarCaronas() {
    if (!idMotorista) {
      setCarregando(false);
      return;
    }

    try {
      setCarregando(true);

      const resposta = await fetch(
        `${API_URL}/buscarMinhasCaronas.php?idMotorista=${idMotorista}`
      );

      const texto = await resposta.text();

      console.log('Minhas caronas motorista:', texto);

      let dados;

      try {
        dados = JSON.parse(texto);
      } catch (erro) {
        console.log('Resposta inválida:', texto);
        window.alert('O servidor retornou uma resposta inválida.');
        return;
      }

      if (dados.sucesso) {
        setCaronas(dados.caronas || []);
      } else {
        window.alert(
          dados.mensagem || 'Não foi possível buscar suas caronas.'
        );
      }

    } catch (erro) {
      console.log('Erro ao buscar minhas caronas:', erro);
      window.alert('Não foi possível carregar suas caronas.');
    } finally {
      setCarregando(false);
    }
  }

  async function cancelarCarona(idCarona) {
    const confirmar = window.confirm(
      'Cancelar carona\n\nTem certeza que deseja cancelar esta carona?'
    );

    if (!confirmar) {
      return;
    }

    try {
      const resposta = await fetch(
        `${API_URL}/cancelarCarona.php`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idCarona: idCarona,
            idMotorista: idMotorista,
          }),
        }
      );

      const texto = await resposta.text();

      console.log('Cancelar carona:', texto);

      let dados;

      try {
        dados = JSON.parse(texto);
      } catch (erro) {
        console.log('Resposta inválida:', texto);
        window.alert('O servidor retornou uma resposta inválida.');
        return;
      }

      if (dados.sucesso) {
        window.alert(
          'Sucesso\n\nCarona cancelada com sucesso.'
        );

        buscarCaronas();
      } else {
        window.alert(
          dados.mensagem || 'Não foi possível cancelar a carona.'
        );
      }

    } catch (erro) {
      console.log('Erro ao cancelar carona:', erro);
      window.alert('Não foi possível cancelar a carona.');
    }
  }

  useFocusEffect(
    useCallback(() => {
      buscarCaronas();
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

  function formatarStatus(status) {
    switch (status) {
      case 'ativa':
        return 'Ativa';

      case 'em_andamento':
        return 'Em andamento';

      case 'finalizada':
        return 'Finalizada';

      case 'cancelada':
        return 'Cancelada';

      default:
        return status || 'Sem status';
    }
  }

  function renderItem({ item }) {
    return (
      <View style={styles.card}>

        <View style={styles.linhaData}>
          <Text style={styles.data}>
            {formatarData(item.dataCarona)} • {formatarHorario(item.horarioCarona)}
          </Text>

          <Text style={styles.statusTexto}>
            {formatarStatus(item.statusCarona)}
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
              Vagas:
            </Text>

            <Text style={styles.informacaoValor}>
              {item.quantidadeVagas}
            </Text>
          </View>

          <View style={styles.informacao}>
            <Text style={styles.informacaoLabel}>
              Motorista:
            </Text>

            <Text style={styles.informacaoValor}>
              {item.nomeMotorista}
            </Text>
          </View>

        </View>

        {item.statusCarona === 'ativa' && (
          <TouchableOpacity
            style={styles.botaoCancelar}
            onPress={() => cancelarCarona(item.idCarona)}
          >
            <Ionicons
              name="close-circle-outline"
              size={16}
              color="#FFFFFF"
            />

            <Text style={styles.textoBotaoCancelar}>
              Cancelar carona
            </Text>
          </TouchableOpacity>
        )}

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
          Carregando suas caronas...
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
            Minhas
          </Text>

          <Text style={styles.title2}>
            caronas
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

          {caronas.length === 0 ? (

            <View style={styles.vazio}>

              <Ionicons
                name="car-outline"
                size={45}
                color="#AAAAAA"
              />

              <Text style={styles.vazioTitulo}>
                Nenhuma carona encontrada
              </Text>

              <Text style={styles.vazioTexto}>
                Quando você cadastrar uma carona,
                ela aparecerá aqui.
              </Text>

            </View>

          ) : (

            <FlatList
              data={caronas}
              keyExtractor={(item) =>
                String(item.idCarona)
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
