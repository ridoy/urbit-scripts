const ob = require('urbit-ob');
const fs = require('fs');

function toPaddedHexString(num, len) {
    str = num.toString(16);
    return "0".repeat(len - str.length) + str;
}

const starName = '~ribwet';
const starHex = ob.patp2hex(starName);

let csv = '';

for (let i = 0; i < 16*16*16*16; i++) {
    let str = ob.hex2patp(toPaddedHexString(i, 4) + starHex);
    csv += str + ',';
}


const filename = starName + '-planets.csv';
fs.writeFileSync(filename, csv);
