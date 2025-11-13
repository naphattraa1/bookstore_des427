// screens/LoginScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "../App";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;
type Props = {
  navigation: LoginScreenNavigationProp;
  route: RouteProp<RootStackParamList, "Login">;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = () => {
    // ยังไม่เชื่อม backend -> แค่ navigate ไป Home พอ
    navigation.replace("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bookstore Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={onLogin} />

      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.link}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  link: {
    marginTop: 16,
    textAlign: "center",
    color: "#007AFF",
  },
});

export default LoginScreen;