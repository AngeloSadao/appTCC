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
      console.log('Erro ao marcar mensagens como lidas:', erro);
    }
  };

  const carregarMensagens = async () => {
    if (!idConversa || !idRemetente || !tipoUsuario) {
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
        console.log('Resposta do PHP:', texto);
        return;
      }

      if (Array.isArray(dados)) {
        setMensagens(dados);
      }

      await marcarComoLido();

    } catch (erro) {
      console.log('Erro ao carregar mensagens:', erro);
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
  }, [idConversa, idRemetente, tipoUsuario]);

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

      const resultado = await resposta.json();

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
          resultado.mensagem || 'Não foi possível enviar a mensagem.'
        );
      }

    } catch (erro) {
      console.log('Erro ao enviar mensagem:', erro);

      window.alert(
        'Não foi possível enviar a mensagem.'
      );
    } finally {
      setEnviando(false);
    }
  };

  const renderMensagem = ({ item }) => {
    const minhaMensagem =
      Number(item.idRemetente) === Number(idRemetente) &&
      item.tipoRemetente === tipoUsuario;

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

          <View style={styles.informacoesMensagem}>
            <Text
              style={[
                styles.hora,
                minhaMensagem
                  ? styles.horaMinha
                  : styles.horaOutra,
              ]}
            >
              {formatarHora(item.dataHora)}
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
          onPress={() => navigation.goBack()}
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
            {nomeOutroUsuario || 'Usuário'}
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

            <Text style={styles.textoSemMensagens}>
              Nenhuma mensagem ainda
            </Text>

            <Text style={styles.subtextoSemMensagens}>
              Envie uma mensagem para iniciar a conversa.
            </Text>
          </View>
        ) : (
          <FlatList
            ref={flatListRef}
            data={mensagens}
            keyExtractor={(item) =>
              String(item.idMensagem)
            }
            renderItem={renderMensagem}
            contentContainerStyle={
              styles.listaMensagens
            }
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({
                animated: false,
              })
            }
          />
        )}

      </View>

      <View style={styles.areaEntrada}>

        <TextInput
          style={styles.input}
          value={mensagem}
          onChangeText={setMensagem}
          placeholder="Digite uma mensagem..."
          placeholderTextColor="#888"
          multiline
          maxLength={500}
        />

        <TouchableOpacity
          style={[
            styles.botaoEnviar,
            (!mensagem.trim() || enviando) &&
              styles.botaoEnviarDesativado,
          ]}
          onPress={enviarMensagem}
          disabled={!mensagem.trim() || enviando}
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