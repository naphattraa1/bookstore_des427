// screens/SignupScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../App";
import { database } from "../firebase/firebase";
import { ref, push, set } from "firebase/database";

type SignupScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Signup"
>;

type Props = {
  navigation: SignupScreenNavigationProp;
};

const NAVY = "#1C3D6E";
const CREAM = "#F7F2E8";

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignup = () => {
    navigation.replace("Login");
  };
  
  const handleSignup = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const usersRef = ref(database, "users");
      const newUserRef = push(usersRef);
      await set(newUserRef, { email: email.trim(), password }); // plain text as requested
      alert("Signup success. Please login.");
      navigation.navigate("Login"); // ถ้าหน้าชื่ออื่น ปรับชื่อได้
    } catch (err) {
      console.error("Signup error:", err);
      alert("Signup failed");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.innerWrapper}>
        {/* Title Section */}
        <Text style={styles.appTitle}>Join Bookstore</Text>
        <Text style={styles.subtitle}>Create your account ✨</Text>

        {/* Signup Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sign Up</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#A4978B"
            autoCapitalize="none"
            keyboardType="email-address"
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

          <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
            <Text style={styles.signupText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginTop: 16 }}
          >
            <Text style={styles.linkText}>
              Already have an account?{" "}
              <Text style={styles.linkStrong}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignupScreen;

// ---------------- STYLES ----------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CREAM,
    justifyContent: "center", // center vertically
    alignItems: "center",     // center horizontally
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
    marginBottom: 26,
    textAlign: "center",
  },

  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 20,
    color: NAVY,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 18,
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

  signupButton: {
    backgroundColor: NAVY,
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: "center",
    marginTop: 4,
  },

  signupText: {
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