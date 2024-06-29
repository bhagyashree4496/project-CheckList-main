import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Task = (props) => {
     
  return (
    <View style={styles.item}>
      <Text style={styles.itemText}>{props.text}</Text>
    </View>
  )
}

export default Task

const styles = StyleSheet.create({
     item:{
          padding:15,
     },
     itemText:{
          fontSize:18

     }
})