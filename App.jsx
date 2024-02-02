import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, NativeModules, Button, FlatList } from 'react-native';
import TodoRender from './components/TodoRender';

const SharedStorage = NativeModules.SharedStorage;

const App = () => {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Function to retrieve data from native side
    const fetchDataFromNative = async () => {
      try {
        const dataString = await SharedStorage.get(); 
        console.log(dataString);
        console.log("here");
        
        const data = JSON.parse(dataString);
        console.log(data);
  
        if (data && data.stringArray) {
          setTodos(data.stringArray);
        }
      } catch (error) {
        console.error('Error retrieving data from native side:', error);
      }
    };
  
    fetchDataFromNative();
  }, []);
  
  const handleSubmit = async () => {
    const data = {
      stringArray: todos,
    };
    console.log(data);
    console.log(todos);
    SharedStorage.set(JSON.stringify(data));
  };

  const AddTodo = () => {
    setTodos((prevTodos) => [...prevTodos, text]);
    setText(''); // Clear the text input after adding todo
  };

  return (
    <View className="mt-24 pt-24">
      <TextInput
        style={styles.input}
        onChangeText={(newText) => setText(newText)}
        value={text}
        returnKeyType="send"
        placeholder="Enter the text to display..."
      />
      <Button onPress={AddTodo} title="Click This NOW!" />
      <Button onPress={handleSubmit} title="Submit!" />
      <FlatList
          className="flex-grow-0"
            data={todos}
            renderItem={({ item }) => <TodoRender cont={item}/>}
          />
    </View>
  
  );
};

export default App;

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderBottomWidth: 1,
    fontSize: 20,
    minHeight: 40,
  },
});
