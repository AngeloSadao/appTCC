import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import {
  useNavigation,
  DrawerActions,
} from '@react-navigation/native';

import styles from './style';

const API_URL = 'http://localhost/appTcc';

export default function MinhasBonificacoesMotorista({ route }) {

  const navigation = useNavigation();

  const idMotorista = route.params?.idMotorista;

  const [bonificacoes, setBonificacoes] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    buscarBonificacoes();
  }, [idMotorista]);

  async function buscarBonificacoes() {

    if (!idMotorista) {
      setCarregando(false);
      return;
    }

    try {

      const resposta = await fetch(
        `${API_URL}/buscarBonificacoesMotorista.php?idMotorista=${idMotorista}`
      );

      const texto = await resposta.text();

      console.log(
        'Resposta bonificações:',
        texto
      );

      const dados = JSON.parse(texto);

      if (dados.sucesso) {

        setBonificacoes(
          dados.bonificacoes
        );

      } else {

        window.alert(
          dados.mensagem ||
          'Não foi possível carregar suas bonificações.'
        );

      }

    } catch (erro) {

      console.log(
        'Erro ao buscar bonificações:',
        erro
      );

      window.alert(
        'Não foi possível carregar suas bonificações.'
      );

    } finally {

      setCarregando(false);

    }
  }

  function formatarValor(valor) {

    const numero = Number(valor || 0);

    return numero.toLocaleString(
      'pt-BR',
      {
        style: 'currency',
        currency: 'BRL',
      }
    );
  }

  if (carregando) {

    return (
      <View style={styles.carregando}>

        <ActivityIndicator
          size="large"
          color="#468B5B"
        />

        <Text style={styles.textoCarregando}>
          Carregando suas bonificações...
        </Text>

      </View>
    );
  }

  if (!bonificacoes) {

    return (
      <View style={styles.carregando}>

        <Text style={styles.erro}>
          Não foi possível carregar suas bonificações.
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

        <View style={styles.titulosContainer}>

          <Text style={styles.title}>
            Bonificações
          </Text>

          <Text style={styles.title2}>
            Pontos e gorjetas
          </Text>

        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.conteudoScroll}
          showsVerticalScrollIndicator={false}
        >

          <View style={styles.cardBonificacoes}>

            <Text style={styles.cardTitulo}>
              Seus ganhos
            </Text>

            <Text style={styles.cardSubtitulo}>
              Acompanhe seus pontos e gorjetas
            </Text>

            <View style={styles.linha} />

            <View style={styles.itemBonificacao}>

              <View style={styles.iconeContainer}>

                <Ionicons
                  name="cash-outline"
                  size={30}
                  color="#468B5B"
                />

              </View>

              <View style={styles.info}>

                <Text style={styles.itemTitulo}>
                  Total de gorjetas
                </Text>

                <Text style={styles.itemDescricao}>
                  Gorjetas recebidas nas suas caronas
                </Text>

                <Text style={styles.valor}>
                  {formatarValor(
                    bonificacoes.totalGorjetas
                  )}
                </Text>

              </View>

            </View>

            <View style={styles.itemBonificacao}>

              <View style={styles.iconeContainer}>

                <Ionicons
                  name="star"
                  size={30}
                  color="#468B5B"
                />

              </View>

              <View style={styles.info}>

                <Text style={styles.itemTitulo}>
                  Pontos acumulados
                </Text>

                <Text style={styles.itemDescricao}>
                  Pontos conquistados nas suas caronas
                </Text>

                <Text style={styles.valorPontos}>
                  {Number(
                    bonificacoes.pontosMotorista || 0
                  ).toLocaleString('pt-BR')}{' '}
                  pontos
                </Text>

              </View>

            </View>

          </View>

          <View style={styles.cardCupons}>

            <View style={styles.cabecalhoCupons}>

              <Ionicons
                name="ticket-outline"
                size={25}
                color="#468B5B"
              />

              <Text style={styles.cardTituloCupons}>
                Cupons
              </Text>

            </View>

            <Text style={styles.textoCupons}>
              Troque seus pontos por descontos em
              comércios parceiros.
            </Text>

            <View style={styles.emBreve}>

              <Ionicons
                name="time-outline"
                size={20}
                color="#468B5B"
              />

              <Text style={styles.textoEmBreve}>
                Sistema de troca de cupons em breve
              </Text>

            </View>

          </View>

          <View style={styles.espacoFinal} />

        </ScrollView>

      </ImageBackground>

    </View>
  );
}