import React from 'react';

import Inicial from '../screens/Inicial';
import Login from '../screens/Login';
import CadastroPassageiro from '../screens/CadastroPassageiro';
import CadastroMotorista from '../screens/CadastroMotorista';
import CadastroCarro from '../screens/CadastroCarro';
import RecuperarSenha from '../screens/RecuperarSenha';
import EditarPerfilMotorista from '../screens/EditarPerfilMotorista';
import EditarPerfilPassageiro from '../screens/EditarPerfilPassageiro';
import DrawerRoutes from './drawer.routes';
import CorridaFinalizadaPassageiro from '../screens/CorridaFinalizadaPassageiro';
import CorridaFinalizadaMotorista from '../screens/CorridaFinalizadaMotorista';
import Chat from '../screens/Chat';
import CorridaEmAndamento from '../screens/CorridaEmAndamento';
import EnvioGorjeta from '../screens/EnvioGorjeta';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="Inicial"
      screenOptions={{
        headerShown: false,
      }}
    >

      <Stack.Screen
        name="Inicial"
        component={Inicial}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="CadastroPassageiro"
        component={CadastroPassageiro}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="CadastroMotorista"
        component={CadastroMotorista}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="HomePassageiro"
        component={DrawerRoutes}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="HomeMotorista"
        component={DrawerRoutes}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="EditarPerfilPassageiro"
        component={EditarPerfilPassageiro}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="EditarPerfilMotorista"
        component={EditarPerfilMotorista}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="CadastroCarro"
        component={CadastroCarro}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="RecuperarSenha"
        component={RecuperarSenha}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="CorridaFinalizadaPassageiro"
        component={CorridaFinalizadaPassageiro}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="CorridaEmAndamento"
        component={CorridaEmAndamento}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="EnvioGorjeta"
        component={EnvioGorjeta}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="CorridaFinalizadaMotorista"
        component={CorridaFinalizadaMotorista}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  );
}