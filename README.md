# HomeoHeal - Full Project (Expo + Admin + Scripts)

This archive contains:
- Expo React Native app (mobile) in root
- `data/remedies.json` sample database
- `scripts/convert_remedies.py` to convert CSV/XLSX -> JSON
- `eas.json` for Expo Application Services builds
- Simple Admin panel scaffold in `admin/` (React)

## Getting started (mobile)
1. Install dependencies: `npm install`
2. Start: `npm start` or `expo start`
3. For builds use EAS: `eas build -p android` and `eas build -p ios`

## Convert your spreadsheet
Run:
```
python scripts/convert_remedies.py --input path/to/your.xlsx --output data/remedies.json
```

## Firebase
Replace values in `src/firebase.js` with your Firebase project's config.

## Admin panel
Open `admin/` folder, run `npm install` and `npm start` to run the admin React app (very basic scaffold).

Note: This project contains placeholder keys and package names. Replace `com.yourdomain.homeoheal` and Firebase placeholders before publishing.
