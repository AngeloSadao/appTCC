import React, { useCallback, useState, useRef, useEffect } from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Animated,
    PanResponder,
    Easing,
    ActivityIndicator,
} from 'react-native';

import {
    useFocusEffect,
    useNavigation,
} from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import {
    MapContainer,
    TileLayer,
    Marker,
    Polyline,
    Popup,
    useMap,
} from 'react-leaflet';

import styles from './style';

const icon = new L.Icon({
    iconUrl:
        'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl:
        'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

function AtualizarMapa({ pontos }) {
    const map = useMap();

    useEffect(() => {
        if (pontos.length > 0) {
            map.flyToBounds(pontos, {
                padding: [50, 50],
                duration: 1,
            });
        }
    }, [pontos]);

    return null;
}

export default function CaronasSolicitadas({ route }) {
    const navigation = useNavigation();

    const idMotorista = route.params?.idMotorista;

    const [solicitacoes, setSolicitacoes] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [expandida, setExpandida] = useState(null);

    const alturaAnim = useRef(
        new Animated.Value(390)
    ).current;

    const translateY = useRef(
        new Animated.Value(0)
    ).current;

    const startY = useRef(0);

    async function buscarSolicitacoes() {
        if (!idMotorista) {
            setCarregando(false);
            return;
        }

        try {
            setCarregando(true);

            const resposta = await fetch(
                `http://localhost/appTcc/buscarSolicitacoesCaronaMotorista.php?idMotorista=${idMotorista}`
            );

            const dados = await resposta.json();

            if (dados.sucesso) {
                setSolicitacoes(
                    dados.solicitacoes || []
                );
            } else {
                window.alert(
                    dados.mensagem ||
                    'Não foi possível buscar as solicitações.'
                );
            }
        } catch (erro) {
            console.log(
                'Erro ao buscar solicitações:',
                erro
            );

            window.alert(
                'Não foi possível carregar as solicitações.'
            );
        } finally {
            setCarregando(false);
        }
    }

    useFocusEffect(
        useCallback(() => {
            buscarSolicitacoes();
        }, [idMotorista])
    );

    function formatarData(data) {
        if (!data) return '';

        const partes = data.split('-');

        if (partes.length !== 3) {
            return data;
        }

        return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }

    function formatarHorario(horario) {
        if (!horario) return '';

        return horario.slice(0, 5);
    }

    function alternarSolicitacao(id) {
        setExpandida(
            expandida === id ? null : id
        );
    }

    async function confirmarSolicitacao(item) {
        try {
            if (!idMotorista || !item?.idPassageiro || !item?.idSolicitacao) {
                window.alert('Dados da solicitação incompletos.');
                return;
            }

            const resposta = await fetch(
                'http://localhost/appTcc/confirmarCarona.php',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        idCarona: item.idCarona || null,
                        idSolicitacao: item.idSolicitacao,
                        idPassageiro: item.idPassageiro,
                        idMotorista: idMotorista,
                        tipoUsuario: 'motorista',
                        solicitacaoSemCarona: !item.idCarona,
                    }),
                }
            );

            const texto = await resposta.text();

            console.log(
                'Resposta confirmação motorista:',
                texto
            );

            let dados;

            try {
                dados = JSON.parse(texto);
            } catch (erro) {
                console.log(
                    'Resposta inválida do PHP:',
                    texto
                );

                window.alert(
                    'O servidor retornou uma resposta inválida.'
                );

                return;
            }

            if (!dados.sucesso) {
                window.alert(
                    dados.mensagem ||
                    'Não foi possível confirmar a solicitação.'
                );

                return;
            }

            if (!dados.pronto) {
                window.alert(
                    'Solicitação confirmada! Agora aguarde a confirmação do passageiro para liberar o chat.'
                );

                return;
            }

            const stackNavigation =
                navigation.getParent();

            if (!stackNavigation) {
                window.alert(
                    'Não foi possível acessar a navegação principal.'
                );

                return;
            }

            stackNavigation.navigate('Chat', {
                idConversa: dados.idConversa,
                idCarona: dados.idCarona || item.idCarona,
                idSolicitacao: dados.idSolicitacao || item.idSolicitacao,
                idPassageiro: item.idPassageiro,
                idMotorista: idMotorista,
                tipoUsuario: 'motorista',
                nomeOutroUsuario: item.nomePassageiro,
            });

        } catch (erro) {
            console.log(
                'Erro ao confirmar solicitação:',
                erro
            );

            window.alert(
                'Não foi possível confirmar a solicitação.'
            );
        }
    }


    const pontosMapa = [];

    solicitacoes.forEach(item => {
        if (
            item.latitudeOrigem &&
            item.longitudeOrigem
        ) {
            pontosMapa.push([
                Number(item.latitudeOrigem),
                Number(item.longitudeOrigem),
            ]);
        }

        if (
            item.latitudeDestino &&
            item.longitudeDestino
        ) {
            pontosMapa.push([
                Number(item.latitudeDestino),
                Number(item.longitudeDestino),
            ]);
        }
    });

    const panResponder =
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gesture) =>
                Math.abs(gesture.dy) > 5,

            onPanResponderGrant: () => {
                startY.current =
                    translateY.__getValue();
            },

            onPanResponderMove: (_, gesture) => {
                let novoValor =
                    startY.current + gesture.dy;

                if (novoValor < 0) {
                    novoValor = 0;
                }

                if (novoValor > 300) {
                    novoValor = 300;
                }

                translateY.setValue(novoValor);
            },

            onPanResponderRelease: (_, gesture) => {
                let destino = 0;

                if (gesture.dy > 80) {
                    destino = 300;
                } else if (gesture.dy < -80) {
                    destino = 0;
                } else {
                    destino =
                        translateY.__getValue() > 150
                            ? 300
                            : 0;
                }

                Animated.timing(
                    translateY,
                    {
                        toValue: destino,
                        duration: 300,
                        easing: Easing.out(Easing.cubic),
                        useNativeDriver: true,
                    }
                ).start();
            },
        });

    return (
        <View style={styles.container}>

            <View style={styles.mapContainer}>

                <MapContainer
                    center={[
                        -24.4979,
                        -47.8449,
                    ]}
                    zoom={14}
                    zoomControl={false}
                    attributionControl={false}
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                >

                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {solicitacoes.map(item => (
                        <React.Fragment
                            key={`${item.idSolicitacao}-${item.idCarona}`}
                        >

                            {item.latitudeOrigem &&
                                item.longitudeOrigem && (
                                    <Marker
                                        position={[
                                            Number(item.latitudeOrigem),
                                            Number(item.longitudeOrigem),
                                        ]}
                                        icon={icon}
                                    >
                                        <Popup>
                                            <div style={{ minWidth: '220px' }}>

                                                <div
                                                    style={{
                                                        fontSize: '18px',
                                                        fontWeight: 'bold',
                                                        color: '#468B5B',
                                                        marginBottom: '8px',
                                                    }}
                                                >
                                                    {item.nomePassageiro}
                                                </div>

                                                <div
                                                    style={{
                                                        fontSize: '14px',
                                                        marginBottom: '4px',
                                                    }}
                                                >
                                                    <strong>Origem:</strong>{' '}
                                                    {item.origemSolicitacao}
                                                </div>

                                                <div
                                                    style={{
                                                        fontSize: '14px',
                                                        marginBottom: '4px',
                                                    }}
                                                >
                                                    <strong>Destino:</strong>{' '}
                                                    {item.destinoSolicitacao}
                                                </div>

                                                <div
                                                    style={{
                                                        fontSize: '14px',
                                                        marginBottom: '4px',
                                                    }}
                                                >
                                                    <strong>Data:</strong>{' '}
                                                    {formatarData(
                                                        item.dataSolicitacao
                                                    )}
                                                </div>

                                                <div
                                                    style={{
                                                        fontSize: '14px',
                                                        marginBottom: '4px',
                                                    }}
                                                >
                                                    <strong>Horário:</strong>{' '}
                                                    {formatarHorario(
                                                        item.horarioSolicitacao
                                                    )}
                                                </div>

                                                <div
                                                    style={{
                                                        fontSize: '14px',
                                                        marginBottom: '8px',
                                                    }}
                                                >
                                                    <strong>Passageiros:</strong>{' '}
                                                    {item.quantidadePassageiros}
                                                </div>

                                                {Number(item.comPet) === 1 && (
                                                    <div
                                                        style={{
                                                            fontSize: '13px',
                                                            marginBottom: '5px',
                                                        }}
                                                    >
                                                        Com pet
                                                    </div>
                                                )}

                                                {Number(item.motoristaMasculino) === 1 && (
                                                    <div
                                                        style={{
                                                            fontSize: '13px',
                                                            marginBottom: '5px',
                                                        }}
                                                    >
                                                        Prefere motorista masculino
                                                    </div>
                                                )}

                                                {Number(item.motoristaFeminino) === 1 && (
                                                    <div
                                                        style={{
                                                            fontSize: '13px',
                                                            marginBottom: '8px',
                                                        }}
                                                    >
                                                        Prefere motorista feminino
                                                    </div>
                                                )}

                                                <div
                                                    style={{
                                                        textAlign: 'center',
                                                        fontSize: '22px',
                                                        fontWeight: 'bold',
                                                        color: '#468B5B',
                                                        marginBottom: '8px',
                                                    }}
                                                >
                                                    {item.compatibilidade}%
                                                    <div
                                                        style={{
                                                            fontSize: '11px',
                                                            fontWeight: 'normal',
                                                        }}
                                                    >
                                                        Compatibilidade
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={() => confirmarSolicitacao(item)}
                                                    style={{
                                                        width: '100%',
                                                        padding: '9px',
                                                        border: 'none',
                                                        borderRadius: '7px',
                                                        backgroundColor: '#468B5B',
                                                        color: '#FFFFFF',
                                                        fontSize: '14px',
                                                        fontWeight: 'bold',
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    Escolher esta solicitação
                                                </button>

                                            </div>
                                        </Popup>
                                    </Marker>
                                )}

                        </React.Fragment>
                    ))}

                </MapContainer>

            </View>

            <TouchableOpacity
                style={styles.menuButton}
                onPress={() => navigation.openDrawer()}
            >
                <Text style={styles.menuIcon}>
                    ☰
                </Text>
            </TouchableOpacity>

            <Animated.View
                style={[
                    styles.bottomSheet,
                    {
                        height: alturaAnim,
                        transform: [
                            {
                                translateY,
                            },
                        ],
                    },
                ]}
            >

                <View
                    {...panResponder.panHandlers}
                    style={styles.dragArea}
                >
                    <View style={styles.dragHandle} />
                </View>

                <View style={styles.tituloContainer}>

                    <Text style={styles.titulo}>
                        Caronas solicitadas
                    </Text>

                </View>

                <View style={styles.linhaTitulo} />

                {carregando ? (

                    <View style={styles.loading}>

                        <ActivityIndicator
                            size="large"
                            color="#468B5B"
                        />

                        <Text style={styles.loadingText}>
                            Buscando solicitações...
                        </Text>

                    </View>

                ) : solicitacoes.length === 0 ? (

                    <View style={styles.vazio}>

                        <Text style={styles.vazioTitulo}>
                            Nenhuma solicitação encontrada
                        </Text>

                        <Text style={styles.vazioTexto}>
                            As solicitações compatíveis
                            aparecerão aqui.
                        </Text>

                    </View>

                ) : (

                    <ScrollView
                        style={styles.lista}
                        contentContainerStyle={
                            styles.listaConteudo
                        }
                        showsVerticalScrollIndicator={false}
                    >

                        {solicitacoes.map(
                            (item, index) => {

                                const idCard =
                                    `${item.idSolicitacao}-${item.idCarona}-${index}`;

                                const estaExpandida =
                                    expandida === idCard;

                                return (
                                    <View
                                        key={idCard}
                                        style={styles.card}
                                    >

                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            onPress={() =>
                                                alternarSolicitacao(
                                                    idCard
                                                )
                                            }
                                        >

                                            <View
                                                style={styles.cardLinha}
                                            >

                                                <View style={styles.avatar}>
                                                    <Ionicons
                                                        name="person"
                                                        size={23}
                                                        color="#468B5B"
                                                    />
                                                </View>

                                                <View
                                                    style={styles.cardInfo}
                                                >

                                                    <Text
                                                        style={styles.nome}
                                                        numberOfLines={1}
                                                    >
                                                        {item.nomePassageiro}
                                                    </Text>

                                                    <Text
                                                        style={styles.rota}
                                                        numberOfLines={1}
                                                    >
                                                        {item.origemSolicitacao}
                                                    </Text>

                                                    <Text
                                                        style={styles.rota}
                                                        numberOfLines={1}
                                                    >
                                                        {item.destinoSolicitacao}
                                                    </Text>

                                                    <View
                                                        style={styles.informacoes}
                                                    >

                                                        <Text
                                                            style={styles.info}
                                                        >
                                                            {formatarData(
                                                                item.dataSolicitacao
                                                            )}
                                                        </Text>

                                                        <Text
                                                            style={styles.info}
                                                        >
                                                            {formatarHorario(
                                                                item.horarioSolicitacao
                                                            )}
                                                        </Text>

                                                        <Text
                                                            style={styles.info}
                                                        >
                                                            {item.quantidadePassageiros}
                                                            {' '}
                                                            {Number(
                                                                item.quantidadePassageiros
                                                            ) === 1
                                                                ? 'pessoa'
                                                                : 'pessoas'}
                                                        </Text>

                                                    </View>

                                                </View>

                                                <View
                                                    style={
                                                        styles.compatibilidade
                                                    }
                                                >

                                                    <Text
                                                        style={
                                                            styles.compatibilidadeNumero
                                                        }
                                                    >
                                                        {item.compatibilidade}%
                                                    </Text>

                                                    <Text
                                                        style={
                                                            styles.compatibilidadeTexto
                                                        }
                                                    >
                                                        Compatibilidade
                                                    </Text>

                                                </View>

                                            </View>

                                        </TouchableOpacity>

                                        {estaExpandida && (

                                            <View
                                                style={
                                                    styles.detalhesContainer
                                                }
                                            >

                                                <View
                                                    style={styles.divisor}
                                                />

                                                <Text
                                                    style={styles.detalhesTitulo}
                                                >
                                                    Detalhes da solicitação
                                                </Text>

                                                <Text
                                                    style={styles.detalhe}
                                                >
                                                    Origem: {item.origemSolicitacao}
                                                </Text>

                                                <Text
                                                    style={styles.detalhe}
                                                >
                                                    Destino: {item.destinoSolicitacao}
                                                </Text>

                                                <Text
                                                    style={styles.detalhe}
                                                >
                                                    Data: {formatarData(
                                                        item.dataSolicitacao
                                                    )}
                                                </Text>

                                                <Text
                                                    style={styles.detalhe}
                                                >
                                                    Horário: {formatarHorario(
                                                        item.horarioSolicitacao
                                                    )}
                                                </Text>

                                                <Text
                                                    style={styles.detalhe}
                                                >
                                                    Passageiros: {
                                                        item.quantidadePassageiros
                                                    }
                                                </Text>

                                                {Number(item.comPet) === 1 && (
                                                    <Text style={styles.detalhe}>
                                                        Com pet
                                                    </Text>
                                                )}

                                                {Number(
                                                    item.motoristaMasculino
                                                ) === 1 && (
                                                        <Text style={styles.detalhe}>
                                                            Prefere motorista masculino
                                                        </Text>
                                                    )}

                                                {Number(
                                                    item.motoristaFeminino
                                                ) === 1 && (
                                                        <Text style={styles.detalhe}>
                                                            Prefere motorista feminino
                                                        </Text>
                                                    )}

                                                <TouchableOpacity
                                                    style={
                                                        styles.botaoEscolher
                                                    }
                                                    onPress={() => confirmarSolicitacao(item)}
                                                >

                                                    <Text
                                                        style={
                                                            styles.botaoEscolherTexto
                                                        }
                                                    >
                                                        Escolher solicitação
                                                    </Text>

                                                    <Ionicons
                                                        name="arrow-forward"
                                                        size={18}
                                                        color="#FFFFFF"
                                                    />

                                                </TouchableOpacity>

                                            </View>

                                        )}

                                        {!estaExpandida && (

                                            <TouchableOpacity
                                                style={styles.botaoVer}
                                                onPress={() =>
                                                    alternarSolicitacao(
                                                        idCard
                                                    )
                                                }
                                            >

                                                <Text
                                                    style={
                                                        styles.botaoVerTexto
                                                    }
                                                >
                                                    Ver solicitação
                                                </Text>

                                                <Ionicons
                                                    name="chevron-down"
                                                    size={18}
                                                    color="#468B5B"
                                                />

                                            </TouchableOpacity>

                                        )}

                                    </View>
                                );
                            }
                        )}

                    </ScrollView>

                )}

            </Animated.View>

        </View>
    );
}