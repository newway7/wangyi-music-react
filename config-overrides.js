const {
  override,
  fixBabelImports,
  addPostcssPlugins
} = require('customize-cra');

module.exports = override(

  addPostcssPlugins([require('postcss-pxtorem')({
    rootValue: 43.1,
    propList: ['*'],
    minPixelValue: 2
  }), 
])
);