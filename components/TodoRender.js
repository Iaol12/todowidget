import { View,Text, Button } from "react-native"

const TodoRender = ({cont,index,removeTodo,reorderTodo}) => {
    
    return(
         <View className="flex-row items-center justify-evenly">
             <Text>
                {cont}
            </Text>  
             <Button title="zmazat!" onPress={()=>removeTodo(index)}>
            </Button> 
            <Button title="^" onPress={()=>reorderTodo(index,index-1)}></Button> 
            <Button title="\/" onPress={()=>reorderTodo(index,index+1)}></Button> 
        </View> 
    )
}
export default TodoRender