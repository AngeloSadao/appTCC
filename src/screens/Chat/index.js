import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import styles from './style';

const API_URL = 'http://localhost/appTcc';

export default function Chat({ route }) {
  const navigation = useNavigation();
  const flatListRef = useRef(null);

  const {
    idConversa,
    idCarona,
    idPassageiro,
    idMotorista,
    tipoUsuario,
    nomeOutroUsuario,
  } = route.params || {};

  const idRemetente =
    tipoUsuario === 'passageiro'
      ? idPassageiro
      : idMotorista;

  const [mensagem, setMensagem] = useState('');
  const [mensagens, setMensagens] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [iniciandoCorrida, setIniciandoCorrida] = useState(false);

  const [corridaIniciada, setCorridaIniciada] = useState(false);
  const [idCorridaAtual, setIdCorridaAtual] = useState(null);

  const formatarHora = (data) => {
    if (!data) return '';

    try {
      const dataFormatada = new Date(
        String(data).replace(' ', 'T')
      );

      if (isNaN(dataFormatada.getTime())) {
        return '';
      }

      return dataFormatada.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return '';
    }
  };

  const marcarComoLido = async () => {
    try {
      await fetch(`${API_URL}/marcarLido.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idConversa,
          idRemetente,
          tipoRemetente: tipoUsuario,
        }),
      });
    } catch (erro) {
      console.log(
        'Erro ao marcar mensagens como lidas:',
        erro
      );
    }
  };

  const carregarMensagens = async () => {
    if (
      !idConversa ||
      !idRemetente ||
      !tipoUsuario
    ) {
      setCarregando(false);
      return;
    }

    try {
      const resposta = await fetch(
        `${API_URL}/listarMensagens.php?idConversa=${idConversa}&idRemetente=${idRemetente}&tipoRemetente=${tipoUsuario}`
      );

      const texto = await resposta.text();

      let dados;

      try {
        dados = JSON.parse(texto);
      } catch {
        console.log(
          'Resposta do PHP:',
          texto
        );

        return;
      }

      if (Array.isArray(dados)) {
        setMensagens(dados);
      }

      await marcarComoLido();

    } catch (erro) {
      console.log(
        'Erro ao carregar mensagens:',
        erro
      );
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarMensagens();

    const intervalo = setInterval(() => {
      carregarMensagens();
    }, 3000);

    return () => clearInterval(intervalo);
  }, [
    idConversa,
    idRemetente,
    tipoUsuario,
  ]);

  async function verificarCorrida() {
    if (
      tipoUsuario !== 'passageiro' ||
      !idCarona
    ) {
      return;
    }

    try {
      const resposta = await fetch(
       `${API_URL}/buscarCorridaPorCarona.php?idCarona=${idCarona}&idPassageiro=${idPassageiro}`
      );

      const texto = await resposta.text();

      let dados;

      try {
        dados = JSON.parse(texto);
      } catch {
        console.log(
          'Resposta buscar corrida:',
          texto
        );
        return;
      }

      if (
        dados.sucesso &&
        dados.existe &&
        dados.corrida
      ) {
        if (
          dados.corrida.status ===
          'em_andamento'
        ) {
          setCorridaIniciada(true);
          setIdCorridaAtual(
            dados.corrida.idCorrida
          );
        } else {
          setCorridaIniciada(false);
          setIdCorridaAtual(null);
        }
      } else {
        setCorridaIniciada(false);
        setIdCorridaAtual(null);
      }

    } catch (erro) {
      console.log(
        'Erro ao verificar corrida:',
        erro
      );
    }
  }

  useEffect(() => {
    if (
      tipoUsuario !== 'passageiro' ||
      !idCarona
    ) {
      return;
    }

    verificarCorrida();

    const intervalo = setInterval(() => {
      verificarCorrida();
    }, 3000);

    return () => clearInterval(intervalo);
  }, [
    idCarona,
    tipoUsuario,
  ]);

  const enviarMensagem = async () => {
    const texto = mensagem.trim();

    if (!texto || enviando) {
      return;
    }

    setEnviando(true);

    try {
      const resposta = await fetch(
        `${API_URL}/enviarMensagem.php`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idConversa,
            idRemetente,
            tipoRemetente: tipoUsuario,
            mensagem: texto,
          }),
        }
      );

      const resultado =
        await resposta.json();

      if (resultado.sucesso) {
        setMensagem('');

        await carregarMensagens();

        setTimeout(() => {
          flatListRef.current?.scrollToEnd({
            animated: true,
          });
        }, 100);

      } else {

        window.alert(
          resultado.mensagem ||
          'Não foi possível enviar a mensagem.'
        );
      }

    } catch (erro) {

      console.log(
        'Erro ao enviar mensagem:',
        erro
      );

      window.alert(
        'Não foi possível enviar a mensagem.'
      );

    } finally {
      setEnviando(false);
    }
  };

  const iniciarCorrida = async () => {

    if (
      iniciandoCorrida ||
      !idCarona ||
      !idMotorista ||
      !idPassageiro
    ) {
      window.alert(
        'Não foi possível iniciar a corrida. Dados incompletos.'
      );

      return;
    }

    setIniciandoCorrida(true);

    try {

      const resposta = await fetch(
        `${API_URL}/iniciarCorrida.php`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idCarona,
            idMotorista,
            idPassageiro,
          }),
        }
      );

      const texto = await resposta.text();

      console.log(
        'Resposta iniciar corrida:',
        texto
      );

      let resultado;

      try {
        resultado = JSON.parse(texto);
      } catch {
        console.log(
          'Resposta inválida:',
          texto
        );

        window.alert(
          'O servidor retornou uma resposta inválida.'
        );

        return;
      }

      if (!resultado.sucesso) {

        window.alert(
          resultado.mensagem ||
          'Não foi possível iniciar a corrida.'
        );

        return;
      }

      navigation.navigate(
        'CorridaEmAndamento',
        {
          idCorrida: resultado.idCorrida,
          idCarona: idCarona,
          idMotorista: idMotorista,
          idPassageiro: idPassageiro,
          tipoUsuario: tipoUsuario,
          nomeOutroUsuario: nomeOutroUsuario,
        }
      );

    } catch (erro) {

      console.log(
        'Erro ao iniciar corrida:',
        erro
      );

      window.alert(
        'Não foi possível iniciar a corrida.'
      );

    } finally {
      setIniciandoCorrida(false);
    }
  };

  function acompanharCorrida() {
    if (!idCorridaAtual) {
      window.alert(
        'A corrida ainda não foi iniciada pelo motorista.'
      );
      return;
    }

    navigation.navigate(
      'CorridaEmAndamento',
      {
        idCorrida: idCorridaAtual,
        idCarona,
        idMotorista,
        idPassageiro,
        tipoUsuario: 'passageiro',
        nomeOutroUsuario,
      }
    );
  }

  const renderMensagem = ({ item }) => {

    const minhaMensagem =
      Number(item.idRemetente) ===
      Number(idRemetente) &&
      item.tipoRemetente ===
      tipoUsuario;

    return (
      <View
        style={[
          styles.linhaMensagem,
          minhaMensagem
            ? styles.linhaMinha
            : styles.linhaOutra,
        ]}
      >

        <View
          style={[
            styles.balao,
            minhaMensagem
              ? styles.balaoMinha
              : styles.balaoOutra,
          ]}
        >

          <Text
            style={[
              styles.textoMensagem,
              minhaMensagem
                ? styles.textoMinha
                : styles.textoOutra,
            ]}
          >
            {item.mensagem}
          </Text>

          <View
            style={
              styles.informacoesMensagem
            }
          >

            <Text
              style={[
                styles.hora,
                minhaMensagem
                  ? styles.horaMinha
                  : styles.horaOutra,
              ]}
            >
              {formatarHora(
                item.dataHora
              )}
            </Text>

            {minhaMensagem && (

              <Ionicons
                name={
                  item.status === 'lido'
                    ? 'checkmark-done'
                    : 'checkmark-done-outline'
                }
                size={16}
                color={
                  item.status === 'lido'
                    ? '#468B5B'
                    : '#777'
                }
              />

            )}

          </View>

        </View>

      </View>
    );
  };

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

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : undefined
      }
    >

      <View style={styles.header}>

        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() =>
            navigation.goBack()
          }
        >

          <Ionicons
            name="arrow-back"
            size={25}
            color="#fff"
          />

        </TouchableOpacity>

        <View style={styles.infoHeader}>

          <View style={styles.avatar}>

            <Ionicons
              name="person"
              size={22}
              color="#468B5B"
            />

          </View>

          <Text
            style={styles.nomeUsuario}
            numberOfLines={1}
          >
            {nomeOutroUsuario ||
              'Usuário'}
          </Text>

        </View>

      </View>

      <View style={styles.areaMensagens}>

        {mensagens.length === 0 ? (

          <View style={styles.semMensagens}>

            <Ionicons
              name="chatbubble-outline"
              size={45}
              color="#aaa"
            />

            <Text
              style={
                styles.textoSemMensagens
              }
            >
              Nenhuma mensagem ainda
            </Text>

            <Text
              style={
                styles.subtextoSemMensagens
              }
            >
              Envie uma mensagem para
              iniciar a conversa.
            </Text>

          </View>

        ) : (

          <FlatList
            ref={flatListRef}
            data={mensagens}
            keyExtractor={(item) =>
              String(item.idMensagem)
            }
            renderItem={
              renderMensagem
            }
            contentContainerStyle={
              styles.listaMensagens
            }
            showsVerticalScrollIndicator={
              false
            }
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({
                animated: false,
              })
            }
          />

        )}

      </View>

      {tipoUsuario === 'motorista' && (

        <TouchableOpacity
          onPress={iniciarCorrida}
          disabled={iniciandoCorrida}
          style={{
            marginHorizontal: 15,
            marginBottom: 10,
            height: 45,
            borderRadius: 10,
            backgroundColor:
              iniciandoCorrida
                ? '#9AB9A3'
                : '#468B5B',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}
        >

          {iniciandoCorrida ? (

            <ActivityIndicator
              size="small"
              color="#fff"
            />

          ) : (

            <>
              <Ionicons
                name="car-outline"
                size={21}
                color="#fff"
              />

              <Text
                style={{
                  color: '#fff',
                  fontSize: 15,
                  fontWeight: 'bold',
                  marginLeft: 8,
                }}
              >
                Iniciar corrida
              </Text>
            </>

          )}

        </TouchableOpacity>

      )}

      {tipoUsuario === 'passageiro' && corridaIniciada && (

        <TouchableOpacity
          onPress={acompanharCorrida}
          style={{
            marginHorizontal: 15,
            marginBottom: 10,
            height: 45,
            borderRadius: 10,
            backgroundColor: '#435E91',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}
        >

          <Ionicons
            name="navigate-outline"
            size={21}
            color="#fff"
          />

          <Text
            style={{
              color: '#fff',
              fontSize: 15,
              fontWeight: 'bold',
              marginLeft: 8,
            }}
          >
            Acompanhar corrida
          </Text>

        </TouchableOpacity>

      )}

      <View style={styles.areaEntrada}>

        <TextInput
          style={styles.input}
          value={mensagem}
          onChangeText={
            setMensagem
          }
          placeholder="Digite uma mensagem..."
          placeholderTextColor="#888"
          multiline
          maxLength={500}
        />

        <TouchableOpacity
          style={[
            styles.botaoEnviar,
            (!mensagem.trim() ||
              enviando) &&
            styles.botaoEnviarDesativado,
          ]}
          onPress={
            enviarMensagem
          }
          disabled={
            !mensagem.trim() ||
            enviando
          }
        >

          <Ionicons
            name="send"
            size={21}
            color="#fff"
          />

        </TouchableOpacity>

      </View>

    </KeyboardAvoidingView>
  );
}