# Storybook Addon Addon React Native Server

Sync up multiple devices via websockets

## Installation

First, install the package.

```sh
npm install --save-dev @storybook/addon-react-native-server
```

Then, register it as an addon in `.storybook/main.js`.

```js
// .storybook/main.ts

const config = {
  // ...rest of config
  addons: [
    '@storybook/addon-essentials'
    '@storybook/addon-react-native-server', // 👈 register the addon here
  ],
  reactNativeServerOptions: {
    host: "localhost",
    port: 7007,
  },
};

export default config;
```

## Usage

Once you have the addon installed it automatically starts a websocket server to listen to events from your mobile devices. You must have reactNativeServerOptions defined and be in development mode for the server to start.

Once the server is running you can reload your mobile device to make sure it connects to the websocket server.

You can also use @storybook/addon-react-native-web to make sure the web version of your stories renders in the browser.

## Development

### Development scripts

- `npm run start` runs bundling in watch mode and starts Storybook
- `npm run build` build and package your addon code

Code for the server is located in src/preset.ts.
