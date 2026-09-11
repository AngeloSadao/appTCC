import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

import styles from './style';
import { CommonActions } from '@react-navigation/native';

export default function CustomDrawerMotorista({ nome, idMotorista, ...props }) {

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
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>

        <Image
          style={styles.fotoPerfil}
          source={require('../../../assets/userPerfil.png')}
        />

        <Text style={styles.textNomeUsuario}>
          Olá, <Text style={styles.nomeUsuario}>{nome}!</Text>
        </Text>

        <TouchableOpacity style={styles.editarPerfil}>
          <Text style={styles.editarPerfilTexto}>
            Editar perfil
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonVerde]}
          onPress={() => irPara('HomeMotorista')}
        >
          <Text style={styles.buttonText}>Oferecer Carona</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonVerdeClaro]}
          onPress={() => irPara('HomeMotorista')}
        >
          <Text style={styles.buttonText}>Caronas Solicitadas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonVerde]}
          onPress={() => irPara('HomeMotorista')}
        >
          <Text style={styles.buttonText}>Histórico de Caronas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonVerdeClaro]}
          onPress={() => irPara('HomeMotorista')}
        >
          <Text style={styles.buttonText}>Minhas Bonificações</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonVerde]}
        >
          <Text style={styles.buttonText}>Sobre Nós</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonVerdeClaro]}
        >
          <Text style={styles.buttonText}>Comprar Chaveiro</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonVerde]}
        >
          <Text style={styles.buttonText}>Central de Ajuda</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonVerdeClaro, styles.buttonEmergencia]}
        >
          <Text style={styles.buttonTextContatos}>
            Cadastrar contatos de{'\n'}emergência
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