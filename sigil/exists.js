/// does this planet be active?
//
var http = require("request");
var fs = require('fs');


let f = fs.readFileSync('playboy-bunny-planets.csv', 'utf-8');
let words = f.split(',');


let wordsMap = {};
words.map(w => wordsMap[w] = true);


// UPDATE THE DATE BEFORE YOU RUN THE SCRIPT!!
//
let date = '20210804';

let existing = [];
//words = words.slice(200, -1);
async function init() {
    let width = 20;

    // Availability check.
    // Split up requests so we don't get timed out
    console.log(words);
    console.log('Start availability check.');
    for (let i = 0; i < words.length; i += width) {
        let slicedWords = words.slice(i, i+width);
        for (let word of slicedWords) {
            doReq(word, 0);
        }
        console.log('Sleeping.');
        await sleep(30000);

    }
    let fileContent = 'point,name\n';
    console.log('Availability check finished. Writing file.');
    for (let entry of existing) {
        fileContent += `${entry.point},${entry.name}\n`;
    }
    fs.writeFileSync(date + '.csv', fileContent);
}
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
init()

function doReq(word, attempt) {
    let url = `https://api.urbit.live/shipData?ship=${word}`

    http(url, function(err, res, body) {
        if (err) { console.log(err); }
        try {
            let parsed = JSON.parse(body);
            if (parsed.available) {
                existing.push(parsed.name);
                console.log('\x1b[36m%s\x1b[0m', word);
            } else {
                console.log('\x1b[35m%s\x1b[0m', word);
            }
        } catch (e) {
            console.log(e, body);
            console.log('retrying ' + word + ' attempt ' + attempt);
            doReq(word, attempt + 1);
        }
    });
}
