import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

import styles from './style';
import {
  CommonActions,
  useFocusEffect,
} from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function CustomDrawerMotorista({
  nome,
  idMotorista,
  ...props
}) {

  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [mensagensNaoLidas, setMensagensNaoLidas] = useState(0);
  const [conversasNaoLidas, setConversasNaoLidas] = useState([]);

  useFocusEffect(
    useCallback(() => {
      buscarFotoPerfil();
    }, [idMotorista])
  );

  useFocusEffect(
    useCallback(() => {

      if (!idMotorista) {
        return;
      }

      buscarMensagensNaoLidas();

      const intervalo = setInterval(() => {
        buscarMensagensNaoLidas();
      }, 3000);

      return () => clearInterval(intervalo);

    }, [idMotorista])
  );

  async function buscarFotoPerfil() {

    if (!idMotorista) {
      return;
    }

    try {

      const response = await fetch(
        'http://localhost/appTcc/buscarMotorista.php',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idMotorista: idMotorista,
          }),
        }
      );

      const dados = await response.json();

      console.log(
        'Foto do motorista:',
        dados
      );

      if (
        dados.sucesso &&
        dados.motorista &&
        dados.motorista.fotoPerfilMotorista
      ) {

        setFotoPerfil(
          `http://localhost/appTcc/img/perfilMotorista/${dados.motorista.fotoPerfilMotorista}?t=${Date.now()}`
        );

      } else {

        setFotoPerfil(null);

      }

    } catch (error) {

      console.log(
        'Erro ao buscar foto do motorista:',
        error
      );

      setFotoPerfil(null);
    }
  }

  async function buscarMensagensNaoLidas() {

    if (!idMotorista) {
      return;
    }

    try {

      const response = await fetch(
        'http://localhost/appTcc/buscarMensagensNaoLidas.php',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idMotorista: idMotorista,
          }),
        }
      );

      const dados = await response.json();

      console.log(
        'Mensagens não lidas do motorista:',
        dados
      );

      if (dados.sucesso) {

        setMensagensNaoLidas(
          Number(dados.quantidade) || 0
        );

        setConversasNaoLidas(
          Array.isArray(dados.conversas)
            ? dados.conversas
            : []
        );

      } else {

        setMensagensNaoLidas(0);
        setConversasNaoLidas([]);

      }

    } catch (error) {

      console.log(
        'Erro ao buscar mensagens não lidas:',
        error
      );

    }
  }

  function abrirMensagens() {

    if (
      !conversasNaoLidas.length ||
      !conversasNaoLidas[0]
    ) {
      return;
    }

    const conversa = conversasNaoLidas[0];

    props.navigation.getParent()?.navigate(
      'Chat',
      {
        idConversa: conversa.idConversa,
        idCarona: conversa.idCarona,
        idSolicitacao: conversa.idSolicitacao,
        idPassageiro: conversa.idPassageiro,
        idMotorista: conversa.idMotorista,
        tipoUsuario: 'motorista',
      }
    );

    props.navigation.closeDrawer();
  }

  function irPara(nomeTela, params = {}) {
    props.navigation.navigate(nomeTela, params);
    props.navigation.closeDrawer();
  }

  function editarPerfil() {

    props.navigation.getParent()?.navigate(
      'EditarPerfilMotorista',
      {
        idMotorista: idMotorista,
      }
    );

    props.navigation.closeDrawer();
  }

  function sair() {
    props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Inicial' }],
      })
    );
  }

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>

        <TouchableOpacity
          onPress={editarPerfil}
        >
          <Image
            style={styles.fotoPerfil}
            source={
              fotoPerfil
                ? { uri: fotoPerfil }
                : require('../../../assets/userPerfil.png')
            }
          />
        </TouchableOpacity>

        <Text style={styles.textNomeUsuario}>
          Olá, <Text style={styles.nomeUsuario}>{nome}!</Text>
        </Text>

        <TouchableOpacity
          onPress={editarPerfil}
        >
          <Text style={styles.editarPerfil}>
            Editar perfil
          </Text>
        </TouchableOpacity>

        {mensagensNaoLidas > 0 && (
          <TouchableOpacity
            onPress={abrirMensagens}
            activeOpacity={0.7}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 18,
              marginBottom: 12,
              paddingVertical: 6,
              paddingHorizontal: 4,
            }}
          >
            <Ionicons
              name="notifications"
              size={24}
              color="#468B5B"
            />

            <Text
              style={{
                marginLeft: 7,
                fontSize: 15,
                fontWeight: 'bold',
                color: '#468B5B',
              }}
            >
              {mensagensNaoLidas === 1
                ? 'Nova mensagem'
                : `${mensagensNaoLidas} novas mensagens`}
            </Text>

            <View
              style={{
                marginLeft: 7,
                minWidth: 22,
                height: 22,
                borderRadius: 11,
                backgroundColor: '#468B5B',
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 5,
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 12,
                  fontWeight: 'bold',
                }}
              >
                {mensagensNaoLidas}
              </Text>
            </View>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.button, styles.buttonVerde]}
          onPress={() => irPara('HomeMotorista')}
        >
          <Text style={styles.buttonText}>
            Oferecer Carona
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonVerdeClaro]}
          onPress={() =>
            irPara('MinhasCaronasMotorista', {
              idMotorista: idMotorista,
              nome: nome,
              tipoUsuario: 'motorista',
            })
          }
        >
          <Text style={styles.buttonText}>
            Minhas Caronas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonVerdeClaro]}
          onPress={() => {
            props.navigation.navigate('CaronasSolicitadas', {
              idMotorista: idMotorista,
            });
            props.navigation.closeDrawer();
          }}
        >
          <Text style={styles.buttonText}>
            Caronas Solicitadas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            irPara('HistoricoMotorista', {
              idMotorista: idMotorista,
            })
          }
        >
          <Text style={styles.buttonText}>
            Histórico de Caronas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonVerdeClaro]}
          onPress={() =>
            irPara('MinhasBonificacoesMotorista', {
              idMotorista: idMotorista,
              nome: nome,
              tipoUsuario: 'motorista',
            })
          }
        >
          <Text style={styles.buttonText}>
            Minhas Bonificações
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonVerde]}
        >
          <Text style={styles.buttonText}>
            Sobre Nós
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonVerdeClaro]}
        >
          <Text style={styles.buttonText}>
            Comprar Chaveiro
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonVerde]}
        >
          <Text style={styles.buttonText}>
            Central de Ajuda
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            irPara('CadastroContatosEmergenciaisMotorista', {
              idMotorista: idMotorista,
            })
          }
        >
          <Text style={styles.buttonTextContatos}>
            Adicionar contatos de emergência
          </Text>
        </TouchableOpacity>

        <View style={styles.rodape}>

          <TouchableOpacity
            onPress={() => props.navigation.closeDrawer()}
          >
            <Text style={styles.fecharMenu}>
              Fechar menu
            </Text>
          </TouchableOpacity>

          <View style={styles.sairRow}>

            <Text style={styles.sairLabel}>
              Deseja sair da conta?
            </Text>

            <TouchableOpacity onPress={sair}>
              <Text style={styles.sairLink}>
                Sair
              </Text>
            </TouchableOpacity>

          </View>

        </View>

      </View>
    </ScrollView>
  );
}
