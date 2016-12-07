// Node.js code to read the input from a file.
var fs = require('fs');
var filename = 'day7input.txt';
var input = fs.readFileSync(filename, 'utf8');

var lines = input.split('\n');

var tlsCount = 0,
    sslCount = 0;

function checkForTLSsequence(input) {
    for (let j = 0; j < input.length; j++) {
        let letters = input[j];
        for (let k = 0; k < letters.length; k++) {
            if (letters.length > k + 3 && letters[k] === letters[k + 3] && letters[k] !== letters[k + 1] && letters[k + 1] === letters[k + 2]) {
                return true;
            }
        }
    }
    return false;
}

function checkForCorespodingBAB(input, b, a) {
    for (let j = 0; j < input.length; j++) {
        let letters = input[j];
        for (let k = 0; k < letters.length; k++) {
            if (letters[k] === b && letters.length > k + 2 && letters[k] === letters[k + 2] && letters[k + 1] === a) {
                return true;
            }
        }
    }
    return false;
}

function checkForSSLsequence(open, bracketed) {
    for (let j = 0; j < open.length; j++) {
        let letters = open[j];
        for (let k = 0; k < letters.length; k++) {
            if (letters.length > k + 2 && letters[k] === letters[k + 2] && letters[k] !== letters[k + 1]) {
                if (checkForCorespodingBAB(bracketed, letters[k + 1], letters[k])) {
                    return true;
                }
            }
        }
    }
    return false;
}

for (let i = 0; i < lines.length; i++) {
    // console.log(lines[i]);
    // Split out segments in and out of brackets
    let openPosition = 0,
        bracketPostion = 0;
    let openLetters = [],
        bracketLetters = [];
    let letters = lines[i].split('');
    let inBrackets = false;
    for (let j = 0; j < letters.length; j++) {
        if (letters[j] === '[') {
            inBrackets = true;
            if (bracketLetters.length > 0) {
                bracketPostion++;
            }
            continue;
        }
        else if (letters[j] === ']') {
            inBrackets = false;
            if (openLetters.length > 0) {
                openPosition++;
            }
            continue;
        }
        if (inBrackets) {
            if (bracketLetters.length < bracketPostion + 1) {
                bracketLetters.push([]);
            }
            bracketLetters[bracketPostion].push(letters[j]);
        }
        else {
            if (openLetters.length < openPosition + 1) {
                openLetters.push([]);
            }
            openLetters[openPosition].push(letters[j]);
        }
    }
    // console.log(openLetters, bracketLetters);

    if (!checkForTLSsequence(bracketLetters) && checkForTLSsequence(openLetters)) {
        tlsCount++;
    }

    if (checkForSSLsequence(openLetters, bracketLetters)) {
        sslCount++;
    }
}

console.log(`Part 1: ${tlsCount}, Part 2: ${sslCount}`);
