import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// Self-hosted DM Sans (the Luna Design System's typeface) — loaded here
// rather than left to a system-font fallback, and rather than a Google
// Fonts CDN link, so the type actually matches Figma and works offline.
import '@fontsource/dm-sans/400.css'
import '@fontsource/dm-sans/500.css'
import '@fontsource/dm-sans/600.css'
import '@fontsource/dm-sans/700.css'
import '@fontsource/dm-sans/800.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
