const fetch = require('../helpers/fetch')
const format = require('../helpers/format')
const file = require('../helpers/file')
const { red, green, yellow } = require('../config/console')

const sleep = require('util').promisify(setTimeout)

module.exports = async params => {
    const issues = await file.read(params.storage)
    let index = params.initial

    for (index; index < issues.length; index++) {

        try {
            const result = await fetch.posts(issues[index])
            await sleep(3000)

            // if (result) {
            //     const formattedNodes = format.posts(nodes, issues[index])

            //     await file.save(formattedNodes, params.filename)
            //     console.log(green, `\n+${formattedNodes.length} posts coletados`)

            // } else {
            //     console.log(yellow, '\nNenhum post coletado.')
            // }

        } catch (error) {
            console.log(red, error.message)
            console.log('\nTentando novamente...')
            index--
        }
    }
    console.log(`\nColeta de posts finalizada!\n`)
}