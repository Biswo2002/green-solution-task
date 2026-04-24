module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        // Mirror tsconfig paths: "$/*" and "~/*" -> ./src/*
        alias: {
          '^\\$/(.*)$': './src/\\1',
          '^~/(.*)$': './src/\\1',
        },
      },
    ],
  ],
};
