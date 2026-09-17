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
import * as ImagePicker from 'expo-image-picker';

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
    if (numeros.length <= 7) return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7, 11)}`;
  }

  function mascaraCEP(texto) {
    const numeros = texto.replace(/\D/g, '');
    if (numeros.length <= 5) return numeros;
    return `${numeros.slice(0, 5)}-${numeros.slice(5, 8)}`;
  }

  async function escolherFotoCnh() {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!resultado.canceled) {
      setFotoCnhMotorista(resultado.assets[0].uri);
    }
  }

  async function tirarFotoCnh() {
    const resultado = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!resultado.canceled) {
      setFotoCnhMotorista(resultado.assets[0].uri);
    }
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

            // A foto será salva depois pelo uploadCnh.php
            fotoCnhMotorista: null,

            telefoneMotorista,
            emailMotorista,

            ruaMotorista,
            numeroEnderecoMotorista,
            complementoEnderecoMotorista,

            bairroMotorista,
            cidadeMotorista,
            estadoMotorista,
            cepMotorista,

            dataNascimentoMotorista: dataFormatada,

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

      if (!data.sucesso) {

        Alert.alert(
          'Erro',
          data.mensagem
        );

        return;
      }

      const idMotorista = data.idMotorista;

      console.log('ID DO MOTORISTA:', idMotorista);


      console.log('Preparando foto da CNH...');

      const responseImage = await fetch(fotoCnhMotorista);

      const blob = await responseImage.blob();

      const nomeArquivo = `cnh_${Date.now()}.jpg`;

      const formData = new FormData();

      formData.append(
        'photo',
        blob,
        nomeArquivo
      );

      formData.append(
        'idMotorista',
        idMotorista.toString()
      );

      console.log('Enviando foto da CNH...');


      const responseFoto = await fetch(
        'http://localhost/appTcc/uploadCnh.php',
        {
          method: 'POST',
          body: formData,
        }
      );

      console.log(
        'Status upload:',
        responseFoto.status
      );

      const textoFoto = await responseFoto.text();

      console.log(
        'Resposta do upload:',
        textoFoto
      );

      let resultadoFoto;

      try {

        resultadoFoto = JSON.parse(textoFoto);

      } catch (erro) {

        console.log(
          'Upload não retornou JSON válido!'
        );

        Alert.alert(
          'Erro',
          'O servidor não retornou uma resposta válida ao enviar a foto.'
        );

        return;
      }

      if (!resultadoFoto.sucesso) {

        Alert.alert(
          'Erro ao enviar CNH',
          resultadoFoto.mensagem
        );

        return;
      }

      console.log(
        'Foto da CNH enviada com sucesso!'
      );

      Alert.alert(
        'Sucesso!',
        'Motorista cadastrado e foto da CNH enviada.'
      );

      navigation.navigate('CadastroCarro', {
        idMotorista: idMotorista,
        nomeMotorista: nomeCompletoMotorista
      });


    } catch (error) {

      console.log(
        'ERRO NO CADASTRO:',
        error
      );

      Alert.alert(
        'Erro',
        'Não foi possível concluir o cadastro. Verifique sua conexão com o servidor.'
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

          <View style={styles.stepsContainer}>

            <View style={styles.line} />

            <View style={styles.stepsRow}>

              <View style={styles.stepWrapper}>

                <View style={styles.stepActive}>
                  <Text style={styles.stepTextActive}>1</Text>
                </View>

                <Text style={styles.stepLabelActive}>
                  Dados pessoais
                </Text>

              </View>

              <View style={styles.stepWrapper}>

                <View style={styles.stepInactive}>
                  <Text style={styles.stepTextInactive}>2</Text>
                </View>

                <Text style={styles.stepLabelInactive}>
                  Informações adicionais
                </Text>

              </View>

            </View>

          </View>

          <View style={styles.containerInput}>

            <TextInput
              style={styles.input}
              placeholder="Nome Completo"
              placeholderTextColor="#7D9BE6"
              value={nomeCompletoMotorista}
              onChangeText={setNomeCompletoMotorista}
            />

            <View style={styles.row}>

              <TextInput
                placeholder="CNH"
                value={cnhMotorista}
                onChangeText={setCnhMotorista}
                style={styles.inputHalfLeft}
              />

              <TouchableOpacity
                style={styles.inputHalfRight}
                onPress={escolherFotoCnh}
              >
                <Ionicons
                  name="image-outline"
                  size={20}
                  color="#4D6CB3"
                />

                <Text style={styles.fotoButtonText}>
                  {fotoCnhMotorista
                    ? 'CNH selecionada'
                    : 'Foto da CNH'}
                </Text>
              </TouchableOpacity>

            </View>

            {fotoCnhMotorista && (
              <Image
                source={{ uri: fotoCnhMotorista }}
                style={{
                  width: '100%',
                  height: 100,
                  borderRadius: 10,
                  marginBottom: 15,
                }}
              />
            )}

            <View style={styles.row}>

              <TextInput
                style={styles.inputHalfLeft}
                placeholder="Telefone"
                placeholderTextColor="#7D9BE6"
                value={telefoneMotorista}
                onChangeText={(texto) =>
                  setTelefoneMotorista(mascaraTelefone(texto))
                }
              />

              <TextInput
                style={styles.inputHalfRight}
                placeholder="Email"
                placeholderTextColor="#7D9BE6"
                value={emailMotorista}
                onChangeText={setEmailMotorista}
              />

            </View>

            <TextInput
              style={styles.input}
              placeholder="Rua"
              placeholderTextColor="#7D9BE6"
              value={ruaMotorista}
              onChangeText={setRuaMotorista}
            />

            <View style={styles.row}>

              <TextInput
                style={styles.inputHalfLeft}
                placeholder="Complemento"
                placeholderTextColor="#7D9BE6"
                value={complementoEnderecoMotorista}
                onChangeText={setComplementoEnderecoMotorista}
              />

              <TextInput
                style={styles.inputHalfRight}
                placeholder="Número"
                placeholderTextColor="#7D9BE6"
                value={numeroEnderecoMotorista}
                onChangeText={setNumeroEnderecoMotorista}
              />

            </View>

            <TextInput
              style={styles.input}
              placeholder="Bairro"
              placeholderTextColor="#7D9BE6"
              value={bairroMotorista}
              onChangeText={setBairroMotorista}
            />

            <View style={styles.row}>

              <TextInput
                style={styles.inputHalfLeft}
                placeholder="Cidade"
                placeholderTextColor="#7D9BE6"
                value={cidadeMotorista}
                onChangeText={setCidadeMotorista}
              />

              <TextInput
                style={styles.inputHalfRight}
                placeholder="Estado"
                placeholderTextColor="#7D9BE6"
                value={estadoMotorista}
                onChangeText={setEstadoMotorista}
              />

            </View>

            <TextInput
              style={styles.input}
              placeholder="CEP"
              placeholderTextColor="#7D9BE6"
              value={cepMotorista}
              onChangeText={(texto) =>
                setCepMotorista(mascaraCEP(texto))
              }
            />

            <TextInput
              style={styles.input}
              placeholder="Data de nascimento"
              placeholderTextColor="#7D9BE6"
              value={dataNascimentoMotorista}
              onChangeText={(texto) =>
                setDataNascimentoMotorista(mascaraData(texto))
              }
            />

            <TextInput
              style={styles.input}
              placeholder="PIX"
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
                  size={22}
                  color="#6C92E6"
                />
              </TouchableOpacity>
            </View>

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
                navigation.navigate('Login')
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