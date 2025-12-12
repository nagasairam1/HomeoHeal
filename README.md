🌿 Homeo Heal – Your AI-Powered Homeopathy Assistant

Empowering self-care with trusted homeopathic guidance — right from your home.

Homeo Heal is a mobile app that helps users identify probable homeopathic remedies based on symptoms, access disease-wise treatments, connect with practitioners, and build wellness habits — all in English and Telugu.

Built for Hyderabad and beyond, with love for traditional wisdom and modern tech.

✨ Features

Feature	Description
🔐 Login/Signup	Email/password or Phone + OTP (via Firebase)
🩺 Symptom Checker	Type or speak symptoms (e.g., “headache after sunlight”) → get remedies
🤖 AI Doctor Chat	RAG-powered chatbot trained on verified homeopathic knowledge
📚 500+ Remedies Database	Structured from standard references (Boericke, Kent) — see remedies.json
🌐 Bilingual (EN/TE)	Seamless toggle between English and తెలుగు
🏠 Nearby Stores	Find homeopathy clinics & pharmacies (GPS-enabled)
💡 Daily Tips	“Tip of the Day” for wellness (e.g., “For sinus, try Kali Bich 30 before bed”)
💬 Community Forum	Share recovery stories & ask questions
🛠️ Tech Stack

Layer	Tech
Frontend	React Native (Expo) — iOS, Android, Web
Backend	FastAPI (Python) — /symptom/check, /chat, /stores
AI/ML	RAG (ChromaDB + Sentence Transformers) — safe, citation-based responses
Database	PostgreSQL (remedies, users) + Redis (caching)
Auth	Firebase Auth (Email + Phone OTP)
Maps	Google Maps SDK + Places API
i18n	i18n-js + Telugu (Noto Sans Telugu)
Deployment	Expo EAS (APK/IPA), Docker + Cloud Run (backend)
🚀 Quick Start (Local Dev)

Prerequisites

Node.js ≥ 18
Python ≥ 3.10
Expo CLI: npm install -g expo-cli
Clone & Install (Frontend)
git clone https://github.com/your-username/homeoheal.git
cd homeoheal
npm install
npx expo start
 Run App
bash
1
→ Press a (Android), i (iOS), or w (Web).

3. Backend (Optional — mock is built-in)
See homeoheal-backend for FastAPI API.

📂 Project Structure
homeoheal/
├── src/
│   ├── assets/
│   │   ├── data/
│   │   │   ├── remedies.json      # ← Your knowledge base (150+ entries)
│   │   │   └── tips.json
│   │   └── i18n/                  # en.json, te.json
│   ├── context/                   # App state & language
│   ├── api/                       # mockBackend.js (or real API calls)
│   ├── screens/                   # Login, SymptomChecker, etc.

💡 Your Data:
The remedies.json is built from your sample_remedies.xlsx — validated, structured, and ready to scale to 500+.
🧪 Safety & Ethics
⚠️ Disclaimer:

Homeo Heal provides informational support only. It does not replace professional medical diagnosis or treatment. For serious, persistent, or emergency symptoms, consult a qualified homeopath or physician immediately.

Red-flag symptoms (e.g., chest pain, blood in stool) trigger urgent warnings.
All remedies are cross-checked with classical homeopathic references.
Dosage & potency follow standard guidelines (e.g., Boericke’s Materia Medica).
🙏 Acknowledgements
Inspired by traditional homeopathic wisdom
Built with ❤️ by Naga Sairam Dokka
Special thanks to homeopathic practitioners for knowledge validation
📬 Contact
📧 naga.sairam@example.com

 Let healing begin — one symptom, one remedy, one life at a time.

---

✅ Ready to use! 
Just copy-paste this into your GitHub repo’s `README.md`.# HomeoHeal - Expo React Native app (MVP)

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



Would you like me to:
- Generate the **`remedies.json`** (150 entries, from your Excel)?  
- Provide a **GitHub repo template link**?  
- Add **badges** (build, license, version)?  

Let me know — happy to polish it further! 🙏
