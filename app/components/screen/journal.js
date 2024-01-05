
import React, {useState, useEffect} from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { FlatList, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View,  } from 'react-native';
import SearchBar from '../../components/searchbar';
import NoteInputModal from '../NoteInputModal';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Note from '../note';
import { AntDesign } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import NoteDetail from '../NoteDetail';
const Stack = createStackNavigator();

const formatDate = ms => {
    const date = new Date(ms);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hrs = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
  
    return `${2024} `;
  };

export default function journal({user,navigation, }) {
    const [greet, setGreet] = useState('Evening');
    const [modalVisible, setModalVisible] = useState(false);
    const [notes, setNotes] = useState([]);
  
    const findGreet = () => {
        const hrs = new Date().getHours();
        if (hrs === 0 || hrs < 12) return setGreet('Morning');
        if (hrs === 1 || hrs < 17) return setGreet('Afternoon');
        setGreet('Evening');
        console.log(hrs);
      };
      const findNotes = async () => {
        const result = await AsyncStorage.getItem('notes');
        
        if (result !== null) setNotes(JSON.parse(result));
      }
    useEffect(() => {
       AsyncStorage.clear()
        //findNotes()
        findGreet();
      }, []);

      const openNote = note => {
        navigation.navigate('NoteDetail', { note });
      };

      const handleOnSubmit = async (title, desc) => {
        const note = { id: Date.now(), title, desc, time: Date.now() };
        const updatedNotes = [...notes, note];
        setNotes(updatedNotes);
        await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
      };
      
      
      return (
        
    <>
    
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
              <Text style={styles.header}>{`Good ${greet} ${user.name}`} </Text>
              {notes.length ? (
              <SearchBar containerStyle={{ marginVertical: 15 }} />
                ): null }
                 <View style={styles.btnContainer}>
              <Ionicons  style={{ marginBottom: 15 }}name="trash" size={34} color="black" onPress={() => console.log('deleting')} />
              <AntDesign  style={{ marginBottom: 15 }}name="edit" size={34} color="black"  onPress={() => console.log('editing')}/>
              </View>
              <Text style={styles.time}>{`${formatDate(Note.time)}`}</Text>
              <FlatList 
                data={notes} 
                numColumns={2} 
                columnWrapperStyle={{ justifyContent: 'space-between',
                marginBottom: 15 }} 
                keyExtractor={item => item.id.toString()
                } renderItem={({item}) => <Note onPress={() => openNote(item)} item = {item}/>}
                /> 
                {!notes.length ? (
              <View style={[StyleSheet.absoluteFillObject, styles.emptyHeaderContainer]}>
                  <Text style={styles.emptyHeader}> Add Journal </Text>
                  
              </View>
              ): null}
          </View>
          </TouchableWithoutFeedback>
          <Ionicons onPress={() => setModalVisible(true)} style={styles.PlusIconBtn} name="add-circle" size={80} color="black" />
    
          <NoteInputModal
              visible={modalVisible}
              onClose={() => setModalVisible(false)}
              onSubmit={handleOnSubmit} />
       
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
      time: {
        fontWeight: 'bold',
        fontSize: 30,
        opacity: 0.5,
        marginLeft: 8,
        paddingTop: 8,
        color: "#000000",
      },
      btnContainer: {
        position: 'absolute',
        left: 20,
        bottom: 50,
        
      },
  });
  
