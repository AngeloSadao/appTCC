import React, { useState } from 'react';

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView,
} from 'react-native';

import styles from './style';
import { ImageBackground } from 'react-native-web';

export default function CadastroCarro({ navigation, route }) {

    const { idMotorista, nomeMotorista } = route.params;

    console.log('ID DO MOTORISTA RECEBIDO:', idMotorista);
    console.log('NOME DO MOTORISTA:', nomeMotorista);


    const [modeloCarro, setModeloCarro] = useState('');
    const [anoCarro, setAnoCarro] = useState('');
    const [placaCarro, setPlacaCarro] = useState('');
    const [corCarro, setCorCarro] = useState('');
    const [fotoCarro, setFotoCarro] = useState('');

    async function cadastrar() {

        if (
            modeloCarro == "" ||
            anoCarro == "" ||
            placaCarro == "" ||
            corCarro == "" ||
            fotoCarro == ""
        ) {

            Alert.alert(
                'Atenção, há campos não preenchidos'
            );

            return;
        }

        try {

            const response = await fetch(
                'http://localhost/appTcc/salvarCarro.php',
                {
                    method: 'POST',

                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },

                    body: JSON.stringify({

                        idMotorista: idMotorista,
                        modeloCarro: modeloCarro,
                        anoCarro: anoCarro,
                        placaCarro: placaCarro,
                        corCarro: corCarro,
                        fotoCarro: fotoCarro

                    })

                }
            );

            const data = await response.json();

            console.log('Resposta do servidor:', data);

            if (data.sucesso) {

                Alert.alert(
                    'Cadastro concluído!',
                    'Motorista e carro cadastrados com sucesso!'
                );

                navigation.navigate('HomePassageiro', { //trocar para homeMotorista após finalizada
                    nome: nomeMotorista
                });

            } else {

                Alert.alert(
                    'Erro',
                    data.mensagem
                );

            }

        } catch (error) {

            console.log(error);

            Alert.alert(
                'Erro',
                'Não foi possível conectar ao servidor'
            );

        }
    }

    return (

        <View style={styles.container}>

            <ImageBackground
                source={require('../../../assets/backgroundCadastroGoTogether.png')}
                style={styles.backgroundImage}
                resizeMode="cover"
            >

                <ScrollView
                    style={styles.overlay}
                    contentContainerStyle={{ paddingBottom: 30 }}
                    showsVerticalScrollIndicator={false}
                >

                    <Text style={styles.title}>
                        Continuação - Cadastre seu carro
                    </Text>

                    <Text style={styles.subtitle}>
                        Preencha os dados:
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Modelo"
                        placeholderTextColor="#7D9BE6"
                        value={modeloCarro}
                        onChangeText={setModeloCarro}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Ano do carro"
                        placeholderTextColor="#7D9BE6"
                        value={anoCarro}
                        onChangeText={setAnoCarro}
                        keyboardType="numeric"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Placa"
                        placeholderTextColor="#7D9BE6"
                        value={placaCarro}
                        onChangeText={setPlacaCarro}
                        autoCapitalize="characters"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Cor"
                        placeholderTextColor="#7D9BE6"
                        value={corCarro}
                        onChangeText={setCorCarro}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Foto do carro"
                        placeholderTextColor="#7D9BE6"
                        value={fotoCarro}
                        onChangeText={setFotoCarro}
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={cadastrar}
                    >

                        <Text style={styles.buttonText}>
                            Cadastrar
                        </Text>

                    </TouchableOpacity>

                </ScrollView>

            </ImageBackground>

        </View>
    );
}