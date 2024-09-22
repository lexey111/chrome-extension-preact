import {cpSync} from 'fs'
import {OUTPUT_DIR, STATIC_DIR} from '../build.config.js'

export const copyStaticPlugin = () => ({
    name: 'copy-static-plugin',
    setup(build) {
        build.onEnd(async () => {
            try {
                console.log('[ Static... ]')
                // node 21+
                cpSync(STATIC_DIR, OUTPUT_DIR, {recursive: true})
                console.log('[ Static ] was copied to output')
            } catch (err) {
                console.error(err)
            }
        })
    },
})