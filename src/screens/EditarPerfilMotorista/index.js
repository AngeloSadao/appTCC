import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

import styles from './style';

export default function EditarPerfilMotorista({ navigation, route }) {

  const idMotorista = route.params?.idMotorista;

  const [nome, setNome] = useState('');
  const [cnh, setCnh] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');

  const [rua, setRua] = useState('');
  const [complemento, setComplemento] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cep, setCep] = useState('');

  const [dataNascimento, setDataNascimento] = useState('');
  const [pix, setPix] = useState('');

  const [foto, setFoto] = useState(null);

  useEffect(() => {
    if (idMotorista) {
      buscarDados();
    }
  }, [idMotorista]);

  async function buscarDados() {

    if (!idMotorista) {
      console.log('ID do motorista não informado.');
      return;
    }

    try {

      console.log('Buscando motorista:', idMotorista);

      const response = await fetch(
        'http://localhost/appTcc/buscarMotorista.php',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idMotorista: idMotorista,
          }),
        }
      );

      const dados = await response.json();

      console.log('Dados do motorista:', dados);

      if (dados.sucesso) {

        const motorista = dados.motorista;

        setNome(motorista.nomeCompletoMotorista || '');
        setCnh(motorista.cnhMotorista || '');
        setTelefone(motorista.telefoneMotorista || '');
        setEmail(motorista.emailMotorista || '');

        setRua(motorista.ruaMotorista || '');
        setComplemento(
          motorista.complementoEnderecoMotorista || ''
        );
        setNumero(
          motorista.numeroEnderecoMotorista || ''
        );
        setBairro(
          motorista.bairroMotorista || ''
        );
        setCidade(
          motorista.cidadeMotorista || ''
        );
        setEstado(
          motorista.estadoMotorista || ''
        );
        setCep(
          motorista.cepMotorista || ''
        );

        setDataNascimento(
          formatarDataBanco(
            motorista.dataNascimentoMotorista || ''
          )
        );

        setPix(motorista.pixMotorista || '');

        if (motorista.fotoPerfilMotorista) {

          setFoto(
            `http://localhost/appTcc/img/perfilMotorista/${motorista.fotoPerfilMotorista}`
          );

        } else {

          setFoto(null);

        }

      } else {

        window.alert(
          dados.mensagem ||
          'Não foi possível carregar os dados do motorista.'
        );

      }

    } catch (error) {

      console.log(
        'Erro ao buscar motorista:',
        error
      );

      window.alert(
        'Não foi possível carregar os dados do perfil.'
      );
    }
  }

  function formatarDataBanco(data) {

    if (!data) {
      return '';
    }

    if (data.includes('-')) {

      const partes = data.split('-');

      if (partes.length === 3) {
        return `${partes[2]}/${partes[1]}/${partes[0]}`;
      }
    }

    return data;
  }

  function formatarDataParaBanco(data) {

    if (!data) {
      return '';
    }

    if (data.includes('/')) {

      const partes = data.split('/');

      if (partes.length === 3) {
        return `${partes[2]}-${partes[1]}-${partes[0]}`;
      }
    }

    return data;
  }

  async function escolherFoto() {

    const permissao =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissao.granted) {

      window.alert(
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

      const imagemSelecionada =
        resultado.assets[0].uri;

      setFoto(imagemSelecionada);
    }
  }

  async function enviarFoto() {

    if (!foto || foto.startsWith('http')) {
      return true;
    }

    try {

      const respostaImagem =
        await fetch(foto);

      const blob =
        await respostaImagem.blob();

      const formData =
        new FormData();

      formData.append(
        'idMotorista',
        String(idMotorista)
      );

      formData.append(
        'photo',
        blob,
        `perfil_${idMotorista}.jpg`
      );

      const responseFoto =
        await fetch(
          'http://localhost/appTcc/uploadFotoPerfilMotorista.php',
          {
            method: 'POST',
            body: formData,
          }
        );

      const dadosFoto =
        await responseFoto.json();

      console.log(
        'Resposta foto:',
        dadosFoto
      );

      if (!dadosFoto.sucesso) {

        window.alert(
          dadosFoto.mensagem ||
          'Os dados foram atualizados, mas houve um erro ao enviar a foto.'
        );

        return false;
      }

      return true;

    } catch (error) {

      console.log(
        'Erro ao enviar foto:',
        error
      );

      window.alert(
        'Os dados foram atualizados, mas houve um erro ao enviar a foto.'
      );

      return false;
    }
  }

  async function salvarAlteracoes() {

    if (!idMotorista) {

      window.alert(
        'Não foi possível identificar o motorista.'
      );

      return;
    }

    try {

      console.log(
        'ID DO MOTORISTA:',
        idMotorista
      );

      const response =
        await fetch(
          'http://localhost/appTcc/editarMotorista.php',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({

              idMotorista: idMotorista,

              nomeCompletoMotorista: nome,
              cnhMotorista: cnh,
              telefoneMotorista: telefone,
              emailMotorista: email,

              ruaMotorista: rua,
              complementoEnderecoMotorista:
                complemento,
              numeroEnderecoMotorista:
                numero,
              bairroMotorista:
                bairro,
              cidadeMotorista:
                cidade,
              estadoMotorista:
                estado,
              cepMotorista:
                cep,

              dataNascimentoMotorista:
                formatarDataParaBanco(
                  dataNascimento
                ),

              pixMotorista: pix,

            }),
          }
        );

      const dados =
        await response.json();

      console.log(
        'Resposta editar motorista:',
        dados
      );

      if (!dados.sucesso) {

        window.alert(
          dados.mensagem ||
          'Não foi possível atualizar o perfil.'
        );

        return;
      }

      const fotoEnviada =
        await enviarFoto();

      if (!fotoEnviada) {
        return;
      }

      navigation.goBack();

    } catch (error) {

      console.log(
        'Erro ao salvar perfil:',
        error
      );

      window.alert(
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
          resizeMode="cover"
        />

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

          <Text style={styles.label}>
            Data de nascimento
          </Text>

          <View style={styles.input}>
            <TextInput
              style={styles.inputText}
              value={dataNascimento}
              onChangeText={setDataNascimento}
              placeholder="DD/MM/AAAA"
              keyboardType="numeric"
            />
          </View>

          <Text style={styles.label}>
            CNH
          </Text>

          <View style={styles.input}>
            <TextInput
              style={styles.inputText}
              value={cnh}
              onChangeText={setCnh}
              placeholder="Número da CNH"
              keyboardType="numeric"
            />
          </View>

          <Text style={styles.label}>
            Chave Pix
          </Text>

          <View style={styles.input}>
            <TextInput
              style={styles.inputText}
              value={pix}
              onChangeText={setPix}
              placeholder="Chave Pix"
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
          style={styles.button}
          onPress={() =>
            navigation.navigate('EditarCarro', {
              idMotorista: idMotorista,
            })
          }
        >
          <Text style={styles.buttonText}>
            Editar carro
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