import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native'
import React, { useState }  from 'react';
import { useHeaderHeight } from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNotes } from '../context/NoteProvider';
const formatDate = ms => {
  const date = new Date(ms);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hrs = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  return `${day}/${month}/${year} - ${hrs}:${min}:${sec}`;
};

const NoteDetail = props => {
    const [note, setNote ] = useState(props.route.params.note);
    const headerHeight = useHeaderHeight();
    const {setNotes} = useNotes()
    const deleteNote = async () => {
        const result = await AsyncStorage.getItem('notes');
        let notes = [];
        if (result !== null) notes = JSON.parse(result);
    
        const newNotes = notes.filter(n => n.id !== note.id);
        setNotes(newNotes);
        await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
        props.navigation.goBack();
      };
    const displayDeleteAlert = () => {
        Alert.alert(
          'Are You Sure!',
          'This action will delete your note permanently!',
          [
            {
              text: 'Delete',
              onPress: deleteNote,
            },
            {
              text: 'No Thanks',
              onPress: () => console.log('no thanks'),
            },
          ],
          {
            cancelable: true,
          }
        );
      };
  return (
    <>
    <ScrollView
    contentContainerStyle={[styles.container, { paddingTop: headerHeight }]}>
      <Text style={styles.time}>{`Created At ${formatDate(note.time)}`}</Text>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.desc}>{note.desc}</Text>
      
    </ScrollView>
    <View style={styles.btnContainer}>
    <AntDesign style={{  marginBottom: 15}} onPress={displayDeleteAlert} name="delete" size={34} color="black" />
    <AntDesign style={{  marginBottom: 15}} onPress={() => console.log('editing note')}name="edit" size={34} color="black" />
  </View>
  </>
  )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        paddingHorizontal: 15,
    },
    title: {
        fontSize: 30,
        color: "#D32776",
        fontWeight: 'bold',
    },
    desc: {
        fontSize: 20,
        opacity: 0.6,
    },
    time: {
        textAlign: 'right',
        fontSize: 12,
        opacity: 0.5,
      },
      btnContainer: {
        position: 'absolute',
        right: 10,
        bottom: 50,
      },
})

export default NoteDetail;