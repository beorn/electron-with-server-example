//@ts-ignore Import from "main world" context
const { appVersion, isDev } = window.myapp
import { send } from "./client-ipc"

console.log("client", appVersion, isDev)

const output = document.querySelector("#output")

document.querySelector("#factorial").addEventListener("click", async () => {
  const result = await send("make-factorial", { num: 5 })
  output.innerHTML = result
})

document.querySelector("#call").addEventListener("click", async () => {
  const result = await send("ring-ring", { message: "this is james" })
  output.innerHTML = result
})
