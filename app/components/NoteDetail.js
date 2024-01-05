import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState }  from 'react';
import { useHeaderHeight } from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack';
const NoteDetail = props => {
    const [note, ] = useState(props.route.params.note);
    const headerHeight = useHeaderHeight();
  return (
    <ScrollView
    contentContainerStyle={[styles.container, { paddingTop: headerHeight }]}>
    
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.desc}>{note.desc}</Text>
    </ScrollView>
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
})

export default NoteDetail;