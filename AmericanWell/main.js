const axios = require('axios');
const chalk = require('chalk');

const url = "https://test.anytime.org/string.txt";


// API call
axios({
    method: 'get',
    url: url,
})
    .then(response => {
        const naNRemoved = removeNaN(response.data);
        const duplicatesRemoved =  removeDuplicates(naNRemoved);
        const smallestThree = smallestThreeValues(duplicatesRemoved);

        console.log(smallestThree); /* Returns 0,2,5 */
    })
    .catch(error => {
        const logError = chalk.red(error);

        console.log(logError);
    });


// Clean data for numbers only
const removeNaN = (data) => {
    return data.split('\n').filter(val => val !== '' && !isNaN(val));
};

// Sort data and remove duplicates
const removeDuplicates = (numData) => {
    const result = [];
    const sortedArr = numData.sort((a,b) => a - b)

    result.push(sortedArr[0]);
    for (let i = 1; i < sortedArr.length; i++) {
        if (sortedArr[i] !== result[result.length - 1]) {
            result.push(sortedArr[i]);
        }
    }

    return result;
};

// Return smallest three values
const smallestThreeValues = (sortedArr) => {
    return sortedArr.slice(0,3).map(num => parseInt(num)).join('\n');
};