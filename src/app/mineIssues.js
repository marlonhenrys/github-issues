const fetch = require('../helpers/fetch')
const format = require('../helpers/format')
const file = require('../helpers/file')
const { red, green, yellow } = require('../config/console')

module.exports = async params => {
    const repos = await file.read(params.storage)
    let index = params.initial

    for (index; index < repos.length; index++) {
        try {
            const [owner, name] = repos[index].nameWithOwner.split('/')
            Object.assign(params, { owner, name })

            do {
                try {
                    const { nodes, pageInfo } = await fetch.one(params)

                    if (nodes.length) {
                        const formattedNodes = format.one(nodes, repos[index])

                        await file.save(formattedNodes, params.filename)
                        console.log(green, `\n+${formattedNodes.length} issues coletadas`)

                    } else {
                        console.log(yellow, '\nNenhuma issue coletada.')
                    }

                    params.hasNextPage = pageInfo.hasNextPage
                    params.cursor = pageInfo.hasNextPage ? pageInfo.endCursor : null

                } catch (error) {
                    console.log(red, error.message)
                    console.log('\n[ISSUE] Tentando novamente...')
                }

            } while (params.hasNextPage)

        } catch (error) {
            console.log(red, error.message)
            console.log('\n[REPO] Tentando novamente...')
            index--
        }
    }
    console.log(`\nColeta de issues finalizada!\n`)
}