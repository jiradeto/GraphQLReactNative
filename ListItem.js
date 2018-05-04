import React, { Component } from 'react';
import {
  TouchableOpacity,
  FlatList,
  Platform,
  Button,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default props => {
  const { todo } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{todo.title}</Text>
      <View style={styles.line} />
      <View
        style={{
          position: 'absolute',
          right: 0
        }}
      >
        <TouchableOpacity style={styles.delete} onPress={props.onPress}>
          <Text> x</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  container: {
    backgroundColor: 'white',
    paddingTop: 20
  },
  line: {
    marginHorizontal: 8,
    backgroundColor: '#c4c4c4',
    height: 1
  },
  delete: {
    width: 30,
    height: 30,
    padding: 5,
    backgroundColor: '#d5d5d5'
  }
});
