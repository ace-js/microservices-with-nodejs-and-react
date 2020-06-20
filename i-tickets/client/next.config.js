module.exports = {
  webpackDevMiddleware: (config) => {
    config.watchOptions.poll = 300; // watch fill change detection every 300ms
    return config;
  },
};
