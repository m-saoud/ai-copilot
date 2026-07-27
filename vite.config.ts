import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import manifest from './manifest.json' with { type: 'json' }


import fs from 'node:fs'
import path from 'node:path'

// Ensure icons exist to avoid CRX build failures
const base64Png = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
const buffer = Buffer.from(base64Png, 'base64')
const publicDir = path.resolve('public')
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true })
}
for (const size of ['16', '48', '128']) {
  const iconPath = path.join(publicDir, `icon${size}.png`)
  if (!fs.existsSync(iconPath)) {
    fs.writeFileSync(iconPath, buffer)
  }
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    crx({ manifest }),
  ],
})