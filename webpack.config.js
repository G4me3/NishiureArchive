const webpack=require('webpack');
const path=require("path");

module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: "development",

  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: "./src/index.ts",

  output:{
    filename:"index.js",
    path:path.join(__dirname,"./dist/js/")
  },

  module: {
    rules: [
      {
        // 拡張子 .ts の場合
        test: /\.ts$/,
        // TypeScript をコンパイルする
        use: "ts-loader",
      },
    ],
  },
  // import 文で .ts ファイルを解決するため
  // これを定義しないと import 文で拡張子を書く必要が生まれる
  // フロントエンドの開発では拡張子を省略することが多いので、
  // 記載したほうがトラブルに巻き込まれにくい
  resolve: {
    // 拡張子を配列で指定
    extensions: [".ts", ".js"],
  },
  // ES5(IE11等)向けの指定
  target: ["web", "es5"],
  externals: {
    jQuery: "$",
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.$': 'jquery',
      _: 'lodash',
      'window._': 'lodash',
    }),
  ],
  
};