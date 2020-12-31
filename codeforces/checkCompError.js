/*
* Authenticate the user using codeforces.
*/

// imports 
const fetch = require('node-fetch');


async function checkCompError(handle, problem, timeLimit) {
    auth = false;
    return new Promise((resolve, reject) => {
        var counter = 0;
        var timer = setInterval(async () => {
            const contest = problem.contestId;
            const index = problem.index;
            const api_url = `https://codeforces.com/api/contest.status?contestId=${contest}&handle=${handle}`;
            const response = await fetch(api_url);
            const json = await response.json();
            const allSubmissions = json.result;
            try {
                allSubmissions.forEach(submission => {
                    if(submission.testset == "TESTS" && submission.verdict == "COMPILATION_ERROR" && submission.problem.index == index) {
                        auth = true;
                        clearInterval(timer);
                        resolve(auth);
                    }
                });
            } catch (error) {
                clearInterval(timer);
                resolve(auth);
            }
            

            if (counter >= timeLimit) {
                clearInterval(timer);
                resolve(auth);
            }
            ++counter;
        }, 1000);
    });
}

// exports
module.exports = {
    checkCompError
}


