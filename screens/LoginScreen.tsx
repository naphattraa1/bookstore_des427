// screens/LoginScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
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

const NAVY = "#1C3D6E";
const CREAM = "#F7F2E8";

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = () => {
    navigation.replace("Home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerWrapper}>
        {/* Title */}
        <Text style={styles.appTitle}>Bookstore</Text>
        <Text style={styles.subtitle}>Welcome back 👋</Text>

        {/* Login Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Login</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#A4978B"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#A4978B"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.loginButton} onPress={onLogin}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Signup")}
            style={{ marginTop: 16 }}
          >
            <Text style={styles.linkText}>
              Don't have an account?{" "}
              <Text style={styles.linkStrong}>Sign up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

// ---------- Styles ----------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CREAM,
    justifyContent: "center",   // << Center vertically
    alignItems: "center",       // << Center horizontally
    paddingHorizontal: 24,
  },

  innerWrapper: {
    width: "100%",
    alignItems: "center",
  },

  appTitle: {
    fontSize: 34,
    fontWeight: "700",
    color: NAVY,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 15,
    color: "#6A6259",
    marginBottom: 28,
    textAlign: "center",
  },

  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: NAVY,
    marginBottom: 18,
    textAlign: "center",
  },

  input: {
    backgroundColor: "#FFF6ED",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#E3D6C6",
    color: "#3A322B",
    marginBottom: 14,
    fontSize: 14,
  },

  loginButton: {
    backgroundColor: NAVY,
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: "center",
    marginTop: 4,
  },

  loginText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "700",
  },

  linkText: {
    textAlign: "center",
    color: "#6A6259",
    fontSize: 13,
  },

  linkStrong: {
    color: NAVY,
    fontWeight: "700",
  },
});