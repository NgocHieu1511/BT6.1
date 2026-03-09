import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { useState } from "react";

export default function App() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const phoneRegex = /^(0[0-9]{9}|84[0-9]{9})$/;

  // format và validate khi nhập
  const formatPhone = (text) => {
    const number = text.replace(/\D/g, "");

    let formatted = number;

    if (number.length <= 3) {
      formatted = number;
    } else if (number.length <= 6) {
      formatted = number.slice(0, 3) + " " + number.slice(3);
    } else if (number.length <= 8) {
      formatted =
        number.slice(0, 3) + " " + number.slice(3, 6) + " " + number.slice(6);
    } else {
      formatted =
        number.slice(0, 3) +
        " " +
        number.slice(3, 6) +
        " " +
        number.slice(6, 8) +
        " " +
        number.slice(8);
    }

    setPhone(formatted);

    // validation
    if (number.length === 0) {
      setError("");
    } else if (number.length < 10) {
      setError("Số điện thoại không đúng định dạng. Vui lòng nhập lại");
    } else if (!phoneRegex.test(number)) {
      setError("Số điện thoại không đúng định dạng. Vui lòng nhập lại");
    } else {
      setError("");
    }
  };

  // validation khi click button
  const validatePhone = () => {
    const rawPhone = phone.replace(/\s/g, "");

    if (phoneRegex.test(rawPhone)) {
      Alert.alert("Thông báo", "Số điện thoại hợp lệ");
    } else {
      Alert.alert(
        "Lỗi",
        "Số điện thoại không đúng định dạng. Vui lòng nhập lại",
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>

      <View style={styles.content}>
        <Text style={styles.label}>Nhập số điện thoại</Text>

        <Text style={styles.desc}>
          Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản OneHousing Pro
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nhập số điện thoại của bạn"
          keyboardType="phone-pad"
          maxLength={13}
          value={phone}
          onChangeText={formatPhone}
        />

        {error !== "" && <Text style={styles.error}>{error}</Text>}

        <Pressable
          onPress={validatePhone}
          style={[
            styles.button,
            { backgroundColor: phone ? "#0033ff" : "#ccc" },
          ]}
        >
          <Text style={styles.buttonText}>Tiếp tục</Text>
        </Pressable>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 24,
    marginLeft: 20,
  },

  content: {
    paddingHorizontal: 20,
  },

  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },

  desc: {
    fontSize: 13,
    marginBottom: 20,
    color: "#555",
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    fontSize: 16,
    paddingVertical: 8,
  },

  error: {
    color: "red",
    marginTop: 5,
    fontSize: 13,
  },

  button: {
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
