import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react'
import { Colors } from './misc/color';
import { StyleSheet, Text, View } from 'react-native';

export default function journal({user}) {
    const [greet, setGreet] = useState('Evening');
    const findGreet = () => {
        const hrs = new Date().getHours();
        if (hrs === 0 || hrs < 12) return setGreet('Morning');
        if (hrs === 1 || hrs < 17) return setGreet('Afternoon');
        setGreet('Evening');
        console.log(hrs);
      };
    useEffect(() => {
        findGreet();
      }, []);
  return (
        <>
        
        <View style ={styles.container}>
            <Text style={styles.header}>{`Good ${greet} ${user.name}`} </Text>
        </View>
        </>
  );
}

const styles = StyleSheet.create({
    header: {
        fontSize: 25,
        fontWeight: 'bold',
        paddingTop: 60,
        paddingLeft: 15
    },
  });
  
