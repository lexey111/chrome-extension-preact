import {ProcessSettings} from '../content-script'

export const processPage = async (settings: ProcessSettings) => {
    console.log('[Processing] Processing content...')
    console.log('[Processing] Settings:', settings)
    const insertedContent = document.querySelector('#__preact_template_inserted')

    if (!insertedContent && settings.isEnabled) {
        console.log('[Processing] Insert content!')
        const newContent = document.createElement('div')
        newContent.id = '__preact_template_inserted'
        newContent.textContent = 'L'

        document.body.append(newContent)
    }

    if (insertedContent && !settings.isEnabled) {
        console.log('[Processing] Remove content!')
        document.body.removeChild(insertedContent)
    }
}