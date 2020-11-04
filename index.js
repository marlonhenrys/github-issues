const { filename, perPage, initial } = require('./src/config/params')
const mineRepos = require('./src/app/mineRepos')
const mineIssues = require('./src/app/mineIssues')
const minePosts = require('./src/app/minePosts')
const argv = require('minimist')

const args = argv(process.argv.slice(2))

const params = {
    perPage: args.l || perPage,
    filename: args.f || args.repos && filename.repos || args.issues && filename.issues || args.posts && filename.posts,
    storage: args.s || args.issues && filename.repos || args.posts && filename.issues,
    initial: args.i ? (args.i - 2) : initial,
    language: {
        name: args.n,
        amount: args.a,
    }
}

args.repos
    ? params.language.name
        ? params.language.amount
            ? mineRepos(params)
            : console.log('Informe a quantidade de repositórios com a flag (-a)')
        : console.log('Informe o nome da linguagem com a flag (-n)')
    : args.issues
        ? mineIssues(params)
        : args.posts
            ? minePosts(params)
            : console.log('Informe a mineração a ser executada (--repos ou --issues)')

