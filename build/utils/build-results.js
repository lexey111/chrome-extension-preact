const fs = require('fs')
const path = require('path')

function listFilesSync(dir) {
    let fileList = []
    fs.readdirSync(dir).forEach((file) => {
        const fullPath = path.join(dir, file)
        if (fs.lstatSync(fullPath).isDirectory()) {
            fileList = fileList.concat(listFilesSync(fullPath))
        } else {
            fileList.push(fullPath)
        }
    })
    return fileList
}

function fileAndSize(file) {
    return {
        file,
        size: fs.statSync(file).size,
    }
}

function getReadableFileSizeString(fileSizeInBytes) {
    var i = -1
    var byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB']
    do {
        fileSizeInBytes /= 1024
        i++
    } while (fileSizeInBytes > 1024)

    return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i]
}

export function showResults(directory) {
    const fullDirPath = path.resolve(directory)
    const fullFileList = listFilesSync(fullDirPath)
    const filesAndSizes = fullFileList.map(fileAndSize)
    const totalSize = getReadableFileSizeString(filesAndSizes.reduce((prev, currentValue) => prev + currentValue.size, 0))

    console.log()
    const categories = filesAndSizes.reduce((prev, currentValue) => {
        const ext = currentValue.file
            .split('.')
            .filter(Boolean) // removes empty extensions (e.g. `filename...txt`)
            .slice(1)
            .join('.')

        if (!prev[ext]) {
            prev[ext] = {size: 0, count: 0}
        }

        prev[ext].size += currentValue.size
        prev[ext].count += 1

        if (ext === 'js') {
            console.log(' ', path.basename(currentValue.file), getReadableFileSizeString(currentValue.size))
        }

        return prev
    }, {})

    const totalSizeLine = `  Total size   | ${totalSize}`
    const dividerLine = '  '.padEnd(totalSizeLine.toString().length, '-')

    console.log()
    console.log(dividerLine)
    console.log(`  Files total  | ${fullFileList.length}`)
    console.log(totalSizeLine)
    console.log(dividerLine)
    for (const property in categories) {
        const title = `${property} (${categories[property].count})`
        console.log(`    ${title + ''.padEnd(10 - title.length + 1, ' ')}| ${getReadableFileSizeString(categories[property].size)}`)
    }
    console.log()
}