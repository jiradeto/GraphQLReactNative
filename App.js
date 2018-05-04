import React, { Component } from 'react';
import {
  TextInput,
  FlatList,
  Platform,
  Button,
  StyleSheet,
  Text,
  View
} from 'react-native';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import ListItem from './ListItem';

class App extends Component {
  state = {
    title: '',
    todos: []
  };

  componentWillMount() {
    this.fetchTodos();
  }

  fetchTodos() {
    this.props.client
      .query({
        query: gql`
          query Todos {
            todos {
              id
              title
            }
          }
        `
      })
      .then(res => {
        if (res.data) {
          console.log('fetchTodos', res.data);
          this.setState({
            todos: res.data.todos
          });
        }
      });
  }

  deleteTodo(id) {
    this.props.client
      .mutate({
        mutation: gql`
          mutation AddToto($id: String!) {
            destroy(id: $id) {
              id
            }
          }
        `,
        variables: { id }
      })
      .then(res => {
        let newTodos = this.state.todos.filter(item => {
          item.id != id;
        });
        this.setState({
          todos: this.state.todos.filter(item => item.id !== id)
        });
      });
  }

  addTodo() {
    this.props.client
      .mutate({
        mutation: gql`
          mutation AddToto($title: String!) {
            add(title: $title) {
              title
              id
            }
          }
        `,
        variables: { title: this.state.title }
      })
      .then(res => {
        this.setState({
          todos: [
            ...this.state.todos,
            { id: res.data.add.id, title: res.data.add.title }
          ],
          title: ''
        });
      });
  }

  renderItem(i) {
    return (
      <ListItem todo={i.item} onPress={() => this.deleteTodo(i.item.id)} />
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            height: 30,
            marginTop: 10,
            marginBottom: 30,
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'center'
          }}
        >
          <TextInput
            style={{
              paddingLeft: 5,
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              width: 200
            }}
            onChangeText={title => this.setState({ title })}
            value={this.state.title}
          />
          <Button style={{}} title="Add" onPress={this.addTodo.bind(this)} />
        </View>

        <FlatList
          style={{ flex: 1 }}
          data={this.state.todos}
          renderItem={this.renderItem.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 22,
    backgroundColor: '#F5FCFF'
  }
});

export default withApollo(App);
