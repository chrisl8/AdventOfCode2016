// Node.js code to read the input from a file.
var fs = require('fs');
var filename = 'day2input.txt';
var input = fs.readFileSync(filename, 'utf8');

var lines = input.split('\n');
var doorCode = '';

var currentPosition = {
    x: 0,
    y: 2
};

var numPad = [
    [0, 0, 1, 0, 0],
    [0, 2, 3, 4, 0],
    [5, 6, 7, 8, 9],
    [0, 'A', 'B', 'C', 0],
    [0, 0, 'D', 0, 0],
];

var operations = {
    U: function(position) {
        var newPosition = position;
        if (newPosition.y > 0 && numPad[newPosition.y - 1][newPosition.x] !== 0) {
            newPosition.y--;
        }
        return newPosition;
    },
    D: function(position) {
        var newPosition = position;
        if (newPosition.y < numPad.length - 1 && numPad[newPosition.y + 1][newPosition.x] !== 0) {
            newPosition.y++;
        }
        return newPosition;
    },
    L: function(position) {
        var newPosition = position;
        if (newPosition.x > 0 && numPad[newPosition.y][newPosition.x - 1] !== 0) {
            newPosition.x--;
        }
        return newPosition;
    },
    R: function(position) {
        var newPosition = position;
        if (newPosition.x < numPad[0].length - 1 && numPad[newPosition.y][newPosition.x + 1] !== 0) {
            newPosition.x++;
        }
        return newPosition;
    }
}

for (let i = 0; i < lines.length; i++) {
    let letters = lines[i].split('');
    for (let k = 0; k < letters.length; k++) {
        currentPosition = operations[letters[k]](currentPosition);
    }
    doorCode = `${doorCode}${numPad[currentPosition.y][currentPosition.x]}`; 
}
console.log(doorCode);
