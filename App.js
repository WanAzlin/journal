import { StyleSheet, Text, View } from 'react-native';
import Intro from './app/components/screen/intro';
import Journal from './app/components/screen/journal';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoteDetail from './app/components/NoteDetail';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NoteProvider from './app/context/NoteProvider';

export default function App() {
  const Stack = createStackNavigator();
  const [user, setUser] = useState({});
  const findUser = async () => {
    const result = await AsyncStorage.getItem('user');
    if(result !== null){
       setUser(JSON.parse(result))
    }
  };
  useEffect(() => {
    
    findUser();
   
  }, []);
  const renderJournal = props => <Journal{...props} user={user} />;
  if(!user.name) return<Intro onFinish={findUser}/>;
  return  (
  <NavigationContainer>
     <NoteProvider>
    <Stack.Navigator
      screenOptions={{ headerTitle: '', headerTransparent: true }}
    >
      <Stack.Screen component={renderJournal} name='Journal' />
      <Stack.Screen component={NoteDetail} name='NoteDetail' />
    </Stack.Navigator>
    </NoteProvider>
</NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
},
);

