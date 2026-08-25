import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

export default function HomeMotorista({ navigation, route }) {

  const nome = route.params?.nome ?? 'Motorista';

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F7FF',
      }}
    >

      <Text
        style={{
          fontSize: 28,
          fontWeight: 'bold',
          color: '#435E91',
          marginBottom: 10,
        }}
      >
        Olá, {nome}! 👋
      </Text>

      <Text
        style={{
          fontSize: 18,
          color: '#555',
          marginBottom: 30,
        }}
      >
        Bem-vindo ao GoTogether!
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: '#435E91',
          paddingVertical: 15,
          paddingHorizontal: 40,
          borderRadius: 10,
        }}
        onPress={() => navigation.openDrawer()}
      >

        <Text
          style={{
            color: '#FFF',
            fontSize: 16,
            fontWeight: 'bold',
          }}
        >
          Abrir menu
        </Text>

      </TouchableOpacity>

    </View>
  );
}