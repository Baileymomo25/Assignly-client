import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.yourcompany.assignly',
  appName: 'Assignly',
  webDir: 'dist', // This is your React build folder
  server: {
    androidScheme: 'https'
  }
};

export default config;