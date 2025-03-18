import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: "emobra.app",
  appName: "emObra",
  webDir: "dist",
  plugins: {
    ScreenOrientation: {
      allowRotation: false,
      orientation: "portrait"
    }
  }
};

export default config;
