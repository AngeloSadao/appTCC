import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  Alert,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

import styles from './style';

export default function EditarPerfilPassageiro({ navigation, route }) {

  const idPassageiro = route.params?.idPassageiro;

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');

  const [rua, setRua] = useState('');
  const [complemento, setComplemento] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cep, setCep] = useState('');

  const [foto, setFoto] = useState(null);

  useEffect(() => {
    buscarDados();
  }, []);

  async function buscarDados() {
    try {
      console.log('Buscando passageiro:', idPassageiro);

      const response = await fetch(
        'http://localhost/appTcc/buscarPassageiro.php',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idPassageiro: idPassageiro,
          }),
        }
      );

      const dados = await response.json();

      console.log('Dados do passageiro:', dados);

      if (dados.sucesso) {
        const passageiro = dados.passageiro;

        setNome(passageiro.nomeCompletoPassageiro || '');
        setTelefone(passageiro.telefonePassageiro || '');
        setEmail(passageiro.emailPassageiro || '');

        setRua(passageiro.ruaPassageiro || '');
        setComplemento(passageiro.complementoEnderecoPassageiro || '');
        setNumero(passageiro.numeroEnderecoPassageiro || '');
        setBairro(passageiro.bairroPassageiro || '');
        setCidade(passageiro.cidadePassageiro || '');
        setEstado(passageiro.estadoPassageiro || '');
        setCep(passageiro.cepPassageiro || '');

        if (passageiro.fotoPerfilPassageiro) {
          setFoto(
            `http://localhost/appTcc/img/perfil/${passageiro.fotoPerfilPassageiro}`
          );
        }
      } else {
        Alert.alert('Erro', dados.mensagem);
      }

    } catch (error) {
      console.log('Erro ao buscar passageiro:', error);
      Alert.alert(
        'Erro',
        'Não foi possível carregar os dados do perfil.'
      );
    }
  }

  async function escolherFoto() {

    const permissao =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissao.granted) {
      Alert.alert(
        'Permissão necessária',
        'Precisamos de acesso à sua galeria para escolher uma foto.'
      );
      return;
    }

    const resultado =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

    if (!resultado.canceled) {
      const imagemSelecionada = resultado.assets[0].uri;

      console.log('Foto selecionada:', imagemSelecionada);

      setFoto(imagemSelecionada);
    }
  }

  async function salvarAlteracoes() {

    if (!nome || !telefone || !email) {
      Alert.alert(
        'Atenção',
        'Preencha os campos obrigatórios.'
      );
      return;
    }

    try {

      console.log('ID DO PASSAGEIRO:', idPassageiro);
      const response = await fetch(
        'http://localhost/appTcc/editarPassageiro.php',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({

            idPassageiro: idPassageiro,

            nomeCompletoPassageiro: nome,
            telefonePassageiro: telefone,
            emailPassageiro: email,

            ruaPassageiro: rua,
            numeroEnderecoPassageiro: numero,
            complementoEnderecoPassageiro: complemento,
            bairroPassageiro: bairro,
            cidadePassageiro: cidade,
            estadoPassageiro: estado,
            cepPassageiro: cep,

          }),
        }
      );

      const dados = await response.json();

      console.log('Resposta editar passageiro:', dados);

      if (!dados.sucesso) {
        Alert.alert('Erro', dados.mensagem);
        return;
      }


      if (foto && !foto.startsWith('http')) {

        console.log('Enviando foto:', foto);

        const respostaImagem = await fetch(foto);

        const blob = await respostaImagem.blob();

        const formData = new FormData();

        formData.append('idPassageiro', String(idPassageiro));

        formData.append(
          'photo',
          blob,
          `perfil_${idPassageiro}.jpg`
        );

        console.log('FormData criado');

        const responseFoto = await fetch(
          'http://localhost/appTcc/uploadFotoPerfil.php',
          {
            method: 'POST',
            body: formData,
          }
        );

        const dadosFoto = await responseFoto.json();

        console.log('Resposta foto:', dadosFoto);

        if (!dadosFoto.sucesso) {

          Alert.alert(
            'Atenção',
            'Os dados foram atualizados, mas houve um erro ao enviar a foto.'
          );

          return;
        }
      }

      Alert.alert(
        'Sucesso',
        'Perfil atualizado com sucesso!'
      );

      navigation.goBack();

    } catch (error) {

      console.log('Erro ao salvar perfil:', error);

      Alert.alert(
        'Erro',
        'Não foi possível atualizar o perfil.'
      );
    }
  }

  return (
    <View style={styles.container}>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >

        <ImageBackground
          source={require('../../../assets/backgroundCadastroGoTogether.png')}
          style={styles.backgroundImage}
          resizeMode="stretch"
        >
        </ImageBackground>

        <View style={styles.titleArea}>

          <Text style={styles.title}>
            Editar perfil
          </Text>

          <Text style={styles.subtitle}>
            Atualize suas informações
          </Text>

        </View>

        <TouchableOpacity
          style={styles.fotoContainer}
          onPress={escolherFoto}
        >

          {foto ? (
            <Image
              source={{ uri: foto }}
              style={styles.foto}
            />
          ) : (
            <View style={styles.fotoVazia}>
              <Ionicons
                name="person-outline"
                size={55}
                color="#435E91"
              />
            </View>
          )}

          <View style={styles.camera}>
            <Ionicons
              name="camera-outline"
              size={22}
              color="#fff"
            />
          </View>

        </TouchableOpacity>

        <Text style={styles.fotoTexto}>
          Toque para alterar a foto
        </Text>


        <View style={styles.containerInput}>

          <Text style={styles.label}>
            Nome completo
          </Text>

          <View style={styles.input}>

            <TextInput
              style={styles.inputText}
              value={nome}
              onChangeText={setNome}
              placeholder="Nome completo"
            />
          </View>


          <Text style={styles.label}>
            Telefone
          </Text>

          <View style={styles.input}>

            <TextInput
              style={styles.inputText}
              value={telefone}
              onChangeText={setTelefone}
              placeholder="Telefone"
              keyboardType="phone-pad"
            />
          </View>


          <Text style={styles.label}>
            E-mail
          </Text>

          <View style={styles.input}>
            <TextInput
              style={styles.inputText}
              value={email}
              onChangeText={setEmail}
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <Text style={styles.sectionTitle}>
            Endereço
          </Text>


          <Text style={styles.label}>
            Rua
          </Text>

          <View style={styles.input}>
            <TextInput
              style={styles.inputText}
              value={rua}
              onChangeText={setRua}
              placeholder="Rua"
            />
          </View>


          <Text style={styles.label}>
            Complemento
          </Text>

          <View style={styles.input}>
            <TextInput
              style={styles.inputText}
              value={complemento}
              onChangeText={setComplemento}
              placeholder="Complemento"
            />
          </View>


          <Text style={styles.label}>
            Número
          </Text>

          <View style={styles.input}>
            <TextInput
              style={styles.inputText}
              value={numero}
              onChangeText={setNumero}
              placeholder="Número"
              keyboardType="numeric"
            />
          </View>


          <Text style={styles.label}>
            Bairro
          </Text>

          <View style={styles.input}>
            <TextInput
              style={styles.inputText}
              value={bairro}
              onChangeText={setBairro}
              placeholder="Bairro"
            />
          </View>


          <Text style={styles.label}>
            Cidade
          </Text>

          <View style={styles.input}>
            <TextInput
              style={styles.inputText}
              value={cidade}
              onChangeText={setCidade}
              placeholder="Cidade"
            />
          </View>


          <Text style={styles.label}>
            Estado
          </Text>

          <View style={styles.input}>
            <TextInput
              style={styles.inputText}
              value={estado}
              onChangeText={setEstado}
              placeholder="Estado"
            />
          </View>


          <Text style={styles.label}>
            CEP
          </Text>

          <View style={styles.input}>
            <TextInput
              style={styles.inputText}
              value={cep}
              onChangeText={setCep}
              placeholder="CEP"
              keyboardType="numeric"
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={salvarAlteracoes}
        >
          <Text style={styles.buttonText}>
            Salvar alterações
          </Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelText}>
            Cancelar
          </Text>
        </TouchableOpacity>

      </ScrollView>

    </View>
  );
}