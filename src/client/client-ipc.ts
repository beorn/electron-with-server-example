//@ts-ignore Import from "main world" context
const { ipcOn, ipcEmit, socketId, uuid } = window.myapp

// State
const replyHandlers = new Map()
const listeners = new Map()
let messageQueue = []
let connected = false

// Functions
ipcOn(socketId, {
  message: (data) => {
    const msg = JSON.parse(data)
    switch (msg.type) {
      case "error": {
        const { id } = msg
        replyHandlers.delete(id)
        // Up to you whether or not to care about the error
        break
      }
      case "reply": {
        const { id, result } = msg
        const handler = replyHandlers.get(id)
        if (!handler) break
        replyHandlers.delete(id)
        handler.resolve(result)
        break
      }
      case "push": {
        const { name, args } = msg
        const listens = listeners.get(name) ?? []
        listens.forEach((listener) => listener(args))
        break
      }
      default:
        throw new Error("Unknown message type: " + JSON.stringify(msg))
    }
  },

  connect: () => {
    connected = true

    // Send any messages that were queued while closed
    messageQueue.forEach((msg) => ipcEmit(socketId, "message", msg))
    messageQueue = []

    // onOpen(client)
  },

  disconnect: () => {
    connected = false
  },
})

export function send(name, args) {
  return new Promise<any>((resolve, reject) => {
    let id = uuid.v4()
    replyHandlers.set(id, { resolve, reject })
    if (connected) {
      ipcEmit(socketId, "message", JSON.stringify({ id, name, args }))
    } else {
      messageQueue.push(JSON.stringify({ id, name, args }))
    }
  })
}

function listen(name, cb) {
  if (!listeners.get(name)) listeners.set(name, [])
  listeners.get(name).push(cb)

  return () => {
    let arr = listeners.get(name)
    listeners.set(
      name,
      arr.filter((cb_) => cb_ !== cb)
    )
  }
}

function unlisten(name) {
  listeners.set(name, [])
}
