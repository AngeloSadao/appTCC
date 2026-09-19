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

export default function EditarCarro({ navigation, route }) {

  const idMotorista = route.params?.idMotorista;

  const [idCarro, setIdCarro] = useState(null);
  const [modeloCarro, setModeloCarro] = useState('');
  const [anoCarro, setAnoCarro] = useState('');
  const [placaCarro, setPlacaCarro] = useState('');
  const [corCarro, setCorCarro] = useState('');
  const [fotoCarro, setFotoCarro] = useState(null);

  useEffect(() => {
    if (idMotorista) {
      buscarCarro();
    }
  }, [idMotorista]);

  async function buscarCarro() {
    if (!idMotorista) {
      console.log('ID do motorista não informado.');
      return;
    }

    try {
      const response = await fetch(
        'http://localhost/appTcc/buscarCarro.php',
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

      if (dados.sucesso) {
        const carro = dados.carro;

        setIdCarro(carro.idCarro);
        setModeloCarro(carro.modeloCarro || '');
        setAnoCarro(carro.anoCarro || '');
        setPlacaCarro(carro.placaCarro || '');
        setCorCarro(carro.corCarro || '');

        if (carro.fotoCarro) {
          setFotoCarro(
            `http://localhost/appTcc/uploads/carros/${carro.fotoCarro}`
          );
        } else {
          setFotoCarro(null);
        }
      } else {
        window.alert(
          dados.mensagem ||
          'Não foi possível carregar os dados do carro.'
        );
        navigation.goBack();
      }

    } catch (error) {
      console.log('Erro ao buscar carro:', error);
      window.alert(
        'Não foi possível carregar os dados do carro.'
      );
    }
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
        aspect: [4, 3],
        quality: 0.8,
      });

    if (!resultado.canceled) {
      setFotoCarro(resultado.assets[0].uri);
    }
  }

  async function enviarFoto() {
    if (!fotoCarro || fotoCarro.startsWith('http')) {
      return true;
    }

    if (!idCarro) {
      return false;
    }

    try {
      const respostaImagem = await fetch(fotoCarro);
      const blob = await respostaImagem.blob();

      const formData = new FormData();

      formData.append(
        'idCarro',
        String(idCarro)
      );

      formData.append(
        'photo',
        blob,
        `carro_${idCarro}.jpg`
      );

      const responseFoto = await fetch(
        'http://localhost/appTcc/uploadCarro.php',
        {
          method: 'POST',
          body: formData,
        }
      );

      const dadosFoto = await responseFoto.json();

      if (!dadosFoto.sucesso) {
        window.alert(
          dadosFoto.mensagem ||
          'Os dados foram atualizados, mas houve um erro ao enviar a foto.'
        );
        return false;
      }

      return true;

    } catch (error) {
      console.log('Erro ao enviar foto do carro:', error);

      window.alert(
        'Os dados foram atualizados, mas houve um erro ao enviar a foto.'
      );

      return false;
    }
  }

  async function salvarAlteracoes() {
    if (!idCarro) {
      window.alert(
        'Não foi possível identificar o carro.'
      );
      return;
    }

    try {
      const response = await fetch(
        'http://localhost/appTcc/editarCarro.php',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idCarro: idCarro,
            modeloCarro: modeloCarro,
            anoCarro: anoCarro,
            placaCarro: placaCarro,
            corCarro: corCarro,
          }),
        }
      );

      const dados = await response.json();

      if (!dados.sucesso) {
        window.alert(
          dados.mensagem ||
          'Não foi possível atualizar os dados do carro.'
        );
        return;
      }

      const fotoEnviada = await enviarFoto();

      if (!fotoEnviada) {
        return;
      }

      window.alert(
        dados.mensagem ||
        'Dados do carro atualizados com sucesso!'
      );

      navigation.goBack();

    } catch (error) {
      console.log('Erro ao salvar carro:', error);

      window.alert(
        'Não foi possível atualizar os dados do carro.'
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
            Editar carro
          </Text>

          <Text style={styles.subtitle}>
            Atualize as informações do veículo
          </Text>
        </View>

        <TouchableOpacity
          style={styles.fotoContainer}
          onPress={escolherFoto}
        >

          {fotoCarro ? (
            <Image
              source={{ uri: fotoCarro }}
              style={styles.foto}
            />
          ) : (
            <View style={styles.fotoVazia}>
              <Ionicons
                name="car-outline"
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
            Modelo do carro
          </Text>

          <View style={styles.input}>
            <TextInput
              style={styles.inputText}
              value={modeloCarro}
              onChangeText={setModeloCarro}
              placeholder="Modelo do carro"
            />
          </View>

          <Text style={styles.label}>
            Ano
          </Text>

          <View style={styles.input}>
            <TextInput
              style={styles.inputText}
              value={String(anoCarro)}
              onChangeText={setAnoCarro}
              placeholder="Ano"
              keyboardType="numeric"
            />
          </View>

          <Text style={styles.label}>
            Placa
          </Text>

          <View style={styles.input}>
            <TextInput
              style={styles.inputText}
              value={placaCarro}
              onChangeText={setPlacaCarro}
              placeholder="Placa"
              autoCapitalize="characters"
            />
          </View>

          <Text style={styles.label}>
            Cor
          </Text>

          <View style={styles.input}>
            <TextInput
              style={styles.inputText}
              value={corCarro}
              onChangeText={setCorCarro}
              placeholder="Cor"
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
