import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomePassageiro from '../screens/HomePassageiro';

import CustomDrawer from '../components/CustomDrawer';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes({ route }) {

  const nome = route.params?.nome?.split(' ')[0] ?? 'Usuário';

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawer {...props} nome={nome} />
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
      <Drawer.Screen
        name="HomePassageiro"
        component={HomePassageiro}
        options={{headerShown: false}}
        initialParams={{ nome }}
      />

    </Drawer.Navigator>
  );
}