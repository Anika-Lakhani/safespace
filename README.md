# SafeSpace - Women's Safety App

A React Native mobile application focused on women's safety that displays user locations on a map and enables emergency alerts to nearby users.

## 🚀 Phase 1 MVP Features

### Core Functionality
- **Google Maps Integration**: Display user's current location with real-time tracking
- **Location Services**: Request and handle location permissions properly
- **Mock Nearby Users**: Simulate 5-10 fake users with random locations within 2km radius
- **Gender-Coded Pins**: Different colored markers for male (blue), female (pink), and non-binary (purple) users
- **Assistance Request System**: Single tap to request help from nearby users
- **Confirmation Dialog**: User-friendly confirmation with optional additional notes
- **Real-time Location Updates**: Location tracking every 30 seconds

### UI/UX Features
- **Clean, Professional Design**: Trustworthy and calming color scheme
- **Large, Accessible Button**: 60px height assistance button for easy access
- **Responsive Layout**: Works on both iOS and Android
- **Loading States**: Proper loading indicators and error handling
- **Permission Handling**: Graceful permission request and error states

## 🛠 Technical Stack

- **Framework**: React Native with Expo
- **Maps**: Google Maps API with react-native-maps
- **Location**: expo-location for location services
- **Icons**: @expo/vector-icons
- **State Management**: React hooks and context (prepared for future expansion)

## 📱 App Structure

```
src/
├── components/
│   ├── MapView.js              # Main map component with Google Maps
│   ├── AssistanceButton.js     # Emergency/assistance button
│   ├── UserPin.js              # Custom map markers
│   └── ConfirmationDialog.js   # Alert confirmation modal
├── screens/
│   ├── HomeScreen.js           # Main app screen
│   └── SettingsScreen.js       # Settings placeholder
├── services/
│   ├── LocationService.js      # Location tracking logic
│   ├── MockDataService.js      # Fake user data generation
│   └── AlertService.js         # Alert system (mock for Phase 1)
├── utils/
│   ├── permissions.js          # Location permissions handling
│   └── constants.js            # App constants and configuration
└── App.js                      # Root component
```

## 🎨 Design System

### Color Palette
- **Primary**: Deep Purple (#6B46C1) - Trustworthy, calming
- **Assistance**: Orange (#F59E0B) - Help indicator
- **Emergency**: Red (#EF4444) - Danger indicator (Phase 2)
- **Safe**: Green (#10B981) - Positive, safe feeling
- **Male**: Blue (#3B82F6) - Map marker
- **Female**: Pink (#EC4899) - Map marker
- **Non-Binary**: Purple (#8B5CF6) - Map marker

### Typography & Spacing
- **Button Height**: 60px minimum for accessibility
- **Border Radius**: 12px for modern feel
- **Padding**: 16px standard spacing
- **Header Height**: 60px

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18+ recommended)
- Expo CLI
- iOS Simulator or Android Emulator
- Google Maps API key

### Installation

1. **Clone the repository**
   ```bash
   git clone github.com/anika-lakhani/safespace
   cd safety-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Google Maps API**
   - Get a Google Maps API key from Google Cloud Console
   - Enable Maps SDK for iOS and Android
   - Add the API key to your Expo configuration

4. **Run the app**
   ```bash
   npm start
   ```

5. **Test on device/simulator**
   ```bash
   npm run ios     # For iOS
   npm run android # For Android
   ```

## 📋 Testing Checklist

### Core Functionality
- [ ] App opens and shows loading screen
- [ ] Location permission request appears
- [ ] Map displays with user location after permission granted
- [ ] Mock nearby users appear as colored dots
- [ ] Tapping user pins shows gender information
- [ ] Assistance button is prominent and accessible
- [ ] Confirmation dialog appears on button tap
- [ ] Additional notes can be added to assistance request
- [ ] Success message shows after sending assistance request
- [ ] Location updates every 30 seconds

### Error Handling
- [ ] App handles location permission denial gracefully
- [ ] Error messages appear for location failures
- [ ] App works when location services are disabled
- [ ] Loading states display properly

### UI/UX
- [ ] Clean, professional appearance
- [ ] Consistent color scheme throughout
- [ ] Large, accessible buttons
- [ ] Proper spacing and typography
- [ ] Responsive design on different screen sizes

## 🔮 Phase 2 Roadmap

### Authentication & User Management
- Phone number verification
- User profile creation
- Photo ID verification system

### Emergency Features
- 5-second hold emergency button
- Emergency contacts integration
- SMS alerts to emergency contacts
- Authority notification system

### Real-time Features
- Firebase integration for real user data
- Push notifications
- Real-time user location sharing
- Live alert system

### Privacy & Security
- Advanced privacy controls
- User visibility settings
- Data encryption
- Secure communication

### Enhanced UI/UX
- Alert history screen
- Settings configuration
- Battery optimization warnings
- Offline functionality

## 🛡️ Privacy & Safety Considerations

### Current Implementation (Phase 1)
- Mock data only - no real user information stored
- Location permissions handled properly
- No persistent data storage
- Clear permission requests

### Future Implementation (Phase 2+)
- User authentication required
- Location data anonymization
- Secure data transmission
- User consent and privacy controls
- Data retention policies

## 🤝 Contributing

This is a safety-critical application. All contributions should prioritize:
1. **User Safety**: Features must enhance user safety
2. **Privacy**: User privacy must be protected
3. **Reliability**: App must work consistently in emergency situations
4. **Accessibility**: App must be usable by all users

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## ⚠️ Important Notes

- This is a Phase 1 MVP with mock data
- Real emergency features will be implemented in Phase 2
- Always test thoroughly before deployment
- Consider legal and regulatory requirements for safety apps
- Implement proper security measures before production use

## 🆘 Emergency Disclaimer

This app is designed to assist users in requesting help but should not be considered a replacement for emergency services. In life-threatening situations, always contact local emergency services (911 in the US) immediately. 
