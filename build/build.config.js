import {copyStaticPlugin} from './utils/copy-static.js'

export const SOURCE_DIR = './src'
export const STATIC_DIR = './src/static'
export const OUTPUT_DIR = './dist'

export const DEBOUNCE_BUILD_TIME = 200

export const buildConfig = {
    entryPoints: [
        'src/content-script.ts',
        'src/popup.tsx',
        'src/settings.tsx',
        'src/background.ts'
    ],
    assetNames: 'assets/[name]',
    chunkNames: '[ext]/[name]',
    outdir: OUTPUT_DIR,
    bundle: true,
    minify: false,
    plugins: [
        copyStaticPlugin()
    ],
}

