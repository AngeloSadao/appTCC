import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomePassageiro from '../screens/HomePassageiro';
import HomeMotorista from '../screens/HomeMotorista';

import CadastroContatosEmergenciais from '../screens/CadastroContatosEmergenciais';
import CadastroContatosEmergenciaisMotorista from '../screens/CadastroContatosEmergenciaisMotorista';

import CaronasDisponiveis from '../screens/CaronasDisponiveis';
import CorridaFinalizadaPassageiro from '../screens/CorridaFinalizadaPassageiro';

import CustomDrawerPassageiro from '../components/CustomDrawerPassageiro';
import CustomDrawerMotorista from '../components/CustomDrawerMotorista';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes({ route }) {

  const nome =
    route.params?.nome?.split(' ')[0] ?? 'Usuário';

  const tipoUsuario =
    route.params?.tipoUsuario ?? 'passageiro';

  const idPassageiro =
    route.params?.idPassageiro;

  const idMotorista =
    route.params?.idMotorista;

  const isMotorista =
    tipoUsuario === 'motorista';

  return (
    <Drawer.Navigator

      drawerContent={(props) =>
        isMotorista ? (
          <CustomDrawerMotorista
            {...props}
            nome={nome}
            idMotorista={idMotorista}
          />
        ) : (
          <CustomDrawerPassageiro
            {...props}
            nome={nome}
            idPassageiro={idPassageiro}
          />
        )
      }

      screenOptions={{
        drawerStyle: {
          width: 280,
          backgroundColor: '#000',
          borderColor: isMotorista
            ? '#468B5B'
            : '#435E91',
          borderRightWidth: 30,
        },
        headerShown: false,
      }}
    >

      {isMotorista ? (

        <>
          {/* HOME MOTORISTA */}

          <Drawer.Screen
            name="HomeMotorista"
            component={HomeMotorista}
            initialParams={{
              nome: nome,
              idMotorista: idMotorista,
              tipoUsuario: 'motorista',
            }}
            options={{
              headerShown: false,
            }}
          />

          {/* CONTATOS DE EMERGÊNCIA MOTORISTA */}

          <Drawer.Screen
            name="CadastroContatosEmergenciaisMotorista"
            component={CadastroContatosEmergenciaisMotorista}
            initialParams={{
              idMotorista: idMotorista,
            }}
            options={{
              headerShown: false,
            }}
          />

        </>

      ) : (

        <>
          {/* HOME PASSAGEIRO */}

          <Drawer.Screen
            name="HomePassageiro"
            component={HomePassageiro}
            initialParams={{
              nome: nome,
              idPassageiro: idPassageiro,
              tipoUsuario: 'passageiro',
            }}
            options={{
              headerShown: false,
            }}
          />

          {/* CONTATOS DE EMERGÊNCIA PASSAGEIRO */}

          <Drawer.Screen
            name="CadastroContatosEmergenciais"
            component={CadastroContatosEmergenciais}
            initialParams={{
              idPassageiro: idPassageiro,
            }}
            options={{
              headerShown: false,
            }}
          />

          {/* CARONAS DISPONÍVEIS */}

          <Drawer.Screen
            name="CaronasDisponiveis"
            component={CaronasDisponiveis}
            initialParams={{
              idPassageiro: idPassageiro,
              nome: nome,
            }}
            options={{
              headerShown: false,
            }}
          />

          {/* HISTÓRICO DE CARONAS */}

          <Drawer.Screen
            name="CorridaFinalizadaPassageiro"
            component={CorridaFinalizadaPassageiro}
            initialParams={{
              idPassageiro: idPassageiro,
              nome: nome,
            }}
            options={{
              headerShown: false,
            }}
          />

        </>

      )}

    </Drawer.Navigator>
  );
}