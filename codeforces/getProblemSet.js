/* 
* Function to generate a random problemset given a set of difficulties. 
*/

//imports 
const fetch = require('node-fetch');
const { randomProblemUnsolved } = require('./randomProblemUnsolved')

async function getProblemSet(handle1, handle2, ratings) {
    problemSet = []
    return new Promise ((resolve, reject) => {
        ratings.forEach(async (element, index, array) => {
            await randomProblemUnsolved(handle1, handle2, element).then(problem => {
                problemSet.push(problem);
            });
            if (index == array.length - 1) {
                resolve(problemSet);
            }
        });
    })
}

// exports
module.exports = {
    getProblemSet
}