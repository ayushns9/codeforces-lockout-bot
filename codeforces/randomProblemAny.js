/* 
* Function to return any random problem from codeforces.
*/

//imports 
const fetch = require('node-fetch');
const { checkCompError } = require('./checkCompError')

async function randomProblemAny(handle) {
    const api_url = "https://codeforces.com/api/problemset.problems"
    const response = await fetch(api_url);
    const json = await response.json();
    problems = []
    json.result.problems.forEach(problem => {
        problems.push(problem);
    });
    doneAlready = true;
    do {
        RandomIndex = (Math.floor(Math.random() * 1000000000))%problems.length;
        choosen_problem = problems[RandomIndex];
        problem_link = `https://codeforces.com/problemset/problem/${choosen_problem.contestId}/${choosen_problem.index}`;
        problem = {
            "problem_link": problem_link,
            "contestId": choosen_problem.contestId,
            "index": choosen_problem.index
        }
        await checkCompError(handle, problem, 1)
        .then (done => doneAlready = done);
    } while (doneAlready);

    return problem;
}

// exports
module.exports = {
    randomProblemAny
}