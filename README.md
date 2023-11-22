https://github.com/StoyanKyopchev/yummy/assets/115925638/a7957130-9b32-44bc-8af8-97d99af0da9e

# Yummy

Yummy is a user-friendly recipe app that answers the million dollar question: "What am I going to eat?". You can browse through our popular recipes, popular vegan recipes, different cuisine types or search for recipes with the ingredients that you have on hand.

## Built with

- `React`
- `Typescript`
- `Bootstrap`
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

4. Create a file called .env.local in the main repo folder and enter your Spoonacular API key there
   ```js
   REACT_APP_SPOONACULAR_API_KEY=Your API key generated from the Spoonacular console
   ```
5. Run the project
   ```sh
   npm start
   ```
