const path = require('path')

console.log('webpack')

console.log(path.resolve(__dirname, 'test'))
module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'backpack.js'
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' }
    ]
  },
  resolve: {
    alias: {
      '@root': path.resolve(__dirname, './'),
      '@test': path.resolve(__dirname, 'test'),
      '@src': path.resolve(__dirname, 'src')
    }
  }
}
