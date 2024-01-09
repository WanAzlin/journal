import { Modal, StyleSheet, Text, TextInput, View,  TouchableWithoutFeedback, Keyboard,  } from 'react-native'
import { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
 

const NoteInputModal = ({visible, onClose,onSubmit }) => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const handleModalClose = () => {
        Keyboard.dismiss();
      };
const handleOnChangeText = (text, valueFor) => {
        if (valueFor === 'title') setTitle(text);
        if (valueFor === 'desc') setDesc(text);
      };
    // console.log(title, desc);
    const handleSubmit = () => {
       onSubmit(title, desc);
       setTitle('');
       setDesc('');
       onClose();
         
       
      };
    const closeModal = () => {
        setTitle('');
        setDesc('');
        onClose();
    }
     
  return <Modal visible={visible} animationType='fade'>
     <View style={styles.container}>
        <TextInput value={title}   onChangeText={text => handleOnChangeText(text, 'title')}placeholder="Title" style={[styles.input, styles.title]} />
        <TextInput  value={desc} 
            onChangeText={text => handleOnChangeText(text, 'desc')}
            multiline placeholder="Notes"style={[styles.input, styles.desc]} /> 
        <View style={styles.btnCont}>
        <View style={styles.btnSubmit}>
            
            <AntDesign  name="check" size={24} color="white"  onPress={handleSubmit}/>
            
         </View>
         <View style={styles.btnSubmit}>
            
            
           { title.trim() || desc.trim ? ( <AntDesign name="close" size={24} color="white" onPress={closeModal}  /> ) : null}
         </View>
         
         </View>

    </View>
    <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
        </TouchableWithoutFeedback>
  </Modal>
}

const styles = StyleSheet.create({
    input: {
        borderBottomWidth: 2,
        borderBottomColor: "#232123",
        fontSize: 20,
        paddingTop: 70,
        color: "#2C2E2F",
      },
      container: {
        paddingHorizontal: 20,
        paddingTop: 15,
      },
      title: {
        
        marginBottom: 15,
        fontWeight: 'bold',
      },
      desc: {
        height: 100,
        fontWeight: 'bold',
      },
      modalBG: {
        flex: 1,
        zIndex: -1,
      },
      btnSubmit: {
        paddingHorizontal: 20,
        justifyContent: 'center',
        paddingVertical: 20,
        backgroundColor: "#707B7C",
        borderRadius: 20,
        marginTop: 20,
      },
      btnCont: {
        
        flexDirection: 'row',
      },
      
})

export default NoteInputModal;