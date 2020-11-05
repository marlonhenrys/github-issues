// usar isso no helper fetch (criar nova função)
const axios = require('axios');
const fs = require('fs');
const file = require('../helpers/file')

const api = axios.create({
    baseURL: 'https://api.stackexchange.com'
})

module.exports = async params => {
    const issues = [];
    const soIssues = [];

    var fileContents = fs.readFileSync('data/issues.csv');
    var lines = fileContents.toString().split('\n');

    for (var i = 0; i < lines.length; i++) {
        issues.push(lines[i].toString().split(','));
    }

    for(const issue of issues){
        const res = await api.get(`/2.2/search/advanced?order=desc&sort=activity&q=${issue[0]} ${issue[1]}&site=stackoverflow`)
        const formattedNodes = {
            repo: issue[0],
            issueNumber: issue[1],
            foundOnSO: res.data && res.data.length
        }
        soIssues.push(formattedNodes)
    }
    await file.save(soIssues, params.filename)
}