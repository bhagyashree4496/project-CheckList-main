import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddChecklistScreen from "./AddChecklistScreen";

const HomeScreen = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [checklists, setChecklists] = useState([]);
  const [greet, setGreet] = useState("");
  const [id, setId] = useState("");

  const findGreet = () => {
    const hrs = new Date().getHours();
    //    console.log(hrs);
    if (hrs === 0 || hrs < 12) return setGreet("Morning");
    if (hrs === 1 || hrs < 17) return setGreet("Afternoon");
    setGreet("Evening");
  };

  useEffect(() => {
    // AsyncStorage.clear();
    findGreet();
  }, []);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     const getUserInfo = async () => {
  //       const savedUserName = await AsyncStorage.getItem("userName");
  //       setUserName(savedUserName);

  //       const savedChecklists = await AsyncStorage.getItem("checklists");
  //       if (savedChecklists) {
  //         setChecklists(JSON.parse(savedChecklists));
  //       }
  //     };
  //     getUserInfo();
  //   }, [])
  // );
  useEffect(() => {
    const getUserInfo = async () => {
      const savedUserName = await AsyncStorage.getItem("userName");
      setUserName(savedUserName);

      const savedChecklists = await AsyncStorage.getItem("checklists");
      if (savedChecklists) {
        setChecklists(JSON.parse(savedChecklists));
      }
    };
    getUserInfo();
  }, []);
  const deleteChecklist = async (id) => {
    const newChecklists = checklists.filter((cl, i) => cl.id !== id);
    setChecklists(newChecklists);
    await AsyncStorage.setItem("checklists", JSON.stringify(newChecklists));
  };
  return (
    <View style={styles.container}>
      <Text style={styles.greet}> {`Good ${greet} ${userName}`}</Text>

      {/* Hello {userName} */}
      {/* <FlatList
        data={checklists}
        renderItem={(checklist, index) => (
          <TouchableOpacity
            style={styles.title}
            onPress={() =>
              navigation.navigate("DetailsScreen", {
                checklists,
                setChecklists,
                checklist,
              })
            }
          >
            <Text style={styles.txtTitle}>{checklist.title}</Text>
            <TouchableOpacity onPress={() => deleteChecklist(checklist.id)}>
              <Text
                style={{
                  width: 25,
                  height: 25,
                  backgroundColor: "#fff",
                  borderRadius: 50,
                  textAlign: "center",
                }}
              >
                X
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      /> */}
      {checklists.map((checklist) => {
        return (
          <TouchableOpacity
            style={styles.title}
            onPress={() => {
              setId(checklist.id);
              navigation.navigate("DetailsScreen", {
                checklists,
                setChecklists,
                checklist,
                id,
              });
            }}
          >
            <Text style={styles.txtTitle}>{checklist.title}</Text>
            <TouchableOpacity onPress={() => deleteChecklist(checklist.id)}>
              <Text
                style={{
                  width: 25,
                  height: 25,
                  backgroundColor: "#fff",
                  borderRadius: 50,
                  textAlign: "center",
                }}
              >
                X
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("AddChecklistScreen", {
            checklists,
            setChecklists,
          })
        }
      >
        <Text style={styles.txt}>Add Checklist</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    // marginVertical:10
  },
  greet: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#6f2dbd",
    // textDecorationLine:'underline',
    textTransform: "uppercase",
    textAlign: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#6f2dbd",
    padding: 10,
  },
  txt: {
    color: "#fff",
  },
  title: {
    backgroundColor: "#fff",

    // borderColor:'',

    justifyContent: "space-between",
    flexDirection: "row",

    padding: 15,
    width: "90%",
    backgroundColor: "#b298dc",
    margin: 10,
    borderRadius: 10,
  },
  txtTitle: {
    fontSize: 16,
    textTransform: "capitalize",
    color: "#fff",
  },
});
