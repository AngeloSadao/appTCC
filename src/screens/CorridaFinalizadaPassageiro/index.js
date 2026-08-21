import React, { useState } from 'react';

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import styles from './style';

export default function CorridaFinalizadaPassageiro({ navigation }) {

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../../assets/backgroundGoTogether.png')}
                style={styles.background}
                resizeMode="stretch"
            >

                <Text style={styles.title}>
                    Corrida Finalizada!
                </Text>
                <Text style={styles.title2}>
                    Obrigado por viajar conosco
                </Text>

                <View style={styles.containerResumo}>
                    <View style={styles.resumoEsquerda}>
                        <Text style={styles.resumoLabel}>Origem: <Text style={styles.resumoValor}>Prefeitura Municipal de Registro - Rua José de Campos, Registro - SP</Text></Text>
                        <Text style={styles.resumoLabel}>Destino: <Text style={styles.resumoValor}>Praça Beira Rio - Rua José Sugunio Shita, Registro - SP</Text></Text>
                    </View>

                    <View style={styles.resumoDireita}>
                        <Text style={styles.resumoInfoLabel}>Data: <Text style={styles.resumoInfoValor}>05/05/2026</Text></Text>
                        <Text style={styles.resumoInfoLabel}>Horário: <Text style={styles.resumoInfoValor}>22:56</Text></Text>
                        <Text style={styles.resumoInfoLabel}>Trajeto: <Text style={styles.resumoInfoValor}>1,1km</Text></Text>
                        <Text style={styles.resumoInfoLabel}>Tempo: <Text style={styles.resumoInfoValor}>05:52min</Text></Text>
                    </View>
                </View>

                <View style={styles.containerRecompensas}>

                </View>

                <View style={styles.containerExperiencia}>

                </View>

                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate('LoginPassageiro')
                    }
                    style={styles.buttonConfirmar}
                >
                    <Text style={styles.buttonText}>
                        Confirmar
                    </Text>
                </TouchableOpacity>

            </ImageBackground>
        </View>
    );
}