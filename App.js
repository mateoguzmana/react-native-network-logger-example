/**
 * Tracking user NetInfo
 * https://facebook.github.io/react-native/docs/netinfo
 */

import React, { Component } from "react";
import { NetInfo, StyleSheet, Text, View } from "react-native";
import { NetworkInfo } from "react-native-network-info";

export default class App extends Component {
  componentDidMount() {
    NetInfo.getConnectionInfo().then(connectionInfo => {
      console.log(
        "Initial, type: " +
          connectionInfo.type +
          ", effectiveType: " +
          connectionInfo.effectiveType
      );
    });
    function handleFirstConnectivityChange(connectionInfo) {
      console.log(
        "First change, type: " +
          connectionInfo.type +
          ", effectiveType: " +
          connectionInfo.effectiveType
      );
      NetInfo.removeEventListener(
        "connectionChange",
        handleFirstConnectivityChange
      );
    }
    NetInfo.addEventListener("connectionChange", handleFirstConnectivityChange);

    // Get Local IP
    NetworkInfo.getIPAddress(ip => {
      console.log(ip);
    });

    // Get IPv4 IP
    NetworkInfo.getIPV4Address(ipv4 => {
      console.log(ipv4);
    });

    // Get Broadcast
    NetworkInfo.getBroadcast(address => {
      console.log(address);
    });

    // Get SSID
    NetworkInfo.getSSID(ssid => {
      console.log(ssid);
    });

    // Get BSSID
    NetworkInfo.getBSSID(ssid => {
      console.log(ssid);
    });

    navigator.geolocation.getCurrentPosition(geo_success => {
      console.log(geo_success)
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
