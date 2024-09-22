import esbuild from 'esbuild'
import {buildConfig, DEBOUNCE_BUILD_TIME} from './build.config.js'
import {initWatcher} from './utils/source-watch.js'
import {executeTSCheck} from './utils/ts-check.js'
import {showResults} from './utils/build-results.js'

let buildErrors = [] // pay attention: it should be a const reference

console.log('[ Init build context... ]')

// prepare build context
let buildContext
try {
    buildContext = await esbuild.context({...buildConfig})
} catch (error) {
    console.error(error)
    process.exit(1)
}

// run source code watcher
initWatcher(doBuild)

let inBuild = false
let debounceTimer

function doBuild() {
    if (inBuild) {
        return
    }

    clearTimeout(debounceTimer)

    debounceTimer = setTimeout(async () => {
        inBuild = true
        buildErrors.length = 0
        console.log('[ Build... ]')

        let result = await executeTSCheck(buildErrors)

        if (result) {
            result = await executeBuild()
        }

        showResults('./dist')
        console.log('')
        console.log(result ? '✅  Build successful.' : '⛔  Build failed.')
        inBuild = false
    }, DEBOUNCE_BUILD_TIME)
}

async function executeBuild() {
    console.time('[Re]build time')
    let result
    try {
        result = await buildContext.rebuild()
        if (result && result.errors.length > 0) {
            result.errors.forEach(error => buildErrors.push(error.text))
        }
    } catch (error) {
        //
    }
    console.timeEnd('[Re]build time')
    return result && result.errors.length === 0
}