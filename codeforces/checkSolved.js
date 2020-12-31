/*
* Function to check if a problem is solved by a user.
*/

// imports 
const fetch = require('node-fetch');


async function checkSolved(handle, problem) {
    const contest = problem.contestId;
    const index = problem.index;
    const api_url = `https://codeforces.com/api/contest.status?contestId=${contest}&handle=${handle}`;
    const response = await fetch(api_url);
    const json = await response.json();
    const allSubmissions = json.result;
    
    var solved = false;
    var time = Infinity;
    
    allSubmissions.forEach(submission => {
        if(submission.testset == "TESTS" && submission.verdict == "OK" && submission.problem.index == index) {
            solved = true;
            time = submission.creationTimeSeconds;
        }
    });
    return new Promise((resolve, reject) => {
        resolve({
            'solved': solved,
            'time': time
        })
    });
}

// exports
module.exports = {
    checkSolved
}


