import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomePassageiro from '../screens/HomePassageiro';
import HomeMotorista from '../screens/HomeMotorista';

import CustomDrawer from '../components/CustomDrawer';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes({ route }) {

  const nome = route.params?.nome?.split(' ')[0] ?? 'Usuário';
  const tipoUsuario = route.params?.tipoUsuario ?? 'passageiro';

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawer
          {...props}
          nome={nome}
        />
      )}
      screenOptions={{
        drawerStyle: {
          width: 280,
          backgroundColor: '#000',
          borderColor: '#435E91',
          borderRightWidth: 30,
        },
      }}
    >

      {tipoUsuario === 'passageiro' ? (

        <Drawer.Screen
          name="HomePassageiro"
          component={HomePassageiro}
          options={{ headerShown: false }}
          initialParams={{
            nome: nome
          }}
        />

      ) : (

        <Drawer.Screen
          name="HomeMotorista"
          component={HomeMotorista}
          options={{ headerShown: false }}
          initialParams={{
            nome: nome
          }}
        />

      )}

    </Drawer.Navigator>
  );
}

