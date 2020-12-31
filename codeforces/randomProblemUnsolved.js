/* 
* Function to return any random problem from codeforces.
*/

//imports 
const fetch = require('node-fetch');
const { checkSolved } = require('./checkSolved');

async function randomProblemUnsolved(handle1, handle2, rating) {
    const api_url = "https://codeforces.com/api/problemset.problems"
    const response = await fetch(api_url);
    const json = await response.json();
    
    problems = []
    json.result.problems.forEach(problem => {
        if (problem.rating == rating) {
            problems.push(problem);
        }
    });
    solved1 = true;
    solved2 = true;
    var problem = null;
    do {    
        RandomIndex = (Math.floor(Math.random() * 1000000000))%problems.length;
        choosen_problem = problems[RandomIndex];
        problem_link = `https://codeforces.com/problemset/problem/${choosen_problem.contestId}/${choosen_problem.index}`;
        problem = {
            "problem_link": problem_link,
            "contestId": choosen_problem.contestId,
            "index": choosen_problem.index
        }
        await checkSolved(handle1, problem).then(solved => {
            solved1 = solved;
        })
        await checkSolved(handle2, problem).then(solved => {
            solved2 = solved;
        })
    } while (solved1.solved || solved2.solved);
    return new Promise((resolve, reject) => {
        resolve(problem);
    });
}

// exports
module.exports = {
    randomProblemUnsolved
}