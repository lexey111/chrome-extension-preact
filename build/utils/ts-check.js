import {spawnSync} from 'node:child_process'

export async function spawnTSC(inheritStdio = false) {
    const tsc = spawnSync(
        'bun tsc --noEmit',
        [],
        {
            cwd: './',
            encoding: 'utf-8',
            stdio: inheritStdio ? 'inherit' : 'pipe',
            shell: true,
        }
    )

    if (inheritStdio) {
        return tsc.status
    }

    return {
        messages: tsc.stdout,
        error: tsc.error,
    }
}

export async function executeTSCheck(buildErrors) {
    const check = await spawnTSC()
    let result = true

    if (check.error) {
        const errors = check.messages.split('\n')
        console.log(`\n⛔  Type check failed with errors: ${errors.length}.`)

        errors.forEach((line) => {
            if (!line) {
                return
            }
            buildErrors.push(line)
            console.log()
            console.error(line)
        })
        result = false
    }
    return result
}