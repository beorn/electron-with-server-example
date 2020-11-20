import serverHandlers from "./server-handlers"
import { init } from "./server-ipc"

const opts = parseArgs(process.argv)
const version = opts.get("--appVersion")
const isDev = opts.get("--isDev")
console.log("server", version, isDev)

init(opts.get("--socketAppspace"), opts.get("--socketId"), serverHandlers)

function parseArgs(argv) {
  return argv.reduce((args, arg) => {
    const match = arg.split("=")
    args.set(match[0], match[1] || true)
    return args
  }, new Map())
}
