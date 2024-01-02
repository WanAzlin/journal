import { Text, View, TextInput, StyleSheet, StatusBar, Dimensions,  onPress} from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Intro = ({ onFinish }) => {
    const [name, setName] = useState('');
    const handleOnChangeText = text => setName(text);
    const handleSubmit = async () => {
        const user = { name: name };
        await AsyncStorage.setItem('user', JSON.stringify(user));
        if (onFinish) onFinish();
      };
    return (
        <>
        <StatusBar hidden/>
        <View style = {styles.container}>
            <Text style={styles.inputTitle}> Enter Your Name to Continue</Text>
            <TextInput value={name} onChangeText={handleOnChangeText} placeholder='Enter Name' style={styles.TextInput}/>
            
            {name.trim().length >= 3 ? (
                <AntDesign style={styles.RoundIconBtn} name="arrowright" size={24} color="black" onPress={handleSubmit}  />
            ) : null}
        
        </View>
        </>
    )
}
const width = Dimensions.get('window').width - 50;
const styles = StyleSheet.create ({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    TextInput: {
        borderWidth: 2,
        borderColor: "#707B7C",
        width,
        height: 50,
        borderRadius: 10,
        paddingLeft: 15,
        fontSize: 25,
        marginBottom: 15,
    },
    inputTitle:{
        alignSelf: 'flex-start',
        paddingLeft: 25,
        marginBottom: 5,
        opacity: 0.5,
    },
    RoundIconBtn:{
        padding: 10,
        borderRadius: 20,
        elevation: 5,
       
        borderWidth: 2,
    },
});

export default Intro;