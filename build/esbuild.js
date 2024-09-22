import esbuild from 'esbuild'
import {buildConfig} from './build.config.js'
import {spawnTSC} from './utils/ts-check.js'
import {showResults} from './utils/build-results.js'

console.time('Build time')
console.log('\n[ Starting type check... ]')

try {
    const typeCheck = await spawnTSC(true)

    if (typeCheck !== 0) {
        process.exit(typeCheck)
    }

    console.log('\n✅  Check complete.\n')

    console.log('[ Building... ]')
    await esbuild.build({
        ...buildConfig,
        metafile: true,
        minify: true,
        minifyWhitespace: true,
        minifySyntax: true,
        minifyIdentifiers: true,
        sourcemap: false,
    })

    console.log('\n✅  Build complete.')
    showResults('./dist')

} catch (error) {
    console.log('\n⛔  Build failed.')
    console.error(error)
}

console.timeEnd('Build time')
