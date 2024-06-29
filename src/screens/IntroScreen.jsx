import {
  StyleSheet,
  Text,
  TextInput,
  StatusBar,
  View,
  Button,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const IntroScreen = ({ navigation }) => {
  //function to getUserName
  const [userName, setUserName] = useState("");
  //   useEffect(() => {
  //         const getUserName = async () => {
  //           const savedUserName = await AsyncStorage.getItem("userName");
  //           if (savedUserName) {
  //             navigation.navigate("HomeScreen");
  //           }
  //         };
  //         getUserName();
  //   }, []);

  const saveUserName = async () => {
    if (userName.trim()) {
      await AsyncStorage.setItem("userName", userName);
      navigation.navigate("HomeScreen");
    }
  };
  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <Text style={styles.txt}>Enter Your Name:</Text>
        <TextInput
          styles={styles.inputBox}
          value={userName}
          onChangeText={(txt) => setUserName(txt)}
          placeholder="Name"
        />

        <TouchableOpacity style={styles.button} onPress={saveUserName}>
          <Text style={styles.txt}>save</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default IntroScreen;
const width = Dimensions.get("window").width - 50;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  txt: {
    alignSelf: "flex-start",
    paddingLeft: 25,
    marginBottom: 10,
  },
  inputBox: {
    borderWidth: 2,
    borderColor: "#6f2dbd",
    width,
    height: 50,
    borderRadius: 10,
    paddingLeft: 15,
    fontSize: 20,
    color: "#6f2dbd",
    marginBottom: 15,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6f2dbd",
    padding: 10,
    borderRadius: 5,
  },
  txt: {
    color: "#b298dc",
  },
});
