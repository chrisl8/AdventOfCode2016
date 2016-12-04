// Node.js code to read the input from a file.
var fs = require('fs');
var filename = 'day3input.txt';
var input = fs.readFileSync(filename, 'utf8');

var lines = input.split('\n');

for (let i = 0; i < lines.length; i++) {
    // Strip leading whitespace
    lines[i] = lines[i].trim();
    // Strip extraneous spaces
    lines[i] = lines[i].replace(/\s+/g, ' ');
}

var validTriangles = 0;

for (let i = 0; i < lines.length; i++) {
    let sides = lines[i].split(' ');
    for (let k = 0; k < sides.length; k++) {
        sides[k] = parseInt(sides[k], 10);
    }
    if (sides[0] + sides[1] > sides[2] && sides[1] + sides[2] > sides[0] && sides[0] + sides[2] > sides[1]) {
        validTriangles++;
    }
}

console.log(`Part 1: There are ${validTriangles} valid triangles in the input.`);

validTriangles = 0;

var sides = [];
for (let i = 0; i < lines.length; i += 3) {
    for (let j = 0; j < 3; j++) {
        sides[0] = lines[i].split(' ')[j];
        sides[1] = lines[i + 1].split(' ')[j];
        sides[2] = lines[i + 2].split(' ')[j];
        for (let k = 0; k < sides.length; k++) {
            sides[k] = parseInt(sides[k], 10);
        }
        if (sides[0] + sides[1] > sides[2] && sides[1] + sides[2] > sides[0] && sides[0] + sides[2] > sides[1]) {
            validTriangles++;
        }
    }
}

console.log(`Part 2: There are ${validTriangles} valid triangles in the input.`);
