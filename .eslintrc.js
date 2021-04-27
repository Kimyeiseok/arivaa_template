module.exports = {
  root: true,
  extends: ['@react-native-community', 'plugin:react/recommended'],
  plugins: ['unused-imports'],
  rules: {
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': ['warn'],
  },
};
