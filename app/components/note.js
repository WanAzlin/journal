import { View, Text,StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'

const note = ({item, onPress}) => {
  const {title,desc} = item;
  return (
     
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text style={styles.title} numberOfLines={2}>{title}</Text>
            <Text numberOfLines={3}>{desc}</Text>
        </TouchableOpacity>


    
  )
}
const width = Dimensions.get('window').width - 40;
const styles = StyleSheet.create({
    container:{
        backgroundColor: "#D0D3D4",
        width: width/2 - 10,
        padding: 8,
        borderRadius: 10,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold'
    }
})
export default note;