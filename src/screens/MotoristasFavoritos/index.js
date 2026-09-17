import React, { useCallback, useState } from 'react';

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from 'react-native';

import {
  useFocusEffect,
  useNavigation,
  DrawerActions
} from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';

import styles from './style';

const API_URL = 'http://localhost/appTcc';

export default function MotoristasFavoritos({ route }) {

  const navigation = useNavigation();

  const idPassageiro = route.params?.idPassageiro;

  const [motoristas, setMotoristas] = useState([]);
  const [telefone, setTelefone] = useState('');
  const [mostrarAdicionar, setMostrarAdicionar] = useState(false);

  async function buscarMotoristasFavoritos() {

    if (!idPassageiro) {
      return;
    }

    try {

      const resposta = await fetch(
        `${API_URL}/buscarMotoristasFavoritos.php?idPassageiro=${idPassageiro}`
      );

      const texto = await resposta.text();

      console.log('Motoristas favoritos:', texto);

      const dados = JSON.parse(texto);

      if (dados.sucesso) {

        setMotoristas(dados.motoristas || []);

      } else {

        window.alert(
          dados.mensagem || 'Não foi possível carregar os favoritos.'
        );

      }

    } catch (erro) {

      console.log(
        'Erro ao buscar favoritos:',
        erro
      );

      window.alert(
        'Não foi possível carregar os motoristas favoritos.'
      );
    }
  }

  useFocusEffect(
    useCallback(() => {
      buscarMotoristasFavoritos();
    }, [idPassageiro])
  );

  function formatarTelefone(numero) {

    if (!numero) {
      return '';
    }

    const numeros = String(numero).replace(/\D/g, '');

    if (numeros.length === 11) {

      return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;

    }

    if (numeros.length === 10) {

      return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;

    }

    return numero;
  }

  async function removerFavorito(idMotorista) {

    try {

      const resposta = await fetch(
        `${API_URL}/removerMotoristaFavorito.php`,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            idPassageiro,
            idMotorista,
          }),
        }
      );

      const dados = await resposta.json();

      if (dados.sucesso) {

        setMotoristas(
          motoristas.filter(
            motorista =>
              motorista.idMotorista != idMotorista
          )
        );

      } else {

        window.alert(
          dados.mensagem ||
          'Não foi possível remover o motorista.'
        );

      }

    } catch (erro) {

      console.log(
        'Erro ao remover favorito:',
        erro
      );

      window.alert(
        'Não foi possível remover o motorista.'
      );
    }
  }

  function formatarTelefoneBusca(texto) {

    const numeros = texto
      .replace(/\D/g, '')
      .slice(0, 11);

    if (numeros.length <= 2) {
      return numeros;
    }

    if (numeros.length <= 7) {

      return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;

    }

    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
  }

  async function adicionarPorTelefone() {

    const telefoneLimpo = telefone.replace(/\D/g, '');

    if (telefoneLimpo.length !== 10 && telefoneLimpo.length !== 11) {

      window.alert(
        'Digite um número de telefone válido.'
      );

      return;
    }

    try {

      const resposta = await fetch(
        `${API_URL}/buscarMotoristaPorTelefone.php?telefone=${encodeURIComponent(telefoneLimpo)}`
      );

      const texto = await resposta.text();

      console.log(
        'Motorista encontrado:',
        texto
      );

      const dados = JSON.parse(texto);

      if (!dados.sucesso) {

        window.alert(
          dados.mensagem ||
          'Nenhum motorista encontrado.'
        );

        return;
      }

      const motorista = dados.motorista;

      const jaExiste = motoristas.some(
        item =>
          item.idMotorista == motorista.idMotorista
      );

      if (jaExiste) {

        window.alert(
          'Este motorista já está nos seus favoritos.'
        );

        return;
      }

      const respostaFavorito = await fetch(
        `${API_URL}/adicionarMotoristaFavorito.php`,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            idPassageiro,
            idMotorista: motorista.idMotorista,
          }),
        }
      );

      const dadosFavorito =
        await respostaFavorito.json();

      if (dadosFavorito.sucesso) {

        window.alert(
          'Motorista adicionado aos favoritos!'
        );

        setTelefone('');

        setMostrarAdicionar(false);

        buscarMotoristasFavoritos();

      } else {

        window.alert(
          dadosFavorito.mensagem ||
          'Não foi possível adicionar o motorista.'
        );
      }

    } catch (erro) {

      console.log(
        'Erro ao adicionar motorista:',
        erro
      );

      window.alert(
        'Não foi possível adicionar o motorista.'
      );
    }
  }

  function renderItem({ item }) {

    return (

      <View style={styles.card}>

        <View style={styles.fotoContainer}>

          {item.fotoPerfilMotorista ? (

            <img
              src={`${API_URL}/img/perfilMotorista/${item.fotoPerfilMotorista}`}
              style={styles.foto}
              alt=""
            />

          ) : (

            <Ionicons
              name="person-circle-outline"
              size={60}
              color="#7AC992"
            />

          )}

        </View>

        <View style={styles.informacoes}>

          <Text style={styles.nome}>
            {item.nomeCompletoMotorista}
          </Text>

          <View style={styles.linhaTelefone}>

            <Ionicons
              name="call-outline"
              size={14}
              color="#468B5B"
            />

            <Text style={styles.telefone}>
              {formatarTelefone(item.telefoneMotorista)}
            </Text>

          </View>

        </View>

        <TouchableOpacity
          style={styles.botaoFavorito}
          onPress={() =>
            removerFavorito(item.idMotorista)
          }
        >

          <Ionicons
            name="star"
            size={27}
            color="#468B5B"
          />

        </TouchableOpacity>

      </View>
    );
  }

  return (

    <View style={styles.container}>

      <ImageBackground
        source={require('../../../assets/backgroundGoTogether.png')}
        style={styles.background}
        resizeMode="stretch"
      >

        <View style={styles.titulosContainer}>

          <Text style={styles.title}>
            Motoristas
          </Text>

          <Text style={styles.title2}>
            favoritos
          </Text>

        </View>

        <View style={styles.menuContainer}>

          <TouchableOpacity
            style={styles.menuButton}
            onPress={() =>
              navigation.openDrawer()
            }
          >
            <Text style={styles.menuIcon}>
              ☰
            </Text>
          </TouchableOpacity>
          
        </View>

        <View style={styles.conteudo}>

          <TouchableOpacity
            style={styles.botaoAdicionar}
            onPress={() =>
              setMostrarAdicionar(!mostrarAdicionar)
            }
          >

            <Ionicons
              name="add-circle-outline"
              size={20}
              color="#FFFFFF"
            />

            <Text style={styles.textoBotaoAdicionar}>
              Adicionar motorista
            </Text>

          </TouchableOpacity>

          {mostrarAdicionar && (

            <View style={styles.adicionarContainer}>

              <Text style={styles.label}>
                Número de telefone do motorista:
              </Text>

              <TextInput
                style={styles.input}
                placeholder="(13) 99999-9999"
                value={telefone}
                onChangeText={texto =>
                  setTelefone(
                    formatarTelefoneBusca(texto)
                  )
                }
                keyboardType="numeric"
                maxLength={15}
              />

              <TouchableOpacity
                style={styles.botaoConfirmar}
                onPress={adicionarPorTelefone}
              >

                <Text style={styles.textoBotaoConfirmar}>
                  Adicionar
                </Text>

              </TouchableOpacity>

            </View>

          )}

          <View style={styles.listaContainer}>

            {motoristas.length === 0 ? (

              <View style={styles.vazio}>

                <Ionicons
                  name="star-outline"
                  size={50}
                  color="#AAAAAA"
                />

                <Text style={styles.vazioTitulo}>
                  Nenhum motorista favorito
                </Text>

                <Text style={styles.vazioTexto}>
                  Os motoristas que você favoritar
                  aparecerão aqui.
                </Text>

              </View>

            ) : (

              <FlatList
                data={motoristas}
                keyExtractor={item =>
                  String(item.idMotorista)
                }
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.lista}
              />

            )}

          </View>

        </View>

      </ImageBackground>

    </View>
  );
}