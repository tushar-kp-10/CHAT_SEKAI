// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindConfig from './tailwind.config.cjs'
// import tailwindcss from '@tailwindcss/vite'

// export default defineConfig({
//   plugins: [react(),
//     tailwindcss(),
//     tailwindConfig(),
//   ],
// })

const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');

module.exports = defineConfig({
  plugins: [react()],
});

