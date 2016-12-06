// Node.js code to read the input from a file.
var fs = require('fs');
var filename = 'day5input.txt';
var input = fs.readFileSync(filename, 'utf8');
var md5 = require('md5');

console.log(`Your puzzle input is ${input}.`);

var key = 0;
var hash;
var doorCode = '';

for (let i = 0; i < 8; i++) {
    do {
        hash = md5(input + key);
        key++;
    } while (hash.substr(0, 5) !== '00000');
    let thisDigit = hash.substr(5, 1);
    doorCode = `${doorCode}${thisDigit}`;
    console.log(`Key number ${i} is ${key} for which the hash is ${hash}, making the next digit ${thisDigit} for a door code of ${doorCode}.`);
}

console.log(`The final door code is ${doorCode}.`);
