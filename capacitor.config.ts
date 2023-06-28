import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.allio.app',
  appName: 'all.io',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
