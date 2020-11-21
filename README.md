# electron-with-server-example

Updated version [@jlongster](https://github.com/jlongster)'s [example Electron app with server process as Node or background window](https://jlongster.com/secret-of-good-electron-apps) with some improvements (see [PR#8](https://github.com/jlongster/electron-with-server-example/pull/8)):

 - updated to latest versions of all packages (as of 2020-11-20), including Electorn 11
 - use of [contextIsolation](https://www.electronjs.org/docs/tutorial/security#3-enable-context-isolation-for-remote-content), [contextBridge](https://www.electronjs.org/docs/api/context-bridge), and preload script to create safer environment for the client code
 - various refactorings

Two versions are provided:

 - [master] - electron-forge + TypeScript + Webpack version
 - [feat/electron11-modern] - updated plain JS version

The electron-forge version utilizies the webpack-plugin's ability to produce different bundles for multiple node process (main and server-as-process), multiple renderer processes (client and server-as-window) and the preload scripts (client contextBridge) - see [forge config](config/forge.config.jsn), [renderer config](config/webpack.renderers.config.js), and [main config](config/webpack.main.config.js).

[master]: https://github.com/beorn/electron-with-server-example/

[feat/electron11-modern]: https://github.com/beorn/electron-with-server-example/tree/feat/electron11-modern
