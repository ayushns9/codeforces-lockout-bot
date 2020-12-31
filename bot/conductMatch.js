/* 
* Function to conduct a match. 
*/

// imports 
const { checkSolved } = require('./../codeforces/checkSolved');
const { notify } = require('./notify');

async function conductMatch(bot, player1, player2, problemSet, duration) {
    return new Promise((resolve, reject) => {
        var score1 = 0;
        var score2 = 0;
        winner = 0;
        var counter = 0;
        var problemCount = problemSet.length;
        var winningPoints = (problemCount * (problemCount + 1) / 2) * 50;
        var solvedProblems = []
        for (var i = 0; i < problemSet.length; ++i) {
            solvedProblems.push(false);
        }
        var timer = setInterval(async () => {
            await problemSet.forEach(async (problem, index, array) => {
                if (!solvedProblems[index]) {
                    var solveTime1 = Infinity;
                    var solveTime1 = Infinity;
                    var scoreProblem = (index + 1) * 100;
                    await checkSolved(player1.handle, problem).then(solved => {
                        solveTime1 = solved.time;
                    });
                    await checkSolved(player2.handle, problem).then(solved => {
                        solveTime2 = solved.time;
                    });
                    if (solveTime1 < solveTime2) {
                        score1 += scoreProblem;
                        notify(bot, player1, `${player1.handle} has sovled the ${(index + 1) * 100} points problem!\n${player1.handle}: ${score1}\n${player2.handle}: ${score2}`);
                        notify(bot, player2, `${player1.handle} has sovled the ${(index + 1) * 100} points problem!\n${player1.handle}: ${score1}\n${player2.handle}: ${score2}`);
                        solvedProblems[index] = true;
                    } else if (solveTime2 < solveTime1) {
                        score2 += scoreProblem;
                        notify(bot, player1, `${player2.handle} has sovled the ${(index + 1) * 100} points problem!\n${player1.handle}: ${score1}\n${player2.handle}: ${score2}`);
                        notify(bot, player2, `${player2.handle} has sovled the ${(index + 1) * 100} points problem!\n${player1.handle}: ${score1}\n${player2.handle}: ${score2}`);
                        solvedProblems[index] = true;
                    }
                }
            });
            if (score1 > winningPoints) {
                winner = 1;
                clearInterval(timer);
                resolve(winner);
            } else if (score2 > winningPoints) {
                winner = 2;
                clearInterval(timer);
                resolve(winner);
            }

            if (score1 > score2) {
                winner = 1;
            } else if (score2 > score1) {
                winner = 2;
            } 
    
            if (counter >= duration) {
                clearInterval(timer);
                resolve(winner);
            }
            ++counter;
        }, 5000);

    })
}

// exports
module.exports = {
    conductMatch
}