/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './screens/HomeScreen';
import { FinancesScreen } from './screens/FinancesScreen';
import { getDbConnection, createDebtTable } from './finance-db-service';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const initDbs = async () => {
    const db = await getDbConnection();

    if (db) {
        await createDebtTable(db);
    }
  };

  useEffect(() => {
    initDbs();
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          name="Finances"
          component={FinancesScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
