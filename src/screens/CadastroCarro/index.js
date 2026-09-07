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
import { Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function CadastroCarro({ navigation, route }) {

    const { idMotorista, nomeMotorista } = route.params;

    console.log('ID DO MOTORISTA RECEBIDO:', idMotorista);
    console.log('NOME DO MOTORISTA:', nomeMotorista);


    const [modeloCarro, setModeloCarro] = useState('');
    const [anoCarro, setAnoCarro] = useState('');
    const [placaCarro, setPlacaCarro] = useState('');
    const [corCarro, setCorCarro] = useState('');
    const [fotoCarro, setFotoCarro] = useState('');

    async function escolherFotoCarro() {

        const resultado = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!resultado.canceled) {

            setFotoCarro(resultado.assets[0].uri);

        }
    }

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
                        fotoCarro: null

                    })

                }
            );

            const data = await response.json();

            console.log('Resposta do servidor:', data);

            if (data.sucesso) {

                const idCarro = data.idCarro;

                console.log('ID DO CARRO:', idCarro);

                console.log('Preparando foto do carro...');

                const responseImage = await fetch(fotoCarro);

                const blob = await responseImage.blob();

                const nomeArquivo = `carro_${Date.now()}.jpg`;

                const formData = new FormData();

                formData.append(
                    'photo',
                    blob,
                    nomeArquivo
                );

                formData.append(
                    'idCarro',
                    idCarro.toString()
                );

                console.log('Enviando foto do carro...');

                const responseFoto = await fetch(
                    'http://localhost/appTcc/uploadCarro.php',
                    {
                        method: 'POST',
                        body: formData,
                    }
                );

                console.log(
                    'Status upload carro:',
                    responseFoto.status
                );

                const textoFoto = await responseFoto.text();

                console.log(
                    'Resposta do upload carro:',
                    textoFoto
                );

                let resultadoFoto;

                try {

                    resultadoFoto = JSON.parse(textoFoto);

                } catch (erro) {

                    console.log(
                        'Upload do carro não retornou JSON válido!'
                    );

                    Alert.alert(
                        'Erro',
                        'O servidor não retornou uma resposta válida ao enviar a foto do carro.'
                    );

                    return;
                }

                if (!resultadoFoto.sucesso) {

                    Alert.alert(
                        'Erro ao enviar foto',
                        resultadoFoto.mensagem
                    );

                    return;
                }

                console.log(
                    'Foto do carro enviada com sucesso!'
                );

                Alert.alert(
                    'Cadastro concluído!',
                    'Motorista e carro cadastrados com sucesso!'
                );

                navigation.navigate('HomePassageiro', {
                    nome: nomeMotorista
                });

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

                    <TouchableOpacity
                        style={styles.input}
                        onPress={escolherFotoCarro}
                    >

                        <Text style={{ color: '#7D9BE6' }}>
                            {fotoCarro
                                ? 'Foto do carro selecionada'
                                : 'Foto do carro'}
                        </Text>

                    </TouchableOpacity>

                    {fotoCarro && (
                        <Image
                            source={{ uri: fotoCarro }}
                            style={{
                                width: '100%',
                                height: 100,
                                borderRadius: 10,
                                marginBottom: 15,
                            }}
                        />
                    )}

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