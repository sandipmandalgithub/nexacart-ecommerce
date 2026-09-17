import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { Toaster } from "react-hot-toast"

import App from "./App.jsx"
import store from "../redux/store.js"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 2000
        }}
      />

      <App />
    </Provider>
  </StrictMode>
)
