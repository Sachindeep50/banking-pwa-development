import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.hdfcbank.mobile',
  appName: 'HDFC Bank',
  webDir: 'www',
  server: {
    url: process.env.BANKING_APP_URL ?? 'http://localhost:3000',
    cleartext: true,
  },
  ios: {
    contentInset: 'always',
  },
  android: {
    allowMixedContent: false,
  },
}

export default config
