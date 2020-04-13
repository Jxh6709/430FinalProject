const path = require('path');
const webpackMergeAndIncludeGlobally = require('webpack-merge-and-include-globally');
const glob = require('glob');

module.exports = {
  module: {
    rules: [
        {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader"
        }
      }
    ]
  },  
  entry: {
      loginBundle: glob.sync("./client/login/*.js"),
      login: glob.sync("./client/login/*.js"")
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'hosted'),
  },
 
};