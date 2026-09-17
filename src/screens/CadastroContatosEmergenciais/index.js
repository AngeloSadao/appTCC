import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    ScrollView,
} from 'react-native';

import styles from './style';
import { DrawerActions } from '@react-navigation/native';

export default function CadastroContatosEmergenciais({ navigation, route }) {

    const idPassageiro = route.params?.idPassageiro;

    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [contatos, setContatos] = useState([]);

    useEffect(() => {
        buscarContatos();
    }, [idPassageiro]);

    async function buscarContatos() {

        if (!idPassageiro) {
            return;
        }

        try {

            console.log(
                'Buscando contatos do passageiro:',
                idPassageiro
            );

            const response = await fetch(
                'http://localhost/appTcc/buscarContatosEmergenciais.php',
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

            console.log(
                'Contatos encontrados:',
                dados
            );

            if (dados.sucesso) {
                setContatos(dados.contatos || []);
            } else {
                setContatos([]);
            }

        } catch (error) {

            console.log(
                'Erro ao buscar contatos:',
                error
            );

            setContatos([]);
        }
    }

    function mascaraTelefone(texto) {

        const numeros = texto.replace(/\D/g, '');

        if (numeros.length <= 2) {
            return `(${numeros}`;
        }

        if (numeros.length <= 7) {
            return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
        }

        return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7, 11)}`;
    }

    async function adicionarContato() {

        if (
            nome.trim() === '' ||
            telefone.trim() === ''
        ) {

            window.alert(
                'Atenção, preencha o nome e o telefone.'
            );

            return;
        }

        if (contatos.length >= 3) {

            window.alert(
                'Você pode adicionar até 3 contatos.'
            );

            return;
        }

        try {

            const response = await fetch(
                'http://localhost/appTcc/salvarContatoEmergencial.php',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        idPassageiro: idPassageiro,
                        nome: nome,
                        telefone: telefone,
                    }),
                }
            );

            const dados = await response.json();

            console.log(
                'Resposta do contato:',
                dados
            );

            if (dados.sucesso) {

                setNome('');
                setTelefone('');

                await buscarContatos();

                window.alert(
                    'Contato adicionado com sucesso!'
                );

            } else {

                window.alert(
                    dados.mensagem
                );
            }

        } catch (error) {

            console.log(
                'Erro ao cadastrar contato:',
                error
            );

            window.alert(
                'Não foi possível conectar ao servidor.'
            );
        }
    }

    async function removerContato(
        idContatoEmergencial
    ) {

        try {

            const response = await fetch(
                'http://localhost/appTcc/removerContatoEmergencial.php',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        idContatoEmergencial:
                            idContatoEmergencial,
                    }),
                }
            );

            const dados = await response.json();

            console.log(
                'Remover contato:',
                dados
            );

            if (dados.sucesso) {

                await buscarContatos();

                window.alert(
                    'Contato removido com sucesso!'
                );

            } else {

                window.alert(
                    dados.mensagem
                );
            }

        } catch (error) {

            console.log(
                'Erro ao remover contato:',
                error
            );

            window.alert(
                'Não foi possível remover o contato.'
            );
        }
    }

    return (
        <View style={styles.container}>

            <ImageBackground
                source={require('../../../assets/backgroundGoTogether.png')}
                style={styles.background}
                resizeMode="stretch"
            >

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

                <View style={styles.titulosContainer}>

                    <Text style={styles.title}>
                        Adicione
                    </Text>

                    <Text style={styles.title2}>
                        Contatos de emergência
                    </Text>

                </View>


                <View style={styles.linha} />


                <View style={styles.conteudo}>

                    <ScrollView
                        style={styles.scrollConteudo}
                        contentContainerStyle={
                            styles.scrollConteudoInterno
                        }
                        showsVerticalScrollIndicator={true}
                        nestedScrollEnabled={true}
                    >

                        <View style={styles.cardCadastro}>

                            <Text style={styles.textoExplicativo}>
                                Adicione até 3 contatos de alguém
                            </Text>

                            <Text style={styles.textoExplicativo}>
                                de confiança para enviar um SMS
                            </Text>

                            <Text style={styles.textoExplicativo}>
                                de emergência pelo chaveiro.
                            </Text>


                            <TextInput
                                style={styles.input}
                                placeholder="Digite o nome"
                                placeholderTextColor="#7D9BE6"
                                value={nome}
                                onChangeText={setNome}
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Digite o telefone"
                                placeholderTextColor="#7D9BE6"
                                keyboardType="phone-pad"
                                value={telefone}
                                onChangeText={(texto) =>
                                    setTelefone(
                                        mascaraTelefone(texto)
                                    )
                                }
                            />

                            <TouchableOpacity
                                style={styles.botaoAdicionar}
                                onPress={adicionarContato}
                            >
                                <Text style={styles.textoBotao}>
                                    Adicionar
                                </Text>
                            </TouchableOpacity>

                        </View>

                        {contatos.map((contato) => (

                            <View
                                key={
                                    contato.idContatoEmergencial
                                }
                                style={styles.contatoCard}
                            >

                                <View
                                    style={
                                        styles.contatoInformacoes
                                    }
                                >

                                    <Text
                                        style={styles.contatoNome}
                                    >
                                        {
                                            contato.nomeContatoEmergencial ||
                                            contato.nome
                                        }
                                    </Text>

                                    <Text
                                        style={
                                            styles.contatoTelefone
                                        }
                                    >
                                        {
                                            contato.telefoneContatoEmergencial ||
                                            contato.telefone
                                        }
                                    </Text>

                                </View>

                                <TouchableOpacity
                                    onPress={() =>
                                        removerContato(
                                            contato.idContatoEmergencial
                                        )
                                    }
                                >
                                    <Text
                                        style={styles.remover}
                                    >
                                        Remover
                                    </Text>
                                </TouchableOpacity>

                            </View>

                        ))}

                        {contatos.length > 0 && (

                            <TouchableOpacity
                                style={
                                    styles.botaoContinuar
                                }
                                onPress={() =>
                                    navigation.navigate(
                                        'HomePassageiro'
                                    )
                                }
                            >
                                <Text
                                    style={
                                        styles.textoBotaoContinuar
                                    }
                                >
                                    Continuar
                                </Text>
                            </TouchableOpacity>

                        )}

                    </ScrollView>

                </View>

            </ImageBackground>

        </View>
    );
}