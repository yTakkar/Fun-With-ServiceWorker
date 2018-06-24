const path = require('path')

module.exports = {
  entry: './public/js/main.js',
  output: {
    path: path.join(__dirname, '/public/js/'),
    filename: 'bundle.js'
  },
  mode: 'development',
  performance: {
    hints: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          'presets': ['env', 'stage-0']
        }
      }
    ]
  },
  watch: true
}

process.noDeprecation = true
