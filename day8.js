// Node.js code to read the input from a file.
var fs = require('fs');
var filename = 'day8input.txt';
var input = fs.readFileSync(filename, 'utf8');

var lines = input.split('\n');

const screenWidth = 50;
const screenHeight = 6;

var screen = [];
for (let i = 0; i < screenHeight; i++) {
    screen.push([]);
    for (let j = 0; j < screenWidth; j++) {
        screen[i].push('.');
    }
}

function rect(input) {
    let lineParts = input.split('x');
    let width = lineParts[0];
    let height = lineParts[1];
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            screen[i][j] = '#';
        }
    }
}

function rotateRow(row, shift) {
    // console.log(row, shift);
    var previousEntry, nextEntry;
    for (let i = 0; i < shift; i++) {
        previousEntry = '.';
        nextEntry = '.';
        screen[row].unshift(screen[row][screen[row].length - 1]);
        screen[row].length = screenWidth;
    }
}

function rotateColumn(column, shift) {
    // console.log(column, shift);
    var previousEntry;
    for (let h = 0; h < shift; h++) {
        for (let i = 0; i < screen.length; i++) {
            let nextEntry = screen[i][column];
            if (previousEntry) {
                screen[i][column] = previousEntry;
            }
            else {
                screen[i][column] = '.';
            }
            if (i === screen.length - 1) {
                screen[0][column] = nextEntry;
            }
            else {
                previousEntry = nextEntry;
            }
        }
    }
}

for (let i = 0; i < lines.length; i++) {
    let lineParts = lines[i].split(' ');
    if (lineParts[0] === 'rect') {
        rect(lineParts[1]);
    }
    else if (lineParts[0] === 'rotate' && lineParts[1] === 'row') {
        rotateRow(lineParts[2].split('=')[1], lineParts[4]);
    }
    else if (lineParts[0] === 'rotate' && lineParts[1] === 'column') {
        rotateColumn(lineParts[2].split('=')[1], lineParts[4]);
    }
}

// console.log(screen);
var pixelcount = 0;
for (let i = 0; i < screenHeight; i++) {
    let line = '';
    for (let j = 0; j < screenWidth; j++) {
        if (screen[i][j] === '#') {
            pixelcount++;
            line = `${line}${screen[i][j]}`;
        } else {
            line = `${line} `;
        }
    }
    console.log(line);
}

console.log(`There are ${pixelcount} pixels lit.`);
