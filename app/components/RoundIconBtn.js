import React from 'react'
import { View, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
const RoundIconBtn = ({antIconName, size, color, style, onPress}) => {
    return <AntDesign 
    name={antIconName} 
    size={24} color={color}
    style={[styles.icon, { ...style },
    onPress={onPress}
    ]} />

}

const styles = StyleSheet.create({
    container: {
        icon: {
            selected: {
                padding: 15,
                borderRadius: 50,
                elevation: 5,
            },
          },
    }
})
export default RoundIconBtn;