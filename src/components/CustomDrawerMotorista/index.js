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

export default function CustomDrawerMotorista({
  nome,
  idMotorista,
  ...props
}) {

  const [fotoPerfil, setFotoPerfil] = useState(null);

  useFocusEffect(
    useCallback(() => {
      buscarFotoPerfil();
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
          onPress={() => irPara('HomeMotorista')}
        >
          <Text style={styles.buttonText}>
            Caronas Solicitadas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonVerde]}
          onPress={() => irPara('HomeMotorista')}
        >
          <Text style={styles.buttonText}>
            Histórico de Caronas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonVerdeClaro]}
          onPress={() => irPara('HomeMotorista')}
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