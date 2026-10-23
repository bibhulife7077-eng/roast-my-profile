import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.astrabyte.roastmyprofile',
  appName: 'Roast My Profile',
  webDir: 'out',
  server: { url: 'https://roast-my-profile-six.vercel.app', cleartext: false }
};

export default config;
