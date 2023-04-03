import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import MainScreen from "./components/MainScreen";
import QRCodeScreen from "./components/QRCodeSreen";

const Stack = createStackNavigator();

export default function Navigate() {
  return <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen 
        name="Main"
        component={MainScreen}
        options={
          {
            title : "QR-code generator/scanner",
            headerTitleStyle: {  
              color: 'white',
              fontSize: 25
            },
            headerStyle: { 
              backgroundColor: 'black',
            },
            cardStyle: {
              backgroundColor: '#373737',
              color: 'white'
            }                      
          }
        }
      />     
      <Stack.Screen 
        name="QRCode"
        component={QRCodeScreen}
        options={
          {
            title : "Your QR-code",
            headerTitleStyle: {  
              color: 'white',
              fontSize: 25
            },
            headerStyle: { 
              backgroundColor: 'black',
            },
            cardStyle: {
              backgroundColor: '#373737',
              color: 'white'
            }                      
          }
        }
      />      
    </Stack.Navigator>
  </NavigationContainer>
}