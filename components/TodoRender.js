import { View,Text } from "react-native"
import Icon from 'react-native-vector-icons/AntDesign';

const TodoRender = ({cont,index,removeTodo,reorderTodo}) => {
    const generateRandomColor = () => {
        const baseColor = [30, 16, 23]; 
        const randomHue = baseColor[0] + cont.charCodeAt(0) - 102;
        const randomSaturation = baseColor[1] + cont.charCodeAt(0) - 120;
        const randomLightness = baseColor[2] + cont.charCodeAt(0) - 100;

        return `hsl(${randomHue}, ${randomSaturation}%, ${randomLightness}%)`;
    };

    const backgroundColor = generateRandomColor();
    return(
         <View className="flex-row items-center justify-evenly" style={{backgroundColor:backgroundColor}}>
          <View> 
          <Icon.Button backgroundColor="#1E293B" name="arrowup" onPress={()=>reorderTodo(index,index-1)}></Icon.Button> 
            <Icon.Button backgroundColor="#1E293B" name="arrowdown" onPress={()=>reorderTodo(index,index+1)}></Icon.Button> 
         </View> 
         <Text className="flex-1 pl-3">
                {cont}
            </Text>       
            <Icon.Button backgroundColor="transparent" name="closecircleo" onPress={()=>removeTodo(index)}></Icon.Button> 
        </View> 
    )
}
export default TodoRender