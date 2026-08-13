import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import styles from './style';

export default function Inicial({navigation}) {

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../../assets/backgroundGoTogether.png')} 
      style={styles.background}
      resizeMode="stretch"
      >

      <Text style={styles.title}>
        Compartilhe viagens,
      </Text>
      <Text style={styles.title2}>
        economize e ajude
      </Text>
      <Text style={styles.title3}>
        O meio ambiente!
      </Text>


      <Text style={styles.subtitle}>
        Conectamos motoristas e passageiros para
      </Text>
      <Text style={styles.subtitle2}>
        viagens de forma segura e sustetáveis.
      </Text>


      <TouchableOpacity 
      onPress={() => navigation.navigate('CadastroPassageiro')}
      style={styles.buttonPassageiro}>
        <View style={{flexDirection: 'row',}}>
          <View style={styles.backgroundIconPassageiro}>
            <Ionicons name='person-outline' size={37} color="#526EAA" />
          </View>

          <View style={styles.containerTextButton}>
            <Text style={styles.text1Passageiro}>
              Quero ser passageiro
            </Text>
            <Text style={styles.text2Passageiro}>
              Viajar com carona
            </Text>
          </View>

          <View style={styles.backgroundIcon2Passageiro}>
            <Ionicons name='arrow-forward-outline' size={24} color='#435E91'/>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity 
      onPress={() => navigation.navigate('CadastroMotorista')}
      style={styles.buttonMotorista}>
        <View style={{flexDirection: 'row',}}>
          <View style={styles.backgroundIconMotorista}>
            <Ionicons name='person-outline' size={37} color="#468B5B" />
          </View>

          <View style={styles.containerTextButton}>
            <Text style={styles.text1Motorista}>
              Quero ser motorista
            </Text>
            <Text style={styles.text2Motorista}>
              Oferecer carona
            </Text>
          </View>

          <View style={styles.backgroundIcon2Motorista}>
            <Ionicons name='arrow-forward-outline' size={24} color='#468B5B'/>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.containerLogar}>
        <Text style={styles.textLogar}>
          Já tem uma conta?
        </Text>
      
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('LoginPassageiro')
          }
        >
          <Text style={styles.logarText}>
            Entrar
          </Text>
        </TouchableOpacity>
      </View>

      </ImageBackground>
    </View>
  );
}