import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import styles from './style';

export default function CorridaFinalizadaPassageiro({ navigation }) {

    const [gorjetaSelecionada, setGorjetaSelecionada] = useState(null);
    const [outroValor, setOutroValor] = useState('');        // ← aqui

    const opcoesGorjeta = ['R$2,00', 'R$5,00', 'R$10,00', 'Outro\nvalor'];

    const handleGorjeta = (opcao) => {
        setGorjetaSelecionada(prev => prev === opcao ? null : opcao);
        setOutroValor('');                                   // ← e aqui
    };

    const handleOutroValor = (text) => {                     // ← aqui
        const apenasNumeros = text.replace(/[^0-9]/g, '');
        const centavos = parseInt(apenasNumeros || '0');
        const reais = Math.floor(centavos / 100);
        const centavosStr = String(centavos % 100).padStart(2, '0');
        setOutroValor(`${reais},${centavosStr}`);
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../../assets/backgroundGoTogether.png')}
                style={styles.background}
                resizeMode="stretch"
            >
                {/* Títulos */}
                <View style={styles.titulosContainer}>
                    <Text style={styles.title}>Corrida Finalizada!</Text>
                    <Text style={styles.title2}>Obrigado por viajar conosco</Text>
                </View>

                {/* Área dos cards */}
                <View style={styles.cardsContainer}>

                    {/* Card Resumo */}
                    <View style={styles.containerResumo}>
                        <Text style={styles.resumoCardLabel}>Resumo da carona</Text>
                        <View style={styles.resumoBody}>
                            <View style={styles.resumoEsquerda}>
                                <Text style={styles.resumoLabel}>
                                    Origem:{' '}
                                    <Text style={styles.resumoValor}>
                                        Prefeitura Municipal de Registro - Rua José de Campos, Registro - SP
                                    </Text>
                                </Text>
                                <Text style={styles.resumoLabel}>
                                    Destino:{' '}
                                    <Text style={styles.resumoValor}>
                                        Praça Beira Rio - Rua José Sugunio Shita, Registro - SP
                                    </Text>
                                </Text>
                            </View>
                            <View style={styles.resumoDireita}>
                                <Text style={styles.resumoInfoLabel}>Data: <Text style={styles.resumoInfoValor}>05/05/2026</Text></Text>
                                <Text style={styles.resumoInfoLabel}>Horário: <Text style={styles.resumoInfoValor}>22:56</Text></Text>
                                <Text style={styles.resumoInfoLabel}>Trajeto: <Text style={styles.resumoInfoValor}>1,1km</Text></Text>
                                <Text style={styles.resumoInfoLabel}>Tempo: <Text style={styles.resumoInfoValor}>05:52min</Text></Text>
                            </View>
                        </View>
                    </View>

                    {/* Card Recompensas */}
                    <View style={styles.containerRecompensa}>
                        <Text style={styles.titleRecompensas}>Recompensas</Text>
                        <Text style={styles.subtitleRecompensas}>
                            Deseja recompensar o motorista com gorjeta?
                        </Text>

                        <View style={styles.gorjetaRow}>
                            {opcoesGorjeta.map((opcao) => {
                                const selecionado = gorjetaSelecionada === opcao;
                                return (
                                    <TouchableOpacity
                                        key={opcao}
                                        onPress={() => handleGorjeta(opcao)}
                                        style={[
                                            styles.gorjetaBtn,
                                            selecionado && styles.gorjetaBtnSelecionado,
                                        ]}
                                    >
                                        <Text style={[
                                            styles.gorjetaBtnText,
                                            selecionado && styles.gorjetaBtnTextSelecionado,
                                        ]}>
                                            {opcao}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>

                        {gorjetaSelecionada === 'Outro\nvalor' && (
                            <TextInput
                                style={styles.inputOutroValor}
                                placeholder="R$ 0,00"
                                keyboardType="numeric"
                                value={outroValor ? `R$ ${outroValor}` : ''}
                                onChangeText={handleOutroValor}
                            />
                        )}
                    </View>

                    {/* Card Experiência */}
                    <View style={styles.containerExperiencia}>
                        <Text style={styles.titleExperiencia}>Experiência do usuário</Text>
                        <Text style={styles.subtitleExperiencia}>Avaliação: 5 estrelas  ⭐⭐⭐⭐⭐</Text>
                    </View>

                    {/* Botão Confirmar principal */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate('LoginPassageiro')}
                        style={styles.buttonConfirmar}
                    >
                        <Text style={styles.buttonText}>Confirmar</Text>
                    </TouchableOpacity>

                </View>
            </ImageBackground>
        </View>
    );
}