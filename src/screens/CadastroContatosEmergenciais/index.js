import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    Alert,
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

    const buscarContatos = async () => {
        if (!idPassageiro) return;

        try {
            const response = await fetch(
                'http://localhost/appTcc/buscarContatosEmergenciais.php',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        idPassageiro: idPassageiro
                    }),
                }
            );

            const dados = await response.json();

            console.log('Contatos encontrados:', dados);

            if (dados.sucesso) {
                setContatos(dados.contatos);
            }
        } catch (error) {
            console.log('Erro ao buscar contatos:', error);
        }
    };

    function mascaraTelefone(texto) {
        const numeros = texto.replace(/\D/g, '');
        if (numeros.length <= 2) return `(${numeros}`;
        if (numeros.length <= 7) return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
        return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7, 11)}`;
    }

    const adicionarContato = async () => {

        if (nome.trim() === '' || telefone.trim() === '') {
            window.alert('Atenção, Preencha o nome e o telefone.');
            return;
        }

        if (contatos.length >= 3) {
            window.alert('Limite atingido', 'Você pode adicionar até 3 contatos.');
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
                        telefone: telefone
                    }),
                }
            );

            const dados = await response.json();

            console.log('Resposta do contato:', dados);

            if (dados.sucesso) {

                const novoContato = {
                    idContatoEmergencial: dados.idContatoEmergencial,
                    nome: nome,
                    telefone: telefone
                };

                setContatos([...contatos, novoContato]);

                setNome('');
                setTelefone('');

                window.alert(
                    'Contato adicionado com sucesso!'
                );

            } else {

                window.alert(
                    'Atenção',
                    dados.mensagem
                );
            }

        } catch (error) {

            console.log('Erro ao cadastrar contato:', error);

            Alert.alert(
                'Erro',
                'Não foi possível conectar ao servidor.'
            );
        }
    };

    const removerContato = async (idContatoEmergencial) => {
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
                        idContatoEmergencial: idContatoEmergencial
                    }),
                }
            );

            const dados = await response.json();

            console.log('Remover contato:', dados);

            if (dados.sucesso) {
                setContatos(
                    contatos.filter(
                        contato =>
                            contato.idContatoEmergencial != idContatoEmergencial
                    )
                );

                window.alert('Contato removido com sucesso!');
            } else {
                Alert.alert('Atenção', dados.mensagem);
            }

        } catch (error) {
            console.log('Erro ao remover contato:', error);
            Alert.alert('Erro', 'Não foi possível remover o contato.');
        }
    };

    return (
        <View style={styles.container}>

            <ImageBackground
                source={require('../../../assets/backgroundGoTogether.png')}
                style={styles.background}
                resizeMode="stretch"
            >

                {/* Menu */}
                <TouchableOpacity
                    style={styles.menuButton}
                    onPress={() => {
                        console.log('CLICOU NO MENU');
                        navigation.dispatch(DrawerActions.openDrawer());
                    }}
                >
                    <View style={styles.menuLinha} />
                    <View style={styles.menuLinha} />
                    <View style={styles.menuLinha} />
                </TouchableOpacity>

                {/* Títulos */}
                <View style={styles.titulosContainer}>

                    <Text style={styles.title}>
                        Adicione
                    </Text>

                    <Text style={styles.title2}>
                        Contatos de emergência
                    </Text>

                </View>

                {/* Linha abaixo do título */}
                <View style={styles.linha} />

                {/* Conteúdo */}
                <View style={styles.conteudo}>

                    {/* Card de cadastro */}
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

                        {/* Nome */}
                        <TextInput
                            style={styles.input}
                            placeholder="Digite o nome"
                            placeholderTextColor="#7D9BE6"
                            value={nome}
                            onChangeText={setNome}
                        />

                        {/* Telefone */}
                        <TextInput
                            style={styles.input}
                            placeholder="Digite o telefone"
                            placeholderTextColor="#7D9BE6"
                            keyboardType="phone-pad"
                            value={telefone}
                            onChangeText={(texto) =>
                                setTelefone(mascaraTelefone(texto))
                            }
                        />

                        {/* Botão adicionar */}
                        <TouchableOpacity
                            style={styles.botaoAdicionar}
                            onPress={adicionarContato}
                        >
                            <Text style={styles.textoBotao}>
                                Adicionar
                            </Text>
                        </TouchableOpacity>

                    </View>

                    {/* Contatos adicionados */}
                    {contatos.map((contato) => (
                        <View
                            key={contato.idContatoEmergencial}
                            style={styles.contatoCard}
                        >
                            <View style={styles.contatoInformacoes}>
                                <Text style={styles.contatoNome}>
                                    {contato.nomeContatoEmergencial || contato.nome}
                                </Text>

                                <Text style={styles.contatoTelefone}>
                                    {contato.telefoneContatoEmergencial || contato.telefone}
                                </Text>
                            </View>

                            <TouchableOpacity
                                onPress={() =>
                                    removerContato(contato.idContatoEmergencial)
                                }
                            >
                                <Text style={styles.remover}>Remover</Text>
                            </TouchableOpacity>

                        </View>
                    ))}

                    {/* Botão continuar */}
                    {contatos.length > 0 && (
                        <TouchableOpacity
                            style={styles.botaoContinuar}
                            onPress={() => navigation.navigate('HomePassageiro')}
                        >
                            <Text style={styles.textoBotaoContinuar}>
                                Continuar
                            </Text>
                        </TouchableOpacity>
                    )}

                </View>

            </ImageBackground>

        </View>
    );
}