module.exports = {
    findAll: (limit, cursor, languageName) => `
        {
            search(type: REPOSITORY, query: "stars:>10000 language:${languageName}", first: ${limit}, after: ${cursor}) {
                pageInfo {
                    hasNextPage
                    endCursor
                }
                nodes {
                    ... on Repository {
                        nameWithOwner
                        primaryLanguage {
                            name
                        }
                        stargazers {
                            totalCount
                        }
                        totalIssues: issues {
                            totalCount
                        }
                        openIssues: issues(states: OPEN) {
                            totalCount
                        }
                        closedIssues: issues(states: CLOSED) {
                            totalCount
                        }
                    }
                }
            }
        }  
    `,

    findOne: (name, owner, cursor) => `
        {
            repository(name: "${name}", owner: "${owner}") {
                issues(last: 40, after: ${cursor}) {
                    pageInfo {
                        endCursor
                        hasNextPage
                    }
                    nodes {
                        number
                        title
                        publishedAt
                        closed
                        closedAt
                        comments {
                            totalCount
                        }
                    }
                }
            }
        }
    `
}