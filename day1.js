// Node.js code to read the input from a file.
var fs = require('fs');
var filename = 'day1input.txt';
var input = fs.readFileSync(filename, 'utf8');

// Lots of string manipulation. See:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
// and look "Methods" on the left to get ideas of what "magic" Javascript can do with strings.

// Just removes spaces
// http://stackoverflow.com/a/5963202
// It is a little weird because it uses regular expressions. This is the simplest way to replace EVERY instance of a character in a sting.
// We could use ', ' in the split opeartion, but what if not every entry has a space? This is safer in my opinion for this input.
input = input.replace(/\s+/g, '');

// Now make an array from the input
input = input.split(',');

var x = 0;
var y = 0;
var directionOptions = ['N', 'E', 'S', 'W'];
// "The Document indicates that you should start ... face[ing] North."
var currentHeading = 0;

// Log locations visited for part 2
var locationsVisited = ['0,0'];
var foundFirstRepeat = false;

var stepRoutines = {
    'N': function(x, y, value) {
        return `${x},${y + value}`;
    },
    'S': function(x, y, value) {
        return `${x},${y - value}`;
    },
    'E': function(x, y, value) {
        return `${x + value},${y}`;
    },
    'W': function(x, y, value) {
        return `${x - value},${y}`;
    }
}

for (let i = 0; i < input.length; i++) {
    // First split up the direction and the value

    // 'let' is "block scope" so this variable is new for each iteration of the loop.
    // If we used 'var' this would be an error, trying to redeclare it within the same function.
    let direction = input[i][0];
    let value = input[i].substr(1);

    // '0' + 1 == '01' Javascript is funny, so let s make SURE it is a numbER
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
    value = parseInt(value, 10);

    // Now find out which direction we are going at this point.

    // 'L'eft will decrement the heading as a counter-clockwise move. 'R'ight will increment it as a clocwise move arond the compass.
    if (direction === 'L') {
        currentHeading--
    }
    else {
        currentHeading++
    }
    // Now we wrap the currentHeading within the directionOptions bounds.
    // There are a lot of ways to do this, this one is just the most obvious,
    // or hopefully the least "clever"
    // Remember 0 indexed arrays.
    if (currentHeading === -1) {
        currentHeading = directionOptions.length - 1;
    }
    if (currentHeading === directionOptions.length) {
        currentHeading = 0;
    }

    // Now increment our X,Y coordinates based on our heading and the value

    // add steps to list of locations and check if it we've seen it before
    if (!foundFirstRepeat) {
        let stepValue = 1;
        while (stepValue <= value) {
            let step = stepRoutines[directionOptions[currentHeading]](x, y, stepValue);
            if (locationsVisited.indexOf(step) === -1) {
                locationsVisited.push(step);
            }
            else {
                foundFirstRepeat = true;
                let stepArray = step.split(',');
                stepArray[0] = parseInt(stepArray[0], 10);
                stepArray[1] = parseInt(stepArray[1], 10);
                console.log(`First repeat is at ${step}, which is ${Math.abs(stepArray[0]) + Math.abs(stepArray[1])} blocks away from the starting location.`)
            }
            stepValue++;
        }
    }

    switch (directionOptions[currentHeading]) {
        case 'N':
            y += value;
            break;
        case 'S':
            y -= value;
            break;
        case 'E':
            x += value;
            break;
        case 'W':
            x -= value;
            break;
        default:
            console.error('Unknown input!');
            continue;
    }

    // console.log(direction, value, directionOptions[currentHeading], x, y); // For debugging
}
// console.log(locationsVisited[locationsVisited.length - 1]); // for debugging

// Now just add x + y to get the "number of blocks" you are actually away.
console.log(`You are now at (${x}, ${y}) ${Math.abs(x) + Math.abs(y)} blocks away!`);
