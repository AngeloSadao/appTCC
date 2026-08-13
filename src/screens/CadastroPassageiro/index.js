import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import styles from './style';
import { ImageBackground } from 'react-native-web';

export default function CadastroPassageiro({ navigation }) {

  const [nomeCompletoPassageiro, setNomeCompletoPassageiro] = useState('');
  const [cpfPassageiro, setCpfPassageiro] = useState('');
  const [telefonePassageiro, setTelefonePassageiro] = useState('');
  const [emailPassageiro, setEmailPassageiro] = useState('');
  const [ruaPassageiro, setRuaPassageiro] = useState('');
  const [complementoEnderecoPassageiro, setComplementoEnderecoPassageiro] = useState('');
  const [numeroEnderecoPassageiro, setNumeroEnderecoPassageiro] = useState('');
  const [bairroPassageiro, setBairroPassageiro] = useState('');
  const [cidadePassageiro, setCidadePassageiro] = useState('');
  const [estadoPassageiro, setEstadoPassageiro] = useState('');
  const [cepPassageiro, setCepPassageiro] = useState('');
  const [dataNascimentoPassageiro, setDataNascimentoPassageiro] = useState('');
  const [senhaPassageiro, setSenhaPassageiro] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  function mascaraData(texto) {
    const numeros = texto.replace(/\D/g, '');
    if (numeros.length <= 2) return numeros;
    if (numeros.length <= 4) return `${numeros.slice(0,2)}/${numeros.slice(2)}`;
    return `${numeros.slice(0,2)}/${numeros.slice(2,4)}/${numeros.slice(4,8)}`;
  }

  function mascaraTelefone(texto) {
    const numeros = texto.replace(/\D/g, '');
    if (numeros.length <= 2) return `(${numeros}`;
    if (numeros.length <= 7) return `(${numeros.slice(0,2)}) ${numeros.slice(2)}`;
    return `(${numeros.slice(0,2)}) ${numeros.slice(2,7)}-${numeros.slice(7,11)}`;
  }

  function mascaraCPF(texto) {
    const numeros = texto.replace(/\D/g, '');
    if (numeros.length <= 3) return numeros;
    if (numeros.length <= 6) return `${numeros.slice(0,3)}.${numeros.slice(3)}`;
    if (numeros.length <= 9) return `${numeros.slice(0,3)}.${numeros.slice(3,6)}.${numeros.slice(6)}`;
    return `${numeros.slice(0,3)}.${numeros.slice(3,6)}.${numeros.slice(6,9)}-${numeros.slice(9,11)}`;
  }

  function mascaraCEP(texto) {
    const numeros = texto.replace(/\D/g, '');
    if (numeros.length <= 5) return numeros;
    return `${numeros.slice(0,5)}-${numeros.slice(5,8)}`;
  }

  async function cadastrar() {

    if (
      nomeCompletoPassageiro == "" ||
      cpfPassageiro == "" ||
      telefonePassageiro == "" ||
      emailPassageiro == "" ||
      ruaPassageiro == "" ||
      numeroEnderecoPassageiro == "" ||
      bairroPassageiro == "" ||
      cidadePassageiro == "" ||
      estadoPassageiro == "" ||
      cepPassageiro == "" ||
      dataNascimentoPassageiro == "" ||
      senhaPassageiro == ""
    ) {

      window.alert('Há campos não preenchidos');
      return;
    }

    try {

      const [dia, mes, ano] = dataNascimentoPassageiro.split('/');
      const dataFormatada = `${ano}-${mes}-${dia}`;

      const response = await fetch(
        'http://localhost/appTcc/salvarPassageiro.php',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({

            nomeCompletoPassageiro,
            cpfPassageiro,
            telefonePassageiro,
            emailPassageiro,
            ruaPassageiro,
            numeroEnderecoPassageiro,
            complementoEnderecoPassageiro,
            bairroPassageiro,
            cidadePassageiro,
            estadoPassageiro,
            cepPassageiro,
            dataNascimentoPassageiro: dataFormatada,
            senhaPassageiro

          })

        }
      );

      const texto = await response.text();

      console.log(texto);

      window.alert(texto);;

      setNomeCompletoPassageiro('');
      setCpfPassageiro('');
      setTelefonePassageiro('');
      setEmailPassageiro('');
      setRuaPassageiro('');
      setComplementoEnderecoPassageiro('');
      setNumeroEnderecoPassageiro('');
      setBairroPassageiro('');
      setCidadePassageiro('');
      setEstadoPassageiro('');
      setCepPassageiro('');
      setDataNascimentoPassageiro('');
      setSenhaPassageiro('');

      navigation.navigate('HomePassageiro', { nome: nomeCompletoPassageiro });

    } catch (error) {

      console.log(error);

      window.alert('Erro: Não foi possível conectar ao servidor');
      

    }

  }

  return (

    <View style={styles.container}>

      <ImageBackground
        source={require('../../../assets/backgroundCadastroGoTogether.png')}
        style={styles.backgroundImage}
        resizeMode="stretch"
      >

      <ScrollView
        style={styles.overlay}
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >

        <Text style={styles.title}>
          Vamos começar?
        </Text>

        <Text style={styles.subtitle}>
          Preencha seus dados:
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nome Completo"
          placeholderTextColor="#7D9BE6"
          value={nomeCompletoPassageiro}
          onChangeText={setNomeCompletoPassageiro}
        />

        <TextInput
          style={styles.input}
          placeholder="CPF"
          placeholderTextColor="#7D9BE6"
          value={cpfPassageiro}
          onChangeText={(texto) => setCpfPassageiro(mascaraCPF(texto))}
        />

        <TextInput
          style={styles.input}
          placeholder="Telefone"
          placeholderTextColor="#7D9BE6"
          value={telefonePassageiro}
          onChangeText={(texto) => setTelefonePassageiro(mascaraTelefone(texto))}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#7D9BE6"
          value={emailPassageiro}
          onChangeText={setEmailPassageiro}
        />

        <TextInput
          style={styles.input}
          placeholder="Rua"
          placeholderTextColor="#7D9BE6"
          value={ruaPassageiro}
          onChangeText={setRuaPassageiro}
        />

        <TextInput
          style={styles.input}
          placeholder="Complemento"
          placeholderTextColor="#7D9BE6"
          value={complementoEnderecoPassageiro}
          onChangeText={setComplementoEnderecoPassageiro}
        />

        <TextInput
          style={styles.input}
          placeholder="Número"
          placeholderTextColor="#7D9BE6"
          value={numeroEnderecoPassageiro}
          onChangeText={setNumeroEnderecoPassageiro}
        />

        <TextInput
          style={styles.input}
          placeholder="Bairro"
          placeholderTextColor="#7D9BE6"
          value={bairroPassageiro}
          onChangeText={setBairroPassageiro}
        />

        <TextInput
          style={styles.input}
          placeholder="Cidade"
          placeholderTextColor="#7D9BE6"
          value={cidadePassageiro}
          onChangeText={setCidadePassageiro}
        />

        <TextInput
          style={styles.input}
          placeholder="Estado"
          placeholderTextColor="#7D9BE6"
          value={estadoPassageiro}
          onChangeText={setEstadoPassageiro}
        />

        <TextInput
          style={styles.input}
          placeholder="CEP"
          placeholderTextColor="#7D9BE6"
          value={cepPassageiro}
          onChangeText={(texto) => setCepPassageiro(mascaraCEP(texto))}
        />

        <TextInput
          style={styles.input}
          placeholder="(DD/MM/AAAA)"
          placeholderTextColor="#7D9BE6"
          value={dataNascimentoPassageiro}
          onChangeText={(texto) => setDataNascimentoPassageiro(mascaraData(texto))}
        />

        <View style={styles.inputContainer}>

          <TextInput
            style={styles.inputSenha}
            placeholder="Senha"
            placeholderTextColor="#7D9BE6"
            value={senhaPassageiro}
            onChangeText={setSenhaPassageiro}
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
          style={styles.button}
          onPress={cadastrar}
        >

          <Text style={styles.buttonText}>
            Cadastrar
          </Text>

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

      </ScrollView>

      </ImageBackground>
    </View>

  );
}