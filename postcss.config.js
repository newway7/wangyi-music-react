module.exports = {
    plugins: {
      autoprefixer: {},
      'postcss-pxtorem': {
        rootValue: 43.1,
        propList: ['*'],
        minPixelValue: 2
      }
    }
  };