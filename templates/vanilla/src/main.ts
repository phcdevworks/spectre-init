import "@phcdevworks/spectre-ui/index.css"
import { bootstrapApp } from "@phcdevworks/spectre-shell"
import type { Route } from "@phcdevworks/spectre-shell-router"

const root = document.getElementById("app")!

bootstrapApp({
  root,
  routes(): Route[] {
    return [
      {
        path: "/",
        loader: async () => ({
          render({ root }) {
            root.innerHTML = `
              <h1>Home</h1>
              <a href="/about">Go to About</a>
            `
          },
        }),
      },
      {
        path: "/about",
        loader: async () => ({
          render({ root }) {
            root.innerHTML = `
              <h1>About</h1>
              <a href="/">Back Home</a>
            `
          },
        }),
      },
    ]
  },
})
