import { init, send } from "./server-ipc"

const opts = parseArgs(process.argv)
const version = opts.get("--appVersion")
const isDev = opts.get("--isDev")
console.log("server", version, isDev)

// example invoke (request/reply) messages
init(opts.get("--socketAppspace"), opts.get("--socketId"), {
  _history: [],

  "make-factorial": async ({ num }) => {
    function fact(n) {
      if (n === 1) return 1
      return n * fact(n - 1)
    }
    console.log("making factorial")
    return fact(num)
  },

  "ring-ring": async () => {
    console.log("picking up the phone")
    return "hello!"
  },
})

// example push message
setInterval(() => send("heartbeat", "hi"), 1000)

function parseArgs(argv) {
  return argv.reduce((args, arg) => {
    const match = arg.split("=")
    args.set(match[0], match[1] || true)
    return args
  }, new Map())
}
