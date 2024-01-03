import { View, Text,StyleSheet, Dimensions } from 'react-native'
import React from 'react'

const note = ({item}) => {
  const {title,desc} = item;
  return (
    <View style={styles.container}>
      <Text style={styles.title} numberOfLines={2}>{title}</Text>
      <Text numberOfLines={3}>{desc}</Text>
    </View>
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
        font
    }
})
export default note;