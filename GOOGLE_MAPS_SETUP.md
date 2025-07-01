# Google Maps API Setup Guide

## Prerequisites
- Google Cloud Console account
- Expo project with react-native-maps installed

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable billing for the project (required for Maps API)

## Step 2: Enable Maps APIs

1. Go to the **APIs & Services** > **Library**
2. Search for and enable the following APIs:
   - **Maps SDK for Android**
   - **Maps SDK for iOS**
   - **Places API** (optional, for future features)

## Step 3: Create API Key

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **API Key**
3. Copy the generated API key

## Step 4: Restrict API Key (Recommended)

1. Click on the created API key
2. Under **Application restrictions**, select:
   - **Android apps** for Android
   - **iOS apps** for iOS
3. Add your app's bundle identifier:
   - Android: `com.safespace.app`
   - iOS: `com.safespace.app`
4. Under **API restrictions**, select:
   - **Restrict key**
   - Select the enabled Maps APIs

## Step 5: Configure Expo

### Option A: Using app.config.js (Recommended)

Create `app.config.js` in your project root:

```javascript
export default {
  expo: {
    name: "SafeSpace",
    slug: "safespace",
    // ... other config
    ios: {
      // ... other iOS config
      config: {
        googleMapsApiKey: "YOUR_IOS_API_KEY_HERE"
      }
    },
    android: {
      // ... other Android config
      config: {
        googleMaps: {
          apiKey: "YOUR_ANDROID_API_KEY_HERE"
        }
      }
    }
  }
};
```

### Option B: Using app.json

Add to your `app.json`:

```json
{
  "expo": {
    "ios": {
      "config": {
        "googleMapsApiKey": "YOUR_IOS_API_KEY_HERE"
      }
    },
    "android": {
      "config": {
        "googleMaps": {
          "apiKey": "YOUR_ANDROID_API_KEY_HERE"
        }
      }
    }
  }
}
```

## Step 6: Environment Variables (Optional)

For better security, use environment variables:

1. Create `.env` file:
```
GOOGLE_MAPS_API_KEY_IOS=your_ios_api_key_here
GOOGLE_MAPS_API_KEY_ANDROID=your_android_api_key_here
```

2. Install expo-constants:
```bash
npm install expo-constants
```

3. Update app.config.js:
```javascript
import 'dotenv/config';

export default {
  expo: {
    // ... other config
    ios: {
      config: {
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY_IOS
      }
    },
    android: {
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY_ANDROID
        }
      }
    }
  }
};
```

## Step 7: Test Configuration

1. Run the app:
```bash
npm start
```

2. Test on device/simulator:
```bash
npm run ios
# or
npm run android
```

3. Verify that the map loads correctly with your location

## Troubleshooting

### Map not loading
- Check API key is correctly configured
- Verify APIs are enabled in Google Cloud Console
- Check bundle identifiers match
- Ensure billing is enabled

### Permission errors
- Verify location permissions are properly configured in app.json
- Check that expo-location plugin is configured

### Build errors
- Clear Expo cache: `expo start -c`
- Rebuild: `expo build:android` or `expo build:ios`

## Security Notes

- Never commit API keys to version control
- Use environment variables for production
- Restrict API keys to your app's bundle identifiers
- Monitor API usage in Google Cloud Console
- Set up billing alerts to avoid unexpected charges

## Cost Considerations

- Google Maps API has usage-based pricing
- First $200 of usage per month is free
- Monitor usage in Google Cloud Console
- Set up billing alerts for cost control 