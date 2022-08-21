import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { VitePluginFonts } from 'vite-plugin-fonts'

import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'

const options = {
    custom: {
        families: [
            {
                name: 'mk2',
                local: 'mk2',
                src: './src/assets/fonts/mk2.ttf',
            },
            {
                name: 'mk4',
                local: 'mk4',
                src: './src/assets/fonts/mk4.ttf',
            },
        ],
        display: 'swap',
        preload: true,
    },
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        VitePluginFonts(options),
        Components({
            resolvers: [
                IconsResolver({
                    prefix: false,
                }),
            ],
        }),
        Icons({
            scale: 2.4, // Scale of icons against 1em
            defaultStyle: '', // Style apply to icons
            defaultClass: '', // Class names apply to icons
        }),
    ],
    server: {
        host: true,
        port: 3000,
        strictPort: true,
        open: true,
    },
    css: {
        preprocessorOptions: {
            scss: {
                // example : additionalData: `@import "./src/design/styles/variables";`
                // dont need include file extend .scss
                additionalData: [`@import "./src/assets/styles/variables";`],
            },
        },
    },
})
