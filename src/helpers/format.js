const { blue } = require('../config/console')

module.exports = {
    list: (nodes, params) => {
        console.log(blue, '\nFormatando dados...')

        return nodes.map(node => {
            if (!node.totalIssues.totalCount ||
                params.language.amount - params.count === 0) {
                return null
            }

            const primaryLanguage = node.primaryLanguage.name
            const nameWithOwner = node.nameWithOwner
            const stars = node.stargazers.totalCount
            const totalIssues = node.totalIssues.totalCount
            const openIssues = node.openIssues.totalCount
            const closedIssues = node.closedIssues.totalCount

            const format = {
                nameWithOwner,
                primaryLanguage,
                stars,
                totalIssues,
                openIssues,
                closedIssues
            }

            params.count++
            return format

        }).filter(node => node)
    },

    one: (nodes, repo) => {
        console.log(blue, '\nFormatando dados...')

        return nodes.map(node => {
            const {
                number,
                title,
                publishedAt,
                closed,
                closedAt
            } = node

            const repository = repo.nameWithOwner
            const commentCount = node.comments.totalCount

            return {
                repository,
                number,
                title,
                publishedAt,
                closed,
                closedAt,
                commentCount
            }
        })
    },

    posts: (nodes, issue) => (
        [{
            repository: issue.repository,
            number: issue.number,
            quantity: nodes.length
        }]
    )
}