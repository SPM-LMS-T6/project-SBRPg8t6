import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: true, // enable routing from external (webpage served to user) to intenal container (docker container with the vue)
    port: 8080,
    proxy: {
        // '/companies': {
        //     // auto appends to the target
        //     target: 'http://search:5101', // URL of Container 2
        //     changeOrigin: true,
        //     secure: false // Insecure, but okay for local development
        // },
        // '^/records/.*': {
        //     // auto appends to the target
        //     target: 'http://search:5101', // URL of Container 2
        //     changeOrigin: true,
        //     secure: false // Insecure, but okay for local development
        //     // rewrite: (path) =>
        //     //     path.replace(/^\/records\/([^\/]*)/, '/records?company=$1')
        // }
    }
}
})
