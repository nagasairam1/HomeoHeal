# HomeoHeal - Expo React Native app (MVP)

## Prereqs
- Node.js (16+ recommended)
- npm or yarn
- Expo CLI: `npm install -g expo-cli` or use `npx expo start`
- For building Android/iOS follow Expo docs (EAS recommended for iOS)

## Install
1. Clone/copy project files
2. Run `npm install` or `yarn install`

## Run (development)
- Start Metro bundler: `npm start` or `expo start`
- Use Expo Go on your phone to scan the QR code (Android & iOS)
- Or run on emulator: `expo run:android` / `expo run:ios`

## Build for production
### Android
- For quick APK with classic build: `eas build -p android --profile production` (recommended)
- Or generate AAB via EAS: follow https://docs.expo.dev/eas

### iOS
- Apple Developer account required.
- Use EAS to build and submit: `eas build -p ios` then `eas submit` (follow Expo docs)

## Data
- `data/remedies.json` is the local database. Expand with your full remedies and clinical notes.
- Fields: id, name, indications (array), category, potency, dosage, notes, precautions

## Extending features (ideas)
- Add image assets, categories screen, filters
- Add chat bot backed by your knowledge base or integrate with ChatGPT (for guided suggestions)
- Add secure login and cloud sync (Firebase/Firestore)
- Add e-commerce / store integration

