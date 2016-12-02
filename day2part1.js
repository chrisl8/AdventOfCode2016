// Node.js code to read the input from a file.
var fs = require('fs');
var filename = 'day2input.txt';
var input = fs.readFileSync(filename, 'utf8');

var lines = input.split('\n');
var doorCode = '';

var currentPosition = {
    x: 1,
    y: 1
};

var numPad = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

var operations = {
    U: function(position) {
        var newPosition = position;
        if (newPosition.y > 0) {
            newPosition.y--;
        }
        return newPosition;
    },
    D: function(position) {
        var newPosition = position;
        if (newPosition.y < 2) {
            newPosition.y++;
        }
        return newPosition;
    },
    L: function(position) {
        var newPosition = position;
        if (newPosition.x > 0) {
            newPosition.x--;
        }
        return newPosition;
    },
    R: function(position) {
        var newPosition = position;
        if (newPosition.x < 2) {
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
