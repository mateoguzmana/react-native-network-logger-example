"use strict";

import { NetInfo } from "react-native";
import {NetworkInfo} from "react-native-network-info";

class NetworkMonitor {
  start() {
    this.netMonitoring();
  }

  /**
   * Monitor initial net information and listen connection changes.
   */
  netMonitoring() {
    NetInfo.getConnectionInfo().then(connectionInfo => {
      console.log(
        "Initial, type: " +
          connectionInfo.type +
          ", effectiveType: " +
          connectionInfo.effectiveType
      );
    });

    NetInfo.addEventListener("connectionChange", connectionInfo =>
      this.handleConnectivityChange(connectionInfo)
    );
  }

  /**
   * Handles Connection Changes
   * @param {Object} connectionInfo
   */
  handleConnectivityChange(connectionInfo) {
    // If connection changes
    this.logInfo(connectionInfo);

    NetInfo.removeEventListener(
      "connectionChange",
      this.handleConnectivityChange
    );
  }

  /**
   * Gets General Network Info, Network Specific Info and Geolocation Info.
   * @param {Object} connectionInfo
   */
  logInfo(connectionInfo) {
    // General connection info
    console.log(connectionInfo);

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

    // Get Geolocation
    navigator.geolocation.getCurrentPosition(geo_success => {
      console.log(geo_success);
    });
  }
}

export default NetworkMonitor;
