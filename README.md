# 🏡 Property Analyzer

Property Analyzer is a modern, full-stack real estate investment platform built with React and Vite. It allows investors to instantly fetch property data, calculate ROI, view interactive expense breakdowns, get AI-powered investment insights, and manage their deals via a secure dashboard.

## ✨ Features

* **Instant Property Data:** Fetches real-time property details and rent estimates using the RentCast API and Google Maps Autocomplete.
* **Advanced ROI Calculator:** Calculates Monthly Cash Flow, Cap Rate, Cash-on-Cash ROI, Net Operating Income (NOI), and Gross Yield.
* **Interactive Dashboards:** Visualizes expense breakdowns using Recharts.
* **AI Investment Insights:** Leverages Google's Gemini AI to summarize deal potential and highlight risks.
* **User Authentication:** Secure email and social login powered by Firebase Auth.
* **Saved Deals:** Users can save properties to their personal Firestore database to review later.
* **Subscription Management:** Integrated with Stripe (via Firebase Extensions) for Free and Pro tiers.

## 🛠️ Tech Stack

* **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, React Router, Recharts, Framer Motion
* **Backend as a Service:** Firebase (Auth, Firestore)
* **Payments:** Stripe (via Firebase "Run Payments with Stripe" Extension)
* **APIs:** Google Maps Places API, RentCast API, Google Gemini AI API


## 🚀 Local Development Setup

### Prerequisites
Before you begin, ensure you have the following installed:
* [Node.js](https://nodejs.org/) (v18 or higher)
* [Git](https://git-scm.com/)

You will also need to create accounts and get API keys for:
1. **Firebase:** Create a project, enable Authentication, and set up a Firestore Database.
2. **Stripe:** Create an account and grab your Secret Test Key (`sk_test_...`).
3. **Google Cloud:** Enable the "Places API" and generate an API key.
4. **RentCast API:** Create a free account at RentCast.io for real estate data.
5. **Google AI Studio:** Get an API key for Gemini.

### 1. Clone the repository

```bash
git clone [https://github.com/yourusername/property-analyzer.git](https://github.com/yourusername/property-analyzer.git)
cd property-analyzer
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables Configuration

Create a file named `.env` in the root directory of your project. Add the following variables and replace the placeholder text with your actual API keys:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY="your_firebase_api_key"
VITE_FIREBASE_AUTH_DOMAIN="your_firebase_auth_domain"
VITE_FIREBASE_PROJECT_ID="your_firebase_project_id"
VITE_FIREBASE_STORAGE_BUCKET="your_firebase_storage_bucket"
VITE_FIREBASE_MESSAGING_SENDER_ID="your_messaging_sender_id"
VITE_FIREBASE_APP_ID="your_firebase_app_id"

# Third-Party APIs
VITE_GOOGLE_MAPS_API_KEY="your_google_maps_places_api_key"
VITE_RENTCAST_API_KEY="your_rentcast_api_key"
VITE_GEMINI_API_KEY="your_google_gemini_api_key"
```
*(Note: Never commit your `.env` file to public GitHub repositories. It is included in `.gitignore` by default).*

### 4. Firebase Stripe Extension Setup
To enable the "Upgrade to Pro" functionality:
1. Upgrade your Firebase Project to the **Blaze (Pay-as-you-go)** plan.
2. Go to the **Extensions** tab in Firebase.
3. Install the **Run Payments with Stripe** extension.
4. Provide your Stripe **Secret Key** (`sk_test_...`) during installation.
5. Once installed, copy the exact Price ID from your Stripe Dashboard (e.g., `price_12345ABC...`) and paste it into `src/components/Profile.tsx` inside the `handleUpgrade` function.

### 5. Start the Development Server

```bash
npm run dev
```
The app will now be running at `http://localhost:5173`.


## 🌐 Deploying to Netlify

This application uses React Router. To ensure that direct links (like `/profile` or `/analyze`) work correctly in production without throwing a 404 error, a special redirects file is required.

### Step 1: Add the Redirects File
1. Navigate to the `public` folder in your project.
2. Create a new file named EXACTLY `_redirects` (no file extension).
3. Add the following line to the file:
```text
/* /index.html 200
```
4. Save the file and push your changes to GitHub.

### Step 2: Connect to Netlify
1. Log in to [Netlify.com](https://www.netlify.com/).
2. Click **Add new site** -> **Import an existing project**.
3. Choose **GitHub** and authorize access.
4. Select your `property-analyzer` repository.

### Step 3: Configure Build Settings
Netlify should automatically detect the Vite setup, but verify the following:
* **Build command:** `npm run build`
* **Publish directory:** `dist`

### Step 4: Add Environment Variables
Before clicking Deploy, click on **Environment Variables** (or Advanced Build Settings). 
You must add every variable from your local `.env` file here:
* `VITE_FIREBASE_API_KEY`
* `VITE_GOOGLE_MAPS_API_KEY`
* `VITE_RENTCAST_API_KEY`
* `VITE_GEMINI_API_KEY`
* *(...and the rest of your Firebase config)*

### Step 5: Deploy
Click **Deploy site**. Netlify will build your project and provide you with a live, secure HTTPS URL.


## 📄 License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.