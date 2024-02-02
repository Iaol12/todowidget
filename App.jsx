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

  // ked sa zmenia tak updatni
  useEffect(() => {
    console.log('Todos have changed!');
    handleSubmit();
  }, [todos]);
  
  const handleSubmit = async () => {
    const data = {
      stringArray: todos,
    };
    SharedStorage.set(JSON.stringify(data));
  };

  const removeTodo = (index) => {
    const updatedTodos = [...todos.slice(0, index), ...todos.slice(index + 1)];
    setTodos(updatedTodos);
  };
  const AddTodo = () => {
    setTodos((prevTodos) => [...prevTodos, text]);
    setText(''); 
  };
  const reorderTodo = (currentIndex, targetIndex) => {
    if (currentIndex < 0 || currentIndex >= todos.length || targetIndex < 0 || targetIndex >= todos.length) {
      return;
    }

    const updatedTodos = [...todos];
    const [removedTodo] = updatedTodos.splice(currentIndex, 1);
    updatedTodos.splice(targetIndex, 0, removedTodo);

    setTodos(updatedTodos);
    
  };

  return (
    <View className="mt-24 pt-24 flex-1">
      <TextInput
        style={styles.input}
        onChangeText={(newText) => setText(newText)}
        value={text}
        returnKeyType="send"
        placeholder="Enter the text to display..."
      />
      <Button onPress={AddTodo} title="Click This NOW!" />
      <FlatList
          className="flex-grow-0"
            data={todos}
            renderItem={({ item, index }) => <TodoRender cont={item} index={index} removeTodo={removeTodo} reorderTodo={reorderTodo} />}
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
