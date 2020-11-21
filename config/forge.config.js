module.exports = {
  
  plugins: [
    ["@electron-forge/plugin-webpack", {
      mainConfig: "./config/webpack.main.config.js",
      renderer: {
        config: "./config/webpack.renderers.config.js",
        entryPoints: [{
          name: "client",
          html: "./src/client/client-index.html",
          js: "./src/client/client-app.ts",
          preload: { js: "./src/client/client-preload.ts" }
        }, {
          name: "server",
          html: "./src/server/server-dev.html",
          js: "./src/server/server.ts"
        }]
      }
    }]
  ],

  makers: [{
    name: "@electron-forge/maker-squirrel",
    config: { name: "electron-with-server-example" }
  }, {
    name: "@electron-forge/maker-zip",
    platforms: ["darwin"]
  }, {
    name: "@electron-forge/maker-deb",
    config: {}
  }, {
    name: "@electron-forge/maker-rpm",
    config: {}
  }]
}
