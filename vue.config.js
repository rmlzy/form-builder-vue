module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/public/vue/" : "/",
  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:1028",
      },
    },
  },
};
