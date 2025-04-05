import {View, TouchableOpacity, Text} from 'react-native'
import { router } from 'expo-router';

export default function FormApp(){
    const paths = [
        {name: "Register", route: "/Exercise_8/Register"},
        {name: "Login", route: "/Exercise_8/Login"},
    ]

    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            gap: 10
        }}>
            {paths.map((path, i) => (
                <TouchableOpacity
                style={{
                    borderWidth: 2,
                    borderColor: "black",
                    padding: 10,
                    borderRadius: 10,
                    width: '30%'
                    
                }}
                key={i}
                 onPress={() => path.route && router.push(path.route)}
                ><Text style={{ textAlign: "center"}}>{path.name}</Text></TouchableOpacity>
            ))}
        </View>
    );
}