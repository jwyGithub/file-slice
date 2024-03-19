import path from 'path';
import { defineConfig } from 'tsup';

export default defineConfig({
    entry: [path.join(__dirname, './src/index.ts'), path.join(__dirname, './src/slice.worker.ts')],
    outDir: path.join(__dirname, './dist'),
    outExtension({ format }) {
        return {
            js: `.${format}.js`
        };
    },

    dts: true,
    target: ['es2015'],
    format: ['cjs', 'esm', 'iife'],
    minify: false,
    clean: true,
    splitting: false,
    legacyOutput: true,
    tsconfig: path.resolve(__dirname, './tsconfig.json')
});

