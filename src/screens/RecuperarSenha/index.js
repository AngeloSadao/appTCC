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

const mostrarAlert = (titulo, mensagem) => {
  if (typeof window !== 'undefined') {
    window.alert(`${titulo}\n\n${mensagem}`);
  }
};

export default function RecuperarSenha({ navigation }) {

  const [email, setEmail] = useState('');
  const [novaSenha, setNovaSenha] = useState('');

  const [tipoUsuario, setTipoUsuario] =
    useState('passageiro');

  const [showPassword, setShowPassword] =
    useState(false);


  async function alterarSenha() {

    if (!email || !novaSenha) {

      mostrarAlert( 
        'Atenção',
        'Preencha o email e a nova senha.'
      );

      return;
    }


    try {

      const response = await fetch(
        'http://localhost/appTcc/alterarSenha.php',
        {
          method: 'POST',

          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({

            email: email,

            novaSenha: novaSenha,

            tipoUsuario: tipoUsuario

          }),
        }
      );


      const dados = await response.json();

      console.log(
        'Resposta alteração de senha:',
        dados
      );


      if (dados.sucesso) {

        mostrarAlert( 
          'Sucesso!',
          'Senha alterada com sucesso.',
          [
            {
              text: 'OK',
              onPress: () =>
                navigation.navigate('Login')
            }
          ]
        );

      } else {

        mostrarAlert(
          'Atenção',
          dados.mensagem
        );

      }


    } catch (error) {

      console.log(
        'Erro ao alterar senha:',
        error
      );

      mostrarAlert(
        'Erro',
        'Não foi possível conectar ao servidor.'
      );

    }

  }


  return (

    <View style={styles.container}>

      <ImageBackground
        source={require('../../../assets/backgroundGoTogether.png')}
        style={styles.background}
        resizeMode="stretch"
      >

        <Text style={styles.title}>
          Recuperar senha
        </Text>

        <Text style={styles.title2}>
          Cadastre uma nova senha
        </Text>


        <View style={styles.containerInput}>


          <Text style={styles.text}>
            Email
          </Text>

          <View style={styles.input}>

            <Ionicons
              name="mail-outline"
              size={24}
              color="#81A1DF"
            />

            <TextInput
              style={styles.inputText}
              placeholder="Digite seu email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

          </View>


          <Text style={styles.text}>
            Nova senha
          </Text>

          <View style={styles.input}>

            <Ionicons
              name="lock-closed-outline"
              size={24}
              color="#81A1DF"
            />

            <TextInput
              style={styles.inputText}
              placeholder="Digite sua nova senha"
              value={novaSenha}
              onChangeText={setNovaSenha}
              secureTextEntry={!showPassword}
            />

            <TouchableOpacity
              onPress={() =>
                setShowPassword(!showPassword)
              }
            >

              <Ionicons
                name={
                  showPassword
                    ? 'eye-off-outline'
                    : 'eye-outline'
                }
                size={24}
                color="#6C92E6"
              />

            </TouchableOpacity>

          </View>


          <View style={styles.radioContainer}>

            {/* PASSAGEIRO */}
            <TouchableOpacity
              style={styles.option}
              onPress={() =>
                setTipoUsuario('passageiro')
              }
            >

              <Text
                style={[
                  styles.radioText,
                  tipoUsuario === 'passageiro' &&
                  styles.activeText
                ]}
              >
                Sou passageiro
              </Text>

              <View
                style={[
                  styles.circle,
                  tipoUsuario === 'passageiro'
                    ? styles.activeCircle
                    : styles.inactiveCircle
                ]}
              />

            </TouchableOpacity>


            {/* MOTORISTA */}
            <TouchableOpacity
              style={styles.option}
              onPress={() =>
                setTipoUsuario('motorista')
              }
            >

              <Text
                style={[
                  styles.radioText,
                  tipoUsuario === 'motorista' &&
                  styles.activeText
                ]}
              >
                Sou motorista
              </Text>

              <View
                style={[
                  styles.circle,
                  tipoUsuario === 'motorista'
                    ? styles.activeCircle
                    : styles.inactiveCircle
                ]}
              />

            </TouchableOpacity>

          </View>


          <TouchableOpacity
            style={styles.button}
            onPress={alterarSenha}
          >

            <Text style={styles.buttonText}>
              Alterar senha
            </Text>

          </TouchableOpacity>


          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Login')
            }
          >

            <Text style={styles.voltar}>
              Voltar para o login
            </Text>

          </TouchableOpacity>


        </View>

      </ImageBackground>

    </View>

  );

}

