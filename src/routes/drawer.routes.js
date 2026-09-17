import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomePassageiro from '../screens/HomePassageiro';
import HomeMotorista from '../screens/HomeMotorista';

import CadastroContatosEmergenciais from '../screens/CadastroContatosEmergenciais';
import CadastroContatosEmergenciaisMotorista from '../screens/CadastroContatosEmergenciaisMotorista';

import CaronasDisponiveis from '../screens/CaronasDisponiveis';
import CaronasSolicitadas from '../screens/CaronasSolicitadas';

import CorridaFinalizadaPassageiro from '../screens/CorridaFinalizadaPassageiro';

import HistoricoPassageiro from '../screens/HistoricoPassageiro';
import HistoricoMotorista from '../screens/HistoricoMotorista';

import CustomDrawerPassageiro from '../components/CustomDrawerPassageiro';
import CustomDrawerMotorista from '../components/CustomDrawerMotorista';

import MotoristasFavoritos from '../screens/MotoristasFavoritos';

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

          <Drawer.Screen
            name="CaronasSolicitadas"
            component={CaronasSolicitadas}
            initialParams={{
              idMotorista: idMotorista,
            }}
            options={{
              headerShown: false,
            }}
          />

          <Drawer.Screen
            name="HistoricoMotorista"
            component={HistoricoMotorista}
            initialParams={{
              idMotorista: idMotorista,
              nome: nome,
              tipoUsuario: 'motorista',
            }}
            options={{
              headerShown: false,
            }}
          />

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

          <Drawer.Screen
            name="HistoricoPassageiro"
            component={HistoricoPassageiro}
            initialParams={{
              idPassageiro: idPassageiro,
              nome: nome,
              tipoUsuario: 'passageiro',
            }}
            options={{
              headerShown: false,
            }}
          />

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

          <Drawer.Screen
            name="MotoristasFavoritos"
            component={MotoristasFavoritos}
          />

        </>

      )}

    </Drawer.Navigator>
  );
}