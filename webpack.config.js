import * as path from 'path';

const __dirname = path.resolve();
// exclude license
module.exports = {
  entry: './src/main.ts',
  mode: 'production',
  target: 'node16',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
