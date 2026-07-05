import "@phcdevworks/spectre-ui/index.css"
import { defineSpectreButton } from "@phcdevworks/spectre-components/button"
import { bootstrapApp } from "@phcdevworks/spectre-shell"
import type { Route } from "@phcdevworks/spectre-shell-router"
import { effect, signal } from "@phcdevworks/spectre-shell-signals"

defineSpectreButton()

const root = document.getElementById("app")!
const count = signal(0)

bootstrapApp({
  root,
  routes(): Route[] {
    return [
      {
        path: "/",
        loader: async () => {
          let stopEffect: (() => void) | null = null

          return {
            render({ root }) {
              root.innerHTML = `
                <h1>Home</h1>
                <p>Count: <span id="count-value" style="color: var(--sp-text-on-page-brand)">0</span></p>
                <sp-button variant="primary">+1</sp-button>
                <a href="/about">Go to About</a>
              `
              stopEffect = effect(() => {
                const el = root.querySelector<HTMLElement>("#count-value")
                if (el) el.textContent = String(count.value)
              })
              root.querySelector("sp-button")!.addEventListener("click", () => {
                count.value++
              })
            },
            destroy() {
              stopEffect?.()
            },
          }
        },
      },
      {
        path: "/about",
        loader: async () => ({
          render({ root }) {
            root.innerHTML = `
              <h1>About</h1>
              <p>Count from home: ${count.peek()}</p>
              <a href="/">Back Home</a>
            `
          },
        }),
      },
    ]
  },
})
