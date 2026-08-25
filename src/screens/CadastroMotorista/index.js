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

export default function CadastroMotorista({ navigation }) {

  const [nomeCompletoMotorista, setNomeCompletoMotorista] = useState('');
  const [cnhMotorista, setCnhMotorista] = useState('');
  const [fotoCnhMotorista, setFotoCnhMotorista] = useState('');
  const [telefoneMotorista, setTelefoneMotorista] = useState('');
  const [emailMotorista, setEmailMotorista] = useState('');
  const [ruaMotorista, setRuaMotorista] = useState('');
  const [complementoEnderecoMotorista, setComplementoEnderecoMotorista] = useState('');
  const [numeroEnderecoMotorista, setNumeroEnderecoMotorista] = useState('');
  const [bairroMotorista, setBairroMotorista] = useState('');
  const [cidadeMotorista, setCidadeMotorista] = useState('');
  const [estadoMotorista, setEstadoMotorista] = useState('');
  const [cepMotorista, setCepMotorista] = useState('');
  const [dataNascimentoMotorista, setDataNascimentoMotorista] = useState('');
  const [pixMotorista, setPixMotorista] = useState('');
  const [senhaMotorista, setSenhaMotorista] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  function mascaraData(texto) {
    const numeros = texto.replace(/\D/g, '');
    if (numeros.length <= 2) return numeros;
    if (numeros.length <= 4) return `${numeros.slice(0, 2)}/${numeros.slice(2)}`;
    return `${numeros.slice(0, 2)}/${numeros.slice(2, 4)}/${numeros.slice(4, 8)}`;
  }

   function mascaraTelefone(texto) {
    const numeros = texto.replace(/\D/g, '');
    if (numeros.length <= 2) return `(${numeros}`;
    if (numeros.length <= 7) return `(${numeros.slice(0,2)}) ${numeros.slice(2)}`;
    return `(${numeros.slice(0,2)}) ${numeros.slice(2,7)}-${numeros.slice(7,11)}`;
  }

  function mascaraCEP(texto) {
    const numeros = texto.replace(/\D/g, '');
    if (numeros.length <= 5) return numeros;
    return `${numeros.slice(0,5)}-${numeros.slice(5,8)}`;
  }

  async function cadastrar() {

    if (
      nomeCompletoMotorista == "" ||
      cnhMotorista == "" ||
      fotoCnhMotorista == "" ||
      telefoneMotorista == "" ||
      emailMotorista == "" ||
      ruaMotorista == "" ||
      numeroEnderecoMotorista == "" ||
      bairroMotorista == "" ||
      cidadeMotorista == "" ||
      estadoMotorista == "" ||
      cepMotorista == "" ||
      dataNascimentoMotorista == "" ||
      pixMotorista == "" ||
      senhaMotorista == ""
    ) {

      window.alert('Atenção, há campos não preenchidos');
      return;
    }

    try {

      console.log('Enviando cadastro do motorista...');

      const [dia, mes, ano] = dataNascimentoMotorista.split('/');
      const dataFormatada = `${ano}-${mes}-${dia}`;

      const response = await fetch(
        'http://localhost/appTcc/salvarMotorista.php',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({

            nomeCompletoMotorista,
            cnhMotorista,
            fotoCnhMotorista,
            telefoneMotorista,
            emailMotorista,
            ruaMotorista,
            numeroEnderecoMotorista,
            complementoEnderecoMotorista,
            bairroMotorista,
            cidadeMotorista,
            estadoMotorista,
            cepMotorista,
            dataNascimentoMotorista : dataFormatada,
            pixMotorista,
            senhaMotorista

          })
        }
      );

      console.log('Status HTTP:', response.status);

      const texto = await response.text();

      console.log('Resposta do PHP:', texto);

      let data;

      try {

        data = JSON.parse(texto);

      } catch (erro) {

        console.log('PHP não retornou JSON válido!');
        console.log(texto);

        Alert.alert(
          'Erro no PHP',
          'O servidor não retornou uma resposta válida. Veja o console.'
        );

        return;
      }

      console.log('Dados recebidos:', data);

      if (data.sucesso) {

        const idMotorista = data.idMotorista;

        console.log('ID DO MOTORISTA:', idMotorista);

        navigation.navigate('CadastroCarro', {
          idMotorista: idMotorista,
          nomeMotorista: nomeCompletoMotorista
        });

      } else {

        Alert.alert(
          'Erro',
          data.mensagem
        );

      }

    } catch (error) {

      console.log('ERRO NO FETCH:', error);

      Alert.alert(
        'Erro',
        'Não foi possível conectar ao servidor.'
      );

    }
  }

  return (

    <View style={styles.container}>

      <ImageBackground
        source={require('../../../assets/backgroundCadastroGoTogether.png')}
        style={styles.backgroundImage}
        resizeMode='stretch'
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
            value={nomeCompletoMotorista}
            onChangeText={setNomeCompletoMotorista}
          />

          <TextInput
            style={styles.input}
            placeholder="CNH"
            placeholderTextColor="#7D9BE6"
            value={cnhMotorista}
            onChangeText={setCnhMotorista}
          />

          <TextInput
            style={styles.input}
            placeholder="Foto da CNH"
            placeholderTextColor="#7D9BE6"
            value={fotoCnhMotorista}
            onChangeText={setFotoCnhMotorista}
          />

          <TextInput
            style={styles.input}
            placeholder="Telefone"
            placeholderTextColor="#7D9BE6"
            value={telefoneMotorista}
            onChangeText={(texto) => setTelefoneMotorista(mascaraTelefone(texto))}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#7D9BE6"
            value={emailMotorista}
            onChangeText={setEmailMotorista}
          />

          <TextInput
            style={styles.input}
            placeholder="Rua"
            placeholderTextColor="#7D9BE6"
            value={ruaMotorista}
            onChangeText={setRuaMotorista}
          />

          <TextInput
            style={styles.input}
            placeholder="Complemento"
            placeholderTextColor="#7D9BE6"
            value={complementoEnderecoMotorista}
            onChangeText={setComplementoEnderecoMotorista}
          />

          <TextInput
            style={styles.input}
            placeholder="Número"
            placeholderTextColor="#7D9BE6"
            value={numeroEnderecoMotorista}
            onChangeText={setNumeroEnderecoMotorista}
          />

          <TextInput
            style={styles.input}
            placeholder="Bairro"
            placeholderTextColor="#7D9BE6"
            value={bairroMotorista}
            onChangeText={setBairroMotorista}
          />

          <TextInput
            style={styles.input}
            placeholder="Cidade"
            placeholderTextColor="#7D9BE6"
            value={cidadeMotorista}
            onChangeText={setCidadeMotorista}
          />

          <TextInput
            style={styles.input}
            placeholder="Estado"
            placeholderTextColor="#7D9BE6"
            value={estadoMotorista}
            onChangeText={setEstadoMotorista}
          />

          <TextInput
            style={styles.input}
            placeholder="CEP"
            placeholderTextColor="#7D9BE6"
            value={cepMotorista}
            onChangeText={(texto) => setCepMotorista(mascaraCEP(texto))}
          />

          <TextInput
            style={styles.input}
            placeholder="(DD/MM/AAAA)"
            placeholderTextColor="#7D9BE6"
            value={dataNascimentoMotorista}
            onChangeText={(texto) => setDataNascimentoMotorista(mascaraData(texto))}
          />

          <TextInput
            style={styles.input}
            placeholder="Pix do motorista"
            placeholderTextColor="#7D9BE6"
            value={pixMotorista}
            onChangeText={setPixMotorista}
          />

          <View style={styles.inputContainer}>

            <TextInput
              style={styles.inputSenha}
              placeholder="Senha"
              placeholderTextColor="#7D9BE6"
              value={senhaMotorista}
              onChangeText={setSenhaMotorista}
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
              Continuar
            </Text>

          </TouchableOpacity>

          <View style={styles.containerLogar}>

            <Text style={styles.textLogar}>
              Já tem uma conta?
            </Text>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('LoginPassageiro') //mudar!!!!
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