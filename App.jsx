import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, NativeModules, Button, FlatList,LayoutAnimation,
  Platform,UIManager } from 'react-native';
import TodoRender from './components/TodoRender';
import Icon from 'react-native-vector-icons/AntDesign';

const SharedStorage = NativeModules.SharedStorage;

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

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
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    const updatedTodos = [...todos.slice(0, index), ...todos.slice(index + 1)];
    setTodos(updatedTodos);
  };
  const AddTodo = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    text !== "" ? setTodos((prevTodos) => [...prevTodos, text]) : null;

    setText(''); 
  };
  const reorderTodo = (currentIndex, targetIndex) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    if (currentIndex < 0 || currentIndex >= todos.length || targetIndex < 0 || targetIndex >= todos.length) {
      return;
    }

    const updatedTodos = [...todos];
    const [removedTodo] = updatedTodos.splice(currentIndex, 1);
    updatedTodos.splice(targetIndex, 0, removedTodo);

    setTodos(updatedTodos);
    
  };

  return (
    <View className="mt-10 flex-1 bg-slate-800">
    
     <View className="flex-1"> 
      <FlatList
            className="flex-grow-0"
              
              data={todos}
              
              renderItem={({ item, index }) => <TodoRender cont={item} index={index} removeTodo={removeTodo} reorderTodo={reorderTodo} />}
            />
    </View> 
    
    <View className="items-center justify-evenly bg-slate-900 h-1/5" > 
      <TextInput 
          style={styles.input}
          onChangeText={(newText) => setText(newText)}
          value={text}
          returnKeyType="send"
          placeholder="Sem píšte"
      />
      
      <Icon.Button backgroundColor="transparent" size={50} name="pluscircleo" onPress={AddTodo} />
    </View> 
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  input: {
    width: '90%',
    borderBottomWidth: 1,
    borderRadius:15,
    fontSize: 20,
    minHeight: 40,
    backgroundColor:"purple"
  },
});
