import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import Note from '../components/note';
const NoteContext = createContext();

const NoteProvider = ({children}) => {
  const [note, setNotes] = useState([]);
  
  const findNotes = async () => {
    const result = await AsyncStorage.getItem('notes');
    if (result !== null) setNotes(JSON.parse(result));
  };

  useEffect(() => {
    findNotes();
  }, []);

  return (
    <NoteContext.Provider value={{ Note, setNotes, findNotes }}>
      {children}
    </NoteContext.Provider>
  );
}
export const useNotes = () => useContext(NoteContext);
export default NoteProvider;

