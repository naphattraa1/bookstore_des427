// App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { CartProvider } from "./context/CartContext";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import HomeScreen from "./screens/HomeScreen";
import BookDetailScreen from "./screens/BookDetailScreen";
import CartScreen from "./screens/CartScreen";
import CheckoutScreen from "./screens/CheckoutScreen";

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  BookDetail: { bookId: string };
  Cart: undefined;
  Checkout: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="BookDetail"
            component={BookDetailScreen}
            options={{ title: "Book Detail" }}
          />
          <Stack.Screen
            name="Cart"
            component={CartScreen}
            options={{ title: "Your Cart" }}
          />
          <Stack.Screen
            name="Checkout"
            component={CheckoutScreen}
            options={{ title: "Checkout" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
};

export default App;