require('dotenv').config()

module.exports = {
    endpoint: 'https://api.github.com/graphql',
    options: {
        headers: {
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
        }
    },
    variables: {},
    stackOverflow: {
        key: process.env.SO_KEY,
        access_token: process.env.SO_TOKEN
    }
}