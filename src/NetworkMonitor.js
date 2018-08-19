"use strict";

import { NetInfo } from "react-native";
import { NetworkInfo } from "react-native-network-info";
import BackgroundFetch from "react-native-background-fetch";

class NetworkMonitor {
  /**
   * Starting Monitor Network
   */
  start() {
    /**
     * Starts Monitoring
     */
    this.netMonitoring();

    /**
     * Starts Background Monitoring
     */
    this.startBackgroundMonitoring();
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
    this.getGeolocation();
  }

  /**
   * Get GeoLocation
   */
  getGeolocation() {
    navigator.geolocation.getCurrentPosition(geo_success => {
      console.log(geo_success);
    });
  }

  /**
   * Start background monitoring
   */
  startBackgroundMonitoring() {
    // Configure it.
    BackgroundFetch.configure(
      {
        minimumFetchInterval: 15, // <-- minutes (15 is minimum allowed)
        stopOnTerminate: false, // <-- Android-only,
        startOnBoot: true // <-- Android-only
      },
      () => {
        console.log("[js] Received background-fetch event");
        // Getting Geolocation in background
        this.getGeolocation();
        // Required: Signal completion of your task to native code
        // If you fail to do this, the OS can terminate your app
        // or assign battery-blame for consuming too much background-time
        BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA);
      },
      error => {
        console.log("[js] RNBackgroundFetch failed to start");
      }
    );

    // Optional: Query the authorization status.
    BackgroundFetch.status(status => {
      switch (status) {
        case BackgroundFetch.STATUS_RESTRICTED:
          console.log("BackgroundFetch restricted");
          break;
        case BackgroundFetch.STATUS_DENIED:
          console.log("BackgroundFetch denied");
          break;
        case BackgroundFetch.STATUS_AVAILABLE:
          console.log("BackgroundFetch is enabled");
          break;
      }
    });
  }
}

export default NetworkMonitor;
