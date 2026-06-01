import { bootstrapApp } from "@phcdevworks/spectre-shell"
import { navigate, registerRoute } from "@phcdevworks/spectre-shell-router"
import { effect, signal } from "@phcdevworks/spectre-shell-signals"

const root = document.getElementById("app")!
const count = signal(0)

bootstrapApp({
  root,
  routes() {
    registerRoute("/", async () => {
      let stopEffect: (() => void) | null = null

      return {
        render({ root }) {
          root.innerHTML = `
            <h1>Home</h1>
            <p>Count: <span id="count-value">0</span></p>
            <button id="increment">+1</button>
            <button id="to-about">Go to About</button>
          `
          stopEffect = effect(() => {
            const el = root.querySelector<HTMLElement>("#count-value")
            if (el) el.textContent = String(count.value)
          })
          root.querySelector("#increment")!.addEventListener("click", () => {
            count.value++
          })
          root.querySelector("#to-about")!.addEventListener("click", () => navigate("/about"))
        },
        destroy() {
          stopEffect?.()
        },
      }
    })

    registerRoute("/about", async () => ({
      render({ root }) {
        root.innerHTML = `
          <h1>About</h1>
          <p>Count from home: ${count.peek()}</p>
          <button id="to-home">Back Home</button>
        `
        root.querySelector("#to-home")!.addEventListener("click", () => navigate("/"))
      },
    }))
  },
})
