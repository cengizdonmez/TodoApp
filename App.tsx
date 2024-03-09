import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import List from './app/screens/List';
import Detail from './app/screens/Detail';
import { View } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Todolarım" component={List} />
          <Stack.Screen name="Detay" component={Detail} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

