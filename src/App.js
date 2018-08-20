import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import NetworkMonitor from "react-native-network-monitor";

export default class App extends Component {
  networkMonitor = new NetworkMonitor();

  componentDidMount() {
    this.networkMonitor.start(data => {
      console.log(data)
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.intro}>React Native Network Logger Example</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  intro: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
