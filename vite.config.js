import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/css/custom.css', 'resources/js/app.js'],
            refresh: true,
        }),
        tailwindcss(),
    ],
    server: {
        // host: '192.168.1.229',
        host: 'telegrambot.test',
        port:5175,
        hmr: {
            // host: '192.168.1.229',
            host: 'telegrambot.test',
            port:5175,
        },
        https: {
            key: fs.readFileSync('/Users/macbookpro/.config/valet/Certificates/telegrambot.test.key'),
            cert: fs.readFileSync('/Users/macbookpro/.config/valet/Certificates/telegrambot.test.crt'),
          },
    },
});
