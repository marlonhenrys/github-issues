const axios = require('axios')
const queryBuilder = require('../utils/queryBuilder')
const { endpoint, options, variables, stackExchange } = require('../config/request')

module.exports = {
    list: async ({ cursor, perPage, language, count }) => {

        const after = cursor ? `"${cursor}"` : null
        const query = queryBuilder.findAll(perPage, after, language.name)

        console.log('\nBuscando dados... ' + `${language.name}: ${count}/${language.amount}`)

        const response = await axios.post(endpoint, { query, variables }, options)
        const { nodes, pageInfo } = response.data.data.search

        return { nodes, pageInfo }
    },

    one: async ({ owner, name, cursor }) => {

        const after = cursor ? `"${cursor}"` : null
        const query = queryBuilder.findOne(name, owner, after)

        console.log('\nBuscando dados... ' + `(${owner} | ${name})`)

        const response = await axios.post(endpoint, { query, variables }, options)
        const { nodes, pageInfo } = response.data.data.repository.issues

        return { nodes, pageInfo }
    },

    posts: async ({ repository, number }) => {

        const query = queryBuilder.posts(repository, number)
        const endpoint = stackExchange + query

        console.log('\nBuscando dados... ' + `(${repository} | issue#${number})`)

        const response = await axios.get(endpoint)

        console.log(endpoint, response.data)

        return response.data
    }
}