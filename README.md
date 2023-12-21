# Yummy

Yummy is a user-friendly and fully responsive recipe app that answers the million dollar question: "What am I going to eat?". You can browse through our popular recipes, popular vegan recipes, different cuisine types or search for recipes with the ingredients that you have on hand. You can also create an account and store your favorite recipes in one place!

## Built with

- `React`
- `Typescript`
- `Bootstrap`
- `Firebase`
- `Spoonacular API`

## Getting Started

This section will guide you how to get a local copy of the project up and running.

### Prerequisites

- npm
  ```sh
  npm install -g npm@latest
  ```

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/StoyanKyopchev/yummy.git
   ```
2. Install the necessary NPM packages
   ```sh
   npm install
   ```
3. Obtain a free API key from Spoonacular by following the steps below

   - Visit the [Spoonacular API website](https://spoonacular.com/food-api) and create a free account by clicking on the green button (Start Now) at the top right corner.
   - After you have created an account, log in and navigate to your API Console section.
   - In the API console section, click on "Profile" and there you can generate your free API key.

4. Create a free Firebase project by following the steps below

   - Visit the [Firebase console](https://console.firebase.google.com) and log in with your Google account.
   - Click on "Add project" and follow the simple 2 step process there.
   - Once that is done, click on your project and on the menu to the left, head to the Authentication section. There, click on the Email/Password field and make sure that it is enabled.
   - On the menu to the left click on Project Overview at the top. Click the icon for web app </>. Give it a name and after that you will be able to see the necessary configuration settings on your screen.

5. Create a file called .env.local in the main repo folder and enter your Spoonacular API key & Firebase API settings there
   ```js
   REACT_APP_SPOONACULAR_API_KEY=Your API key generated from the Spoonacular console
   REACT_APP_FIREBASE_API_KEY=Your API key generated from Firebase
   REACT_APP_FIREBASE_AUTH_DOMAIN=...
   REACT_APP_FIREBASE_PROJECT_ID=...
   REACT_APP_FIREBASE_STORAGE_BUCKET=...
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=...
   REACT_APP_FIREBASE_APP_ID=...
   ```
6. Run the project
   ```sh
   npm start
   ```
