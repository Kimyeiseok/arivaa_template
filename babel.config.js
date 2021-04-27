module.exports = function (api) {
  api.cache(false);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['import', { libraryName: '@ant-design/react-native' }],
      [
        './plugins/babel-directory-import',
        {
          noModifyCase: true,
          exts: ['json', 'js'],
        },
      ],
    ],
  };
};
