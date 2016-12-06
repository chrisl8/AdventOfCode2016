// Node.js code to read the input from a file.
var fs = require('fs');
var filename = 'day6input.txt';
var input = fs.readFileSync(filename, 'utf8');

var lines = input.split('\n');

var columns = [];

// Convert columns into arrays.
for (let i = 0; i < lines.length; i++) {
    let letters = lines[i].split('');
    for (let j = 0; j < letters.length; j++) {
        if (!columns[j]) {
            columns[j] = [];
        }
        columns[j].push([letters[j]]);
    }
}

var message1 = '';
var message2 = '';

for (let i = 0; i < columns.length; i++) {
    let countObject = {};
    for (let k = 0; k < columns[i].length; k++) {
        if (countObject.hasOwnProperty(columns[i][k])) {
            countObject[columns[i][k]]++;
        }
        else {
            countObject[columns[i][k]] = 1;
        }
    }
    // console.log(countObject);
    let letter1 = '';
    let count = 0;
    let letter2 = '';
    let count2 = 0;
    for (let key in countObject) {
        // console.log(key, countObject[key]);
        if (countObject[key] > count) {
            count = countObject[key];
            letter1 = key;
        }
        if (count2 === 0 || count2 > countObject[key]) {
            count2 = countObject[key];
            letter2 = key;
        }
    }
    message1 = `${message1}${letter1}`;
    message2 = `${message2}${letter2}`;
}

console.log(`Part 1: ${message1} Part 2: ${message2}`);

// console.log(columns);
