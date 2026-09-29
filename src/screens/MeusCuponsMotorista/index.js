import React, { useCallback, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    ScrollView,
    ActivityIndicator,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import {
    useNavigation,
    DrawerActions,
    useFocusEffect,
} from '@react-navigation/native';

import styles from './style';

const API_URL = 'http://localhost/appTcc';

export default function MeusCuponsMotorista({ route }) {

    const navigation = useNavigation();

    const idMotorista = route.params?.idMotorista;

    const [cupons, setCupons] = useState([]);
    const [carregando, setCarregando] = useState(true);

    useFocusEffect(
        useCallback(() => {
            buscarCupons();
        }, [idMotorista])
    );

    async function buscarCupons() {

        if (!idMotorista) {
            setCarregando(false);
            return;
        }

        try {

            setCarregando(true);

            const resposta = await fetch(
                `${API_URL}/buscarCuponsResgatados.php?idMotorista=${idMotorista}`
            );

            const texto = await resposta.text();

            console.log('Resposta meus cupons:', texto);

            const dados = JSON.parse(texto);

            if (dados.sucesso) {
                setCupons(dados.cupons || []);
            } else {
                window.alert(
                    dados.mensagem || 'Não foi possível carregar seus cupons.'
                );
            }

        } catch (erro) {

            console.log('Erro ao buscar meus cupons:', erro);

            window.alert('Não foi possível carregar seus cupons.');

        } finally {

            setCarregando(false);

        }
    }

    function formatarData(data) {

        if (!data) {
            return '';
        }

        const [ano, mes, dia] = data.split('-');

        return `${dia}/${mes}/${ano}`;
    }

    function formatarDataResgate(data) {

        if (!data) {
            return '';
        }

        const partes = data.split(' ');

        if (partes.length < 1) {
            return data;
        }

        const [ano, mes, dia] = partes[0].split('-');

        return `${dia}/${mes}/${ano}`;
    }

    function formatarDesconto(cupom) {

        if (cupom.descontoDinheiroCupom !== null) {

            return Number(
                cupom.descontoDinheiroCupom
            ).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            });

        }

        if (cupom.descontoPercentualCupom !== null) {

            return `${Number(
                cupom.descontoPercentualCupom
            ).toLocaleString('pt-BR')}%`;

        }

        return 'Desconto';

    }

    async function utilizarCupom(cupom) {

        const confirmar = window.confirm(
            `Deseja utilizar o cupom ${cupom.nomeCupom}?\n\n` +
            `Código: ${cupom.codigoCupom}\n\n` +
            `Após confirmar, este cupom não poderá ser utilizado novamente.`
        );

        if (!confirmar) {
            return;
        }

        try {

            const resposta = await fetch(
                `${API_URL}/utilizarCupom.php`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        idMotorista: idMotorista,
                        idResgate: cupom.idResgate,
                    }),
                }
            );

            const texto = await resposta.text();

            console.log('Resposta utilizar cupom:', texto);

            const dados = JSON.parse(texto);

            if (!dados.sucesso) {
                window.alert(
                    dados.mensagem || 'Não foi possível utilizar o cupom.'
                );
                return;
            }

            window.alert('Cupom utilizado com sucesso!');

            await buscarCupons();

        } catch (erro) {

            console.log('Erro ao utilizar cupom:', erro);

            window.alert('Não foi possível utilizar o cupom.');

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
                    Carregando seus cupons...
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

                <View style={styles.menuContainer}>

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

                </View>

                <View style={styles.titulosContainer}>

                    <Text style={styles.title}>
                        Meus
                    </Text>

                    <Text style={styles.title2}>
                        cupons
                    </Text>

                </View>

                <ScrollView
                    style={styles.scroll}
                    contentContainerStyle={styles.conteudoScroll}
                    showsVerticalScrollIndicator={false}
                >

                    {cupons.length === 0 ? (

                        <View style={styles.cardVazio}>

                            <Ionicons
                                name="ticket-outline"
                                size={45}
                                color="#7AC992"
                            />

                            <Text style={styles.tituloVazio}>
                                Você ainda não possui cupons
                            </Text>

                            <Text style={styles.textoVazio}>
                                Resgate cupons em Minhas Bonificações
                                para encontrá-los aqui.
                            </Text>

                        </View>

                    ) : (

                        <View style={styles.listaCupons}>

                            {cupons.map((cupom) => (

                                <View
                                    key={cupom.idResgate}
                                    style={styles.cupomItem}
                                >

                                    <View style={styles.cupomCabecalho}>

                                        <View style={styles.cupomIcone}>

                                            <Ionicons
                                                name="ticket-outline"
                                                size={25}
                                                color="#468B5B"
                                            />

                                        </View>

                                        <View style={styles.cupomTituloContainer}>

                                            <Text style={styles.cupomNome}>
                                                {cupom.nomeCupom}
                                            </Text>

                                            <Text style={styles.cupomColaborador}>
                                                {cupom.nomeColaborador}
                                            </Text>

                                        </View>

                                    </View>

                                    <Text style={styles.cupomDesconto}>
                                        {formatarDesconto(cupom)}
                                    </Text>

                                    <Text style={styles.cupomDescricao}>
                                        de desconto
                                    </Text>

                                    <Text style={styles.cupomMinimo}>
                                        Compra mínima: R$ {Number(
                                            cupom.valorMinimoCupom || 0
                                        ).toLocaleString('pt-BR', {
                                            minimumFractionDigits: 2,
                                        })}
                                    </Text>

                                    <Text style={styles.cupomValidade}>
                                        Válido até: {formatarData(cupom.validadeCupom)}
                                    </Text>

                                    <View style={styles.cupomPontos}>

                                        <Ionicons
                                            name="star"
                                            size={17}
                                            color="#468B5B"
                                        />

                                        <Text style={styles.cupomPontosTexto}>
                                            {Number(
                                                cupom.pontosNecessariosCupom || 0
                                            ).toLocaleString('pt-BR')} pontos utilizados
                                        </Text>

                                    </View>

                                    <View style={styles.cupomCodigo}>

                                        <Ionicons
                                            name="pricetag-outline"
                                            size={16}
                                            color="#468B5B"
                                        />

                                        <Text style={styles.cupomCodigoTexto}>
                                            Código: {cupom.codigoCupom}
                                        </Text>

                                    </View>

                                    <View style={styles.cupomStatus}>

                                        <Ionicons
                                            name={
                                                cupom.statusResgate === 'utilizado'
                                                    ? 'checkmark-circle'
                                                    : cupom.statusResgate === 'expirado'
                                                        ? 'close-circle'
                                                        : 'time-outline'
                                            }
                                            size={16}
                                            color={
                                                cupom.statusResgate === 'utilizado'
                                                    ? '#468B5B'
                                                    : cupom.statusResgate === 'expirado'
                                                        ? '#C94C4C'
                                                        : '#D99A00'
                                            }
                                        />

                                        <Text
                                            style={
                                                cupom.statusResgate === 'utilizado'
                                                    ? styles.cupomStatusUtilizado
                                                    : cupom.statusResgate === 'expirado'
                                                        ? styles.cupomStatusExpirado
                                                        : styles.cupomStatusResgatado
                                            }
                                        >
                                            {cupom.statusResgate === 'utilizado'
                                                ? 'Cupom utilizado'
                                                : cupom.statusResgate === 'expirado'
                                                    ? 'Cupom expirado'
                                                    : 'Cupom resgatado'}
                                        </Text>

                                    </View>

                                    {cupom.statusResgate === 'resgatado' && (
                                        <TouchableOpacity
                                            style={styles.botaoUtilizar}
                                            onPress={() => utilizarCupom(cupom)}
                                        >
                                            <Text style={styles.textoBotaoUtilizar}>
                                                Usar cupom
                                            </Text>
                                        </TouchableOpacity>
                                    )}

                                    {cupom.statusResgate === 'utilizado' && (
                                        <View style={styles.botaoUtilizado}>
                                            <Ionicons
                                                name="checkmark-circle-outline"
                                                size={18}
                                                color="#468B5B"
                                            />

                                            <Text style={styles.textoBotaoUtilizado}>
                                                Cupom utilizado
                                            </Text>
                                        </View>
                                    )}

                                    <View style={styles.cupomResgate}>

                                        <Ionicons
                                            name="calendar-outline"
                                            size={15}
                                            color="#777777"
                                        />

                                        <Text style={styles.cupomResgateTexto}>
                                            Resgatado em: {formatarDataResgate(
                                                cupom.dataResgate
                                            )}
                                        </Text>

                                    </View>

                                </View>

                            ))}

                        </View>

                    )}

                    <View style={styles.espacoFinal} />

                </ScrollView>

            </ImageBackground>

        </View>
    );
}