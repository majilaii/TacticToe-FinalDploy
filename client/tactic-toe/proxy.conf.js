const PROXY_CONFIG = {
  "/api": {
      "target": "https://tacticsmellytoes.fly.dev",
      "changeOrigin": true,
      "secure": false,
      "logLevel": "debug",
      "pathRewrite": {
          "^/api": ""
      }
 }
};
module.exports = PROXY_CONFIG;