// Node.js code to read the input from a file.
var fs = require('fs');
var filename = 'day5input.txt';
var input = fs.readFileSync(filename, 'utf8');
var md5 = require('md5');

console.log(`Your puzzle input is ${input}.`);

var key = 0;
var hash;
var doorCode = ['-', '-', '-', '-', '-', '-', '-', '-'];
var positionsFilled = 0;

while (positionsFilled < 8) {
    do {
        hash = md5(input + key);
        key++;
    } while (hash.substr(0, 5) !== '00000');
    let thisDigitPosition = hash.substr(5, 1);
    if (thisDigitPosition > -1 && thisDigitPosition < 8 && doorCode[thisDigitPosition] === '-') {
        let thisDigit = hash.substr(6, 1);
        doorCode[thisDigitPosition] = thisDigit;
        positionsFilled++;
        console.log(`Next key is ${key}, hash ${hash}, making digit ${thisDigitPosition} equal ${thisDigit} for a door code of ${doorCode.join('')}.`);
    }
}

console.log(`The final door code is ${doorCode.join('')}.`);
