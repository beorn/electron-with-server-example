# electron-with-server-example

Updated version @jlongster's [example Electron app with server process as Node or background window](https://jlongster.com/secret-of-good-electron-apps) with some improvements:

 - updated to latest versions of all packages (as of 2020-11-20), including Electorn 11
 - use of [contextIsolation](https://www.electronjs.org/docs/tutorial/security#3-enable-context-isolation-for-remote-content), [contextBridge](https://www.electronjs.org/docs/api/context-bridge), and preload script to create safer environment for the client code
 - various refactorings (see [PR#8](https://github.com/jlongster/electron-with-server-example/pull/8))

Two versions are provided:

 - [master] - electron-forge + TypeScript + Webpack version
 - [feat/electron11-modern] - updated plain JS version

The electron-forge version utilizies the webpack-plugin's ability to produce different bundles for multiple renderer processes and the preload scripts - see [forge.json](config/forge.json) and [render config](config/webpack.renderers.config.js).

[master]: https://github.com/beorn/electron-with-server-example/

[feat/electron11-modern]: https://github.com/beorn/electron-with-server-example/tree/feat/electron11-modern
