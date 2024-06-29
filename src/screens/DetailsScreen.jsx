import {
  Button,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Task from "../components/Task";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DetailsScreen = ({ route, navigation }) => {
  const { checklists, setChecklists, checklist, id } = route.params;
  const { items } = checklist;
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([...items]);

  const handleAddTask = () => {
    // Keyboard.dismiss();
    // if (task) {
    //   setTaskItems([...taskItems, task]);
    //   setTask(null);
    // }
    const newItem = { id: Date.now().toString(), isChecked: false, name: task };
    setTaskItems([...taskItems, newItem]);
    setTask("");
  };

  const deleteAll = () => {
    // let itemsCopy = [];
    // setTaskItems(itemsCopy);
    setTaskItems([]);
  };

  const completeTask = (id) => {
    const newTaskItems = taskItems.filter((task) => task.id !== id);
    setTaskItems(newTaskItems);
  };
  const handleSaveLocally = async () => {
    const newChecklists = checklists.map((cl) =>
      cl.id === checklist.id
        ? { ...cl, items: [...cl.items, ...taskItems] }
        : cl
    );
    console.log(newChecklists);
    setChecklists(newChecklists);
    AsyncStorage.setItem("checklists", JSON.stringify(newChecklists));
    navigation.navigate("HomeScreen");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.txtTitle}>{checklist?.title}</Text>
      <TouchableOpacity style={styles.removeAll} onPress={() => deleteAll()}>
        <Text style={styles.removeAllText}>Remove All</Text>
      </TouchableOpacity>
      <ScrollView>
        <View>
          <View style={styles.item}>
            {taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index} style={styles.checklistCard}>
                  <TouchableOpacity onPress={() => completeTask(item.id)}>
                    <Text
                      style={{
                        width: 25,
                        height: 25,
                        margin: 15,
                        backgroundColor: "#fff",
                        borderRadius: 50,
                        textAlign: "center",
                      }}
                    >
                      X
                    </Text>
                  </TouchableOpacity>

                  <Text>{item.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <KeyboardAvoidingView>
        <View style={styles.writeTaskWrapper}>
          <TextInput
            placeholder="Enter your task"
            style={styles.inputBox}
            value={task}
            onChangeText={(txt) => setTask(txt)}
          />
          <TouchableOpacity
            style={styles.plusbtn}
            onPress={() => handleAddTask()}
          >
            <Text style={{ alignSelf: "center", fontSize: 16 }}>+</Text>
          </TouchableOpacity>
        </View>
        <Button
          title="save locally"
          onPress={() => {
            handleSaveLocally();
          }}
        ></Button>
      </KeyboardAvoidingView>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  writeTaskWrapper: {
    display: "flex",
    flexDirection: "row",
    // width:'100%'
    margin: 2,
  },
  inputBox: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 2,
    // borderRadius:5,
    borderColor: "#6f2dbd",
    textAlign: "center",
    fontSize: 16,
    padding: 10,
  },
  plusbtn: {
    backgroundColor: "#6f2dbd",
    alignSelf: "center",
    width: 30,
    height: 50,
  },
  txtTitle: {
    backgroundColor: "#6f2dbd",
    color: "white",
    textAlign: "center",
    fontSize: 20,
    padding: 10,
    fontWeight: "bold",
  },
  removeAll: {
    flex: 0,
    justifyContent: "flex-end",
    width: "100%",
    flexDirection: "row",
    margin: 10,
  },
  removeAllText: {
    fontSize: 16,
    // fontWeight:700,
    backgroundColor: "red",
    color: "#fff",
    width: 110,
    textAlign: "center",
    padding: 5,
    borderRadius: 10,
    marginRight: 15,
  },
  checklistCard: {
    flexDirection: "row",
    alignItems: "center",
    width: "95%",
    backgroundColor: "#b298dc",
    margin: 5,
    borderRadius: 10,
  },
});
