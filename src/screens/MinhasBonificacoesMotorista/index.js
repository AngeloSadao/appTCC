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
  useFocusEffect,
} from '@react-navigation/native';

import styles from './style';

const API_URL = 'http://localhost/appTcc';

export default function MinhasBonificacoesMotorista({ route }) {

  const navigation = useNavigation();

  const idMotorista = route.params?.idMotorista;

  const [bonificacoes, setBonificacoes] = useState(null);
  const [carregando, setCarregando] = useState(true);

  const [cupons, setCupons] = useState([]);
  const [carregandoCupons, setCarregandoCupons] = useState(true);
  const [resgatando, setResgatando] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      buscarBonificacoes();
      buscarCupons();
    }, [idMotorista])
  );

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

  async function buscarCupons() {

    try {

      setCarregandoCupons(true);

      const resposta = await fetch(
        `${API_URL}/buscarCuponsDisponiveis.php?idMotorista=${idMotorista}`
      );

      const texto = await resposta.text();

      console.log(
        'Resposta cupons:',
        texto
      );

      const dados = JSON.parse(texto);

      if (dados.sucesso) {

        setCupons(
          dados.cupons || []
        );

      } else {

        window.alert(
          dados.mensagem ||
          'Não foi possível carregar os cupons.'
        );

      }

    } catch (erro) {

      console.log(
        'Erro ao buscar cupons:',
        erro
      );

      window.alert(
        'Não foi possível carregar os cupons.'
      );

    } finally {

      setCarregandoCupons(false);

    }
  }

  async function resgatarCupom(cupom) {

    if (!idMotorista) {

      window.alert(
        'Não foi possível identificar o motorista.'
      );

      return;
    }

    const pontosMotorista = Number(
      bonificacoes?.pontosMotorista || 0
    );

    const pontosNecessarios = Number(
      cupom.pontosNecessariosCupom || 0
    );

    if (pontosMotorista < pontosNecessarios) {

      window.alert(
        `Você precisa de ${pontosNecessarios.toLocaleString('pt-BR')} pontos para resgatar este cupom.`
      );

      return;
    }

    try {

      setResgatando(cupom.idCupom);

      const resposta = await fetch(
        `${API_URL}/resgatarCupom.php`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idMotorista: idMotorista,
            idCupom: cupom.idCupom,
          }),
        }
      );

      const texto = await resposta.text();

      console.log(
        'Resposta resgate:',
        texto
      );

      const dados = JSON.parse(texto);

      if (!dados.sucesso) {

        window.alert(
          dados.mensagem ||
          'Não foi possível resgatar o cupom.'
        );

        return;
      }

      window.alert(
        'Cupom resgatado com sucesso!'
      );

      await buscarBonificacoes();
      await buscarCupons();

    } catch (erro) {

      console.log(
        'Erro ao resgatar cupom:',
        erro
      );

      window.alert(
        'Não foi possível resgatar o cupom.'
      );

    } finally {

      setResgatando(null);

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

            {carregandoCupons ? (

              <View style={styles.emBreve}>

                <ActivityIndicator
                  size="small"
                  color="#468B5B"
                />

                <Text style={styles.textoEmBreve}>
                  Carregando cupons...
                </Text>

              </View>

            ) : cupons.length === 0 ? (

              <View style={styles.emBreve}>

                <Ionicons
                  name="ticket-outline"
                  size={20}
                  color="#468B5B"
                />

                <Text style={styles.textoEmBreve}>
                  Nenhum cupom disponível no momento.
                </Text>

              </View>

            ) : (

              <View style={styles.listaCupons}>

                {cupons.map(cupom => {

                  const pontosNecessarios = Number(
                    cupom.pontosNecessariosCupom || 0
                  );

                  const pontosMotorista = Number(
                    bonificacoes.pontosMotorista || 0
                  );

                  const podeResgatar =
                    pontosMotorista >= pontosNecessarios;

                  const descontoDinheiro =
                    cupom.descontoDinheiroCupom;

                  const descontoPercentual =
                    cupom.descontoPercentualCupom;

                  const validade = String(
                    cupom.validadeCupom || ''
                  ).split('-');

                  const dataFormatada =
                    validade.length === 3
                      ? `${validade[2]}/${validade[1]}/${validade[0]}`
                      : cupom.validadeCupom;

                  return (

                    <View
                      key={cupom.idCupom}
                      style={styles.cupomItem}
                    >

                      <View style={styles.cupomCabecalho}>

                        <View style={styles.cupomIcone}>

                          <Ionicons
                            name="ticket"
                            size={24}
                            color="#468B5B"
                          />

                        </View>

                        <View style={styles.cupomTituloContainer}>

                          <Text style={styles.cupomNome}>
                            {cupom.nomeCupom}
                          </Text>

                          <Text style={styles.cupomColaborador}>
                            {cupom.nomeColaborador}
                          </Text>

                        </View>

                      </View>

                      <Text style={styles.cupomDesconto}>

                        {descontoDinheiro !== null &&
                          descontoDinheiro !== ''
                          ? `R$ ${Number(
                            descontoDinheiro
                          ).toFixed(2).replace('.', ',')}`
                          : `${Number(
                            descontoPercentual
                          )}%`
                        }

                      </Text>

                      <Text style={styles.cupomDescricao}>
                        Desconto em compras
                      </Text>

                      <Text style={styles.cupomMinimo}>
                        Compra mínima: {formatarValor(
                          cupom.valorMinimoCupom
                        )}
                      </Text>

                      <Text style={styles.cupomValidade}>
                        Válido até: {dataFormatada}
                      </Text>

                      <View style={styles.cupomPontos}>

                        <Ionicons
                          name="star"
                          size={18}
                          color="#468B5B"
                        />

                        <Text style={styles.cupomPontosTexto}>
                          {pontosNecessarios.toLocaleString('pt-BR')}
                          {' '}pontos
                        </Text>

                      </View>

                      <TouchableOpacity
                        style={[
                          styles.botaoResgatar,
                          !podeResgatar &&
                          styles.botaoResgatarDesabilitado,
                        ]}
                        disabled={
                          !podeResgatar ||
                          resgatando === cupom.idCupom
                        }
                        onPress={() =>
                          resgatarCupom(cupom)
                        }
                      >

                        <Text
                          style={styles.textoBotaoResgatar}
                        >
                          {resgatando === cupom.idCupom
                            ? 'Resgatando...'
                            : podeResgatar
                              ? 'Resgatar cupom'
                              : 'Pontos insuficientes'}
                        </Text>

                      </TouchableOpacity>

                    </View>

                  );

                })}

              </View>

            )}

          </View>

          <View style={styles.espacoFinal} />

        </ScrollView>

      </ImageBackground>

    </View>
  );
}