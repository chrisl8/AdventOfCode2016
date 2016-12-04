// Node.js code to read the input from a file.
var fs = require('fs');
var filename = 'day4input.txt';
var input = fs.readFileSync(filename, 'utf8');

var lines = input.split('\n');

var sectorIdSum = 0;

// http://stackoverflow.com/a/12504061
function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}

for (let i = 0; i < lines.length; i++) {

    let lineparts = lines[i].split('-');
    let sectorIdAndChecksum = lineparts.pop();
    sectorIdAndChecksum = sectorIdAndChecksum.split('[');
    let sectorId = parseInt(sectorIdAndChecksum[0], 10);
    let checksum = sectorIdAndChecksum[1];
    checksum = checksum.replace(/]/g, '');
    let roomNumberArray = lineparts.join('').split('').sort();

    let roomNameObject = {};
    let newCheckSum = [];
    for (let k = 0; k < roomNumberArray.length; k++) {
        if (roomNameObject.hasOwnProperty(roomNumberArray[k])) {
            roomNameObject[roomNumberArray[k]]++;
        }
        else {
            roomNameObject[roomNumberArray[k]] = 1;
            newCheckSum.push(roomNumberArray[k]);
        }
    }

    // console.log(newCheckSum);
    newCheckSum.sort(function(a, b) {
        // console.log(a, b, roomNameObject[a], roomNameObject[b])
        // Check if count for letter is higher/lower, remember sort is reversed.
        if (roomNameObject[a] > roomNameObject[b]) {
            return -1;
        }
        if (roomNameObject[a] < roomNameObject[b]) {
            return 1;
        }
        // Otherwise check if letter is higher or lower in alphabet
        if (a < b) {
            return -1;
        }
        else {
            return 1
        }
    });

    if (checksum === newCheckSum.slice(0, 5).join('')) {
        sectorIdSum += sectorId;
        let fullRoomNameArray = lineparts.join('-').split('');
        for (let l = 0; l < fullRoomNameArray.length; l++) {
            if (fullRoomNameArray[l] === '-') {
                fullRoomNameArray[l] = ' ';
            } else {
                for (let m = 1; m <= sectorId; m++) {
                    if (fullRoomNameArray[l] === 'z') {
                        fullRoomNameArray[l] = 'a'
                    } else {
                        fullRoomNameArray[l] = nextChar(fullRoomNameArray[l]);
                    }
                }
            }
        }
        let decryptedRoomName = fullRoomNameArray.join('');
        if (decryptedRoomName.indexOf('northpole') > -1) {
            console.log(`Sector ID of ${decryptedRoomName} is ${sectorId}.`);
        }
    }
    // console.log(lineparts, roomNameObject, sectorId, sectorIdSum, checksum, newCheckSum.slice(0, 5).join(''), checksum === newCheckSum.slice(0, 5).join(''));
}

console.log(sectorIdSum);
