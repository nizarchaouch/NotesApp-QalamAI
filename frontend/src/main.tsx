import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "@/app/App"
import { LanguageProvider } from "./contexts/LanguageProvider"
import { IntlWrapper } from "./components/common/IntlWrapper"
import { LocalizedClerkProvider } from "./components/common/LocalizedClerkProvider"

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file")
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LanguageProvider>
      <IntlWrapper>
        <LocalizedClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <App />
        </LocalizedClerkProvider>
      </IntlWrapper>
    </LanguageProvider>
  </StrictMode>,
)
