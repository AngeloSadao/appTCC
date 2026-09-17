
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    ActivityIndicator,
    Image,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import styles from './style';

const API_URL = 'http://localhost/appTcc';

export default function EnvioGorjeta({ route }) {
    const navigation = useNavigation();

    const {
        idCorrida,
        idCarona,
        idMotorista,
        idPassageiro,
        nomePassageiro,
        valorGorjeta,
        avaliacao,
    } = route.params || {};

    const [motorista, setMotorista] = useState(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        buscarMotorista();
    }, [idMotorista]);

    async function buscarMotorista() {
        if (!idMotorista) {
            setCarregando(false);
            return;
        }

        try {
            const resposta = await fetch(
                `${API_URL}/buscarMotoristaGorjeta.php?idMotorista=${idMotorista}`
            );

            const texto = await resposta.text();

            console.log(
                'Resposta buscar motorista:',
                texto
            );

            const dados = JSON.parse(texto);

            if (dados.sucesso) {
                setMotorista(dados.motorista);
            } else {
                window.alert(
                    dados.mensagem ||
                    'Não foi possível carregar os dados do motorista.'
                );
            }

        } catch (erro) {
            console.log(
                'Erro ao buscar motorista:',
                erro
            );

            window.alert(
                'Não foi possível carregar a chave Pix do motorista.'
            );

        } finally {
            setCarregando(false);
        }
    }

    async function confirmarPagamento() {
        try {

            const resposta = await fetch(
                `${API_URL}/salvarFinalizacaoCorrida.php`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        idCorrida,
                        idPassageiro,
                        valorGorjeta,
                        avaliacao,
                    }),
                }
            );

            const texto = await resposta.text();

            console.log(
                'Resposta salvar finalização:',
                texto
            );

            const dados = JSON.parse(texto);

            if (!dados.sucesso) {
                window.alert(
                    dados.mensagem ||
                    'Não foi possível salvar os dados da corrida.'
                );

                return;
            }

            window.alert(
                'Corrida finalizada com sucesso!'
            );

            navigation.reset({
                index: 0,
                routes: [
                    {
                        name: 'HomePassageiro',
                        params: {
                            idPassageiro,
                            nome: nomePassageiro,
                            tipoUsuario: 'passageiro',
                        },
                    },
                ],
            });

        } catch (erro) {

            console.log(
                'Erro ao salvar finalização:',
                erro
            );

            window.alert(
                'Não foi possível salvar os dados da corrida.'
            );
        }
    }

    if (carregando) {
        return (
            <View style={styles.carregando}>
                <ActivityIndicator
                    size="large"
                    color="#468B5B"
                />

                <Text style={styles.textoCarregando}>
                    Carregando dados do motorista...
                </Text>
            </View>
        );
    }

    if (!motorista) {
        return (
            <View style={styles.carregando}>
                <Text style={styles.erro}>
                    Não foi possível carregar os dados do motorista.
                </Text>
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
                        Envio de gorjeta
                    </Text>

                    <Text style={styles.title2}>
                        Colabore com o motorista!
                    </Text>

                </View>

                <View style={styles.cardsContainer}>

                    <View style={styles.cardMotorista}>

                        <View style={styles.infoMotorista}>

                            <Text style={styles.nomeMotorista}>
                                {motorista.nomeCompletoMotorista}
                            </Text>

                            <Text style={styles.tipoMotorista}>
                                Motorista parceiro
                            </Text>

                        </View>

                        <View style={styles.cpfContainer}>

                            <Text style={styles.cpfTitulo}>
                                Chave Pix:
                            </Text>

                            <Text style={styles.cpfValor}>
                                {motorista.pixMotorista || 'Não cadastrada'}
                            </Text>

                        </View>

                    </View>

                    <View style={styles.cardPix}>

                        <View style={styles.pixConteudo}>

                            <View style={styles.qrContainer}>

                                <Ionicons
                                    name="qr-code"
                                    size={105}
                                    color="#111"
                                />

                            </View>

                            <View style={styles.fotoContainer}>

                                {motorista.fotoPerfilMotorista ? (
                                    <Image
                                        source={{
                                            uri: `${API_URL}/img/perfilMotorista/${motorista.fotoPerfilMotorista}`,
                                        }}
                                        style={styles.fotoMotorista}
                                    />
                                ) : (
                                    <Ionicons
                                        name="person"
                                        size={48}
                                        color="#468B5B"
                                    />
                                )}

                            </View>

                        </View>

                        <Text style={styles.instrucao}>
                            Escaneie o QR Code acima ou copie e cole a chave pix
                            abaixo em seu banco:
                        </Text>

                        <Text style={styles.chavePix}>
                            Chave pix: {motorista.pixMotorista || 'Não cadastrada'}
                        </Text>

                    </View>

                    <View style={styles.cardValor}>

                        <View>

                            <Text style={styles.valorTitulo}>
                                Valor da gorjeta:
                            </Text>

                            <Text style={styles.valor}>
                                {valorGorjeta || 'R$ 0,00'}
                            </Text>

                        </View>

                        <TouchableOpacity
                            style={styles.botaoAlterar}
                            onPress={() => navigation.goBack()}
                        >

                            <Text style={styles.textoAlterar}>
                                Alterar valor
                            </Text>

                        </TouchableOpacity>

                    </View>

                    <TouchableOpacity
                        style={styles.botaoConfirmar}
                        onPress={confirmarPagamento}
                    >

                        <Text style={styles.textoConfirmar}>
                            Confirmar
                        </Text>

                    </TouchableOpacity>

                </View>

            </ImageBackground>

        </View>
    );
}