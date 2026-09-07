import React from 'react';

import Inicial from '../screens/Inicial';
import CadastroPassageiro from '../screens/CadastroPassageiro';
import Login from '../screens/Login';
import EditarPerfilPassageiro from '../screens/EditarPerfilPassageiro';
import CadastroCarro from '../screens/CadastroCarro';
import RecuperarSenha from '../screens/RecuperarSenha';

import DrawerRoutes from './drawer.routes';

import { createStackNavigator } from '@react-navigation/stack';
import CadastroMotorista from '../screens/CadastroMotorista';

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
        headerShown
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="HomeMotorista"
        component={DrawerRoutes}
        headerShown
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="EditarPerfilPassageiro"
        component={EditarPerfilPassageiro}
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

    </Stack.Navigator>
  );
}