import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        port: 3000,
        open: true,
        proxy: {
            // 추천 API는 다른 서버로
            '/api/restaurants/recommend': {
                target: 'http://recommendation-alb-1698888954.ap-northeast-2.elb.amazonaws.com',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, '/api'),
            },
            // 나머지 API는 기존 서버로
            '/api': {
                target: 'http://wellmeet-alb-1955693121.ap-northeast-2.elb.amazonaws.com',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, '/api'),
            },
        },
    },
    build: {
        outDir: 'dist',
        sourcemap: true,
    },
})
