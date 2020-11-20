import { app, BrowserWindow } from "electron"
import { fork } from "child_process"
import isDev from "electron-is-dev"
import fs from "fs"
import path from "path"

declare const CLIENT_WEBPACK_ENTRY: string
declare const CLIENT_PRELOAD_WEBPACK_ENTRY: string
declare const SERVER_WEBPACK_ENTRY: string
const SERVER_NODE_SCRIPT = path.join(__dirname, "/server.js")

let clientWin
let serverWin
let serverProcess

function createWindow(args) {
  clientWin = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      additionalArguments: args,
      preload: CLIENT_PRELOAD_WEBPACK_ENTRY,
    },
  })

  const load = isDev ? clientWin.loadURL : clientWin.loadFile
  console.log("createWindow", load, CLIENT_WEBPACK_ENTRY)
  clientWin.loadURL(CLIENT_WEBPACK_ENTRY)
}

function createBackgroundWindow(args) {
  serverWin = new BrowserWindow({
    x: 500,
    y: 300,
    width: 700,
    height: 500,
    show: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      additionalArguments: args,
    },
  })
  serverWin.loadURL(SERVER_WEBPACK_ENTRY)
}

function createBackgroundProcess(args) {
  serverProcess = fork(SERVER_NODE_SCRIPT, ["--subprocess", ...args])
  serverProcess.on("message", (msg) => console.log("index", msg))
}

const socketAppspace = `myapp.${process.pid}.`
const socketId = "server"

app.on("ready", async () => {
  const args = [
    `--appVersion=${app.getVersion()}`,
    `--socketAppspace=${socketAppspace}`,
    `--socketId=server`,
  ]
  if (isDev) args.push("--isDev")

  createWindow(args)

  if (isDev) {
    createBackgroundWindow(args)
  } else {
    createBackgroundProcess(args)
  }
})

app.on("before-quit", () => {
  if (serverProcess) {
    serverProcess.kill()
    serverProcess = null
  }
  // cleanup: remove socket after use
  const socketPath = `/tmp/${socketAppspace}${socketId}`
  if (fs.existsSync(socketPath)) fs.unlinkSync(socketPath)
})
