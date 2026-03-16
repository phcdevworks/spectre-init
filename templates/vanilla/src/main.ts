import { bootstrapApp } from "@phcdevworks/spectre-shell"
import { navigate, registerRoute } from "@phcdevworks/spectre-shell-router"

const root = document.getElementById("app")!

bootstrapApp({
  root,
  routes() {
    registerRoute("/", async () => ({
      render({ root }) {
        root.innerHTML = `
          <h1>Home</h1>
          <button id="to-about">Go to About</button>
        `
        document
          .getElementById("to-about")!
          .addEventListener("click", () => navigate("/about"))
      }
    }))

    registerRoute("/about", async () => ({
      render({ root }) {
        root.innerHTML = `
          <h1>About</h1>
          <button id="to-home">Back Home</button>
        `
        document
          .getElementById("to-home")!
          .addEventListener("click", () => navigate("/"))
      }
    }))
  }
})
