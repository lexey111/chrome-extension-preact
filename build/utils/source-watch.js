import chokidar from 'chokidar'
import {SOURCE_DIR} from '../build.config.js'

export function initWatcher(buildFn) {
    console.log('[ Start file watcher... ]')

    const changesWatcher = chokidar.watch(SOURCE_DIR, {
        ignored: /(^|[/\\])\../, // ignore dotfiles
        persistent: true
    })

    changesWatcher.on('ready', () => {
        console.log('[ Initial scan complete. Ready for changes. ]')
        buildFn()
    })

    changesWatcher.on('all', () => {
        buildFn()
    })

    changesWatcher.on('error', (error) => {
        console.error(error)
        process.exit(3)
    })
}