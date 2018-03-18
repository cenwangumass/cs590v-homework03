module.exports = {
  entry: {
    geojson: "./src/geojson.js",
    leaflet: "./src/leaflet.js"
  },
  output: {
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: "url-loader"
      }
    ]
  }
};
