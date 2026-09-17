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

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const [tipoUsuario, setTipoUsuario] =
    useState('passageiro');

  async function logar() {

    if (!email || !senha) {
      mostrarAlert(
        'Atenção',
        'Preencha o email e a senha.'
      );
      return;
    }

    try {

      const response = await fetch(
        'http://localhost/appTcc/login.php',
        {
          method: 'POST',

          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            email: email,
            senha: senha,
            tipoUsuario: tipoUsuario
          }),
        }
      );

      const dados = await response.json();

      console.log('Resposta do login:', dados);

      if (!dados.sucesso) {
        mostrarAlert(
          'Erro no login',
          dados.mensagem
        );
        return;
      }

      // PASSAGEIRO
      if (dados.tipoUsuario === 'passageiro') {

        console.log(
          'Entrando como passageiro:',
          dados.id,
          dados.nome
        );

        navigation.navigate('HomePassageiro', {
          nome: dados.nome,
          idPassageiro: dados.id,
          tipoUsuario: 'passageiro'
        });

        return;
      }

      // MOTORISTA
      if (dados.tipoUsuario === 'motorista') {

        console.log(
          'Entrando como motorista:',
          dados.id,
          dados.nome
        );

        navigation.navigate('HomeMotorista', {
          nome: dados.nome,
          idMotorista: dados.id,
          tipoUsuario: 'motorista'
        });

        return;
      }

    } catch (error) {

      console.log('Erro no login:', error);

      mostrarAlert(
        'Erro',
        'Não foi possível conectar ao servidor.'
      );
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../../assets/backgroundGoTogether.png')}
        style={styles.background}
        resizeMode="stretch"
      >

        <Text style={styles.title}>
          Entrar na sua conta
        </Text>
        <Text style={styles.title2}>
          Que bom que você voltou!
        </Text>

        <View style={styles.containerInput}>
          <Text style={styles.text}>Email</Text>
          <View style={styles.input}>

            <Ionicons name="mail-outline" size={24} color="#81A1DF" />

            <TextInput
              style={styles.inputText}
              placeholder="Digite seu email"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <Text style={styles.text}>Senha</Text>
          <View style={styles.input}>

            <Ionicons name="lock-closed-outline" size={24} color="#81A1DF" />

            <TextInput
              style={styles.inputText}
              placeholder="Digite sua senha"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={!showPassword}
            />

            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={24}
                color="#6C92E6"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('RecuperarSenha')}
          >
            <Text
              style={{
                fontFamily: 'Gurajada',
                fontSize: 24,
                color: '#435E91',
                marginLeft: 130,
                marginBottom: -17,
              }}
            >
              Esqueci minha senha
            </Text>
          </TouchableOpacity>

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
            onPress={logar}
          >
            <Text style={styles.buttonText}>
              Entrar
            </Text>
          </TouchableOpacity>

        </View>

        <View style={styles.containerCadastro}>
          <Text style={styles.textCadastro}>
            Não tem uma conta?
          </Text>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Inicial')
            }
          >
            <Text style={styles.cadastrarText}>
              Cadastrar
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}