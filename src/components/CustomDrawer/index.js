import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';


import styles from './styles';

export default function CustomDrawer({nome, ...props}) {
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
      
      <View style={styles.container}>

        <Image
          style={styles.fotoPerfil}
          source={require('../../../assets/userPerfil.png')}
        />

        <Text style={styles.textNomeUsuario}>
          Olá, <Text style={styles.nomeUsuario}>{nome}!</Text>
        </Text>
        
        <TouchableOpacity onPress={() => props.navigation.navigate('EditarPerfilMotorista')}>
        <Text style={styles.editarPerfil}>
          Editar perfil
        </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('')}>
          <Text style={styles.buttonText}>Solicitar Carona</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('')}>
          <Text style={styles.buttonText}>Caronas Disponíveis</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('')}>
          <Text style={styles.buttonText}>Histórico de Caronas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('')}>
          <Text style={styles.buttonText}>Motoristas Favoritos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('')}>
          <Text style={styles.buttonText}>Sobre nós</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('')}>
          <Text style={styles.buttonText}>Comprar Chaveiro</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('')}>
          <Text style={styles.buttonText}>Central de Ajuda</Text>
        </TouchableOpacity>

        <View style={styles.rodape}>
          <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
            <Text style={styles.fecharMenu}>Fechar menu</Text>
          </TouchableOpacity>

          <View style={styles.sairRow}>
            <Text style={styles.sairLabel}>Deseja sair da conta?</Text>
            <TouchableOpacity onPress={() => props.navigation.navigate('')}>
              <Text style={styles.sairLink}>Sair</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </ScrollView>
  );
}