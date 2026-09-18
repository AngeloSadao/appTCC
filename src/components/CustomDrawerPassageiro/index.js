import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

import styles from './style';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function CustomDrawerPassageiro({ nome, idPassageiro, ...props }) {
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [mensagensNaoLidas, setMensagensNaoLidas] = useState(0);
  const [conversasNaoLidas, setConversasNaoLidas] = useState([]);

  useFocusEffect(
    useCallback(() => {
      buscarFotoPerfil();
    }, [idPassageiro])
  );

  useFocusEffect(
    useCallback(() => {
      if (!idPassageiro) {
        return;
      }

      buscarMensagensNaoLidas();

      const intervalo = setInterval(() => {
        buscarMensagensNaoLidas();
      }, 3000);

      return () => clearInterval(intervalo);
    }, [idPassageiro])
  );

  async function buscarFotoPerfil() {
    if (!idPassageiro) {
      return;
    }

    try {
      const response = await fetch(
        'http://localhost/appTcc/buscarPassageiro.php',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idPassageiro: idPassageiro,
          }),
        }
      );

      const dados = await response.json();

      console.log('Foto do passageiro:', dados);

      if (
        dados.sucesso &&
        dados.passageiro &&
        dados.passageiro.fotoPerfilPassageiro
      ) {
        setFotoPerfil(
          `http://localhost/appTcc/img/perfil/${dados.passageiro.fotoPerfilPassageiro}`
        );
      } else {
        setFotoPerfil(null);
      }
    } catch (error) {
      console.log('Erro ao buscar foto de perfil:', error);
    }
  }

  async function buscarMensagensNaoLidas() {
    if (!idPassageiro) {
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
            idPassageiro: idPassageiro,
          }),
        }
      );

      const dados = await response.json();

      console.log('Mensagens não lidas do passageiro:', dados);

      if (dados.sucesso) {
        setMensagensNaoLidas(Number(dados.quantidade) || 0);
        setConversasNaoLidas(dados.conversas || []);
      } else {
        setMensagensNaoLidas(0);
        setConversasNaoLidas([]);
      }
    } catch (error) {
      console.log('Erro ao buscar mensagens não lidas:', error);
    }
  }

  function abrirMensagens() {
    if (!conversasNaoLidas.length) {
      return;
    }

    const conversa = conversasNaoLidas[0];

    props.navigation.getParent()?.navigate('Chat', {
      idConversa: conversa.idConversa,
      idCarona: conversa.idCarona,
      idSolicitacao: conversa.idSolicitacao,
      idPassageiro: conversa.idPassageiro,
      idMotorista: conversa.idMotorista,
      tipoUsuario: 'passageiro',
    });

    props.navigation.closeDrawer();
  }

  function irPara(nomeTela, params = {}) {
    props.navigation.navigate(nomeTela, params);
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
    >
      <View style={styles.container}>
        <Image
          style={styles.fotoPerfil}
          source={
            fotoPerfil
              ? { uri: fotoPerfil }
              : require('../../../assets/userPerfil.png')
          }
        />

        <Text style={styles.textNomeUsuario}>
          Olá, <Text style={styles.nomeUsuario}>{nome}!</Text>
        </Text>

        <TouchableOpacity
          onPress={() =>
            props.navigation.getParent()?.navigate('EditarPerfilPassageiro', {
              idPassageiro: idPassageiro,
            })
          }
        >
          <Text style={styles.editarPerfil}>Editar perfil</Text>
        </TouchableOpacity>

        {mensagensNaoLidas > 0 && (
          <TouchableOpacity
            onPress={abrirMensagens}
            activeOpacity={0.7}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 18,
              marginBottom: 12,
              paddingVertical: 8,
              paddingHorizontal: 12,
            }}
          >
            <Ionicons
              name="notifications"
              size={24}
              color="#468B5B"
            />

            <Text
              style={{
                marginLeft: 8,
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
                marginLeft: 8,
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
          style={styles.button}
          onPress={() => irPara('HomePassageiro')}
        >
          <Text style={styles.buttonText}>Solicitar Carona</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => irPara('CaronasDisponiveis')}
        >
          <Text style={styles.buttonText}>Caronas Disponíveis</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            irPara('MinhasCaronasPassageiro', {
              idPassageiro: idPassageiro,
              nome: nome,
              tipoUsuario: 'passageiro',
            })
          }
        >
          <Text style={styles.buttonText}>Minhas Caronas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            irPara('HistoricoPassageiro', {
              idPassageiro: idPassageiro,
            })
          }
        >
          <Text style={styles.buttonText}>Histórico de Caronas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            irPara('MotoristasFavoritos', {
              idPassageiro: idPassageiro,
              nome: nome,
              tipoUsuario: 'passageiro',
            })
          }
        >
          <Text style={styles.buttonText}>
            Motoristas Favoritos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sobre nós</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Comprar Chaveiro</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Central de Ajuda</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            irPara('CadastroContatosEmergenciais', {
              idPassageiro: idPassageiro,
            })
          }
        >
          <Text style={styles.buttonTextContatos}>
            Adicionar contatos de emergência
          </Text>
        </TouchableOpacity>

        <View style={styles.rodape}>
          <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
            <Text style={styles.fecharMenu}>Fechar menu</Text>
          </TouchableOpacity>

          <View style={styles.sairRow}>
            <Text style={styles.sairLabel}>Deseja sair da conta?</Text>

            <TouchableOpacity onPress={sair}>
              <Text style={styles.sairLink}>Sair</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
