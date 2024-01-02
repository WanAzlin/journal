import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react'
import { Colors } from './misc/color';
import { StyleSheet, Text, View } from 'react-native';
import SearchBar from '../../components/searchbar';
import { Ionicons } from '@expo/vector-icons';
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
            <SearchBar containerStyle={{ marginVertical: 15 }}/>
            <View style={[StyleSheet.absoluteFillObject,styles.emptyHeaderContainer]}>
                <Text style={styles.emptyHeader}> Add Journal </Text>
                <Ionicons onPress={() => console.log('opening modal')} style={styles.PlusIconBtn} name="add-circle" size={80} color="black" />
            </View>
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
    searchBar: {
        borderWidth: 0.5,
        borderColor:"#707B7C",
        height: 40,
        borderRadius: 40,
        paddingLeft: 15,
        fontSize: 20,
      },
    container: {
        paddingHorizontal: 20,
        flex: 1,
        zIndex: 1,
      },
    emptyHeader: {
        fontSize: 30,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        opacity: 0.2,
      },
    emptyHeaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: -1,
      },
      PlusIconBtn: {
        position: 'absolute',
        right: 15,
        bottom: 50,
        zIndex: 1,
      },
  });
  
