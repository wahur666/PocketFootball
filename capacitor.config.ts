import {CapacitorConfig} from "@capacitor/cli";

const config: CapacitorConfig = {
  "appId": "com.wahur666.pocketfootball",
  "appName": "PocketFootball",
  "webDir": "dist",
  "plugins": {
    "SplashScreen": {
      "launchShowDuration": 0
    }
  },
  android: {
      buildOptions: {
          signingType: "apksigner",
          keystorePath: "C:/Users/Imre/.android/debug.keystore",
          releaseType: "APK",
          keystoreAlias: "androiddebugkey",
          keystorePassword: "android"
      }
  }
}

export default config;
