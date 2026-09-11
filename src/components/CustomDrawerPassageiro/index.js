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

export default function CustomDrawerPassageiro({ nome, idPassageiro, ...props }) {
  const [fotoPerfil, setFotoPerfil] = useState(null);

  useFocusEffect(
    useCallback(() => {
      buscarFotoPerfil();
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
          onPress={() => irPara('CorridaFinalizadaPassageiro')}
        >
          <Text style={styles.buttonText}>Histórico de Caronas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Motoristas Favoritos</Text>
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