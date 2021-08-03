var http = require("request");
var fs = require('fs');


let f = fs.readFileSync('swag.txt', 'utf-8');
let words = f.split('\n');


let wordsMap = {};
words.map(w => wordsMap[w] = true);


// UPDATE THE DATE BEFORE YOU RUN THE SCRIPT!!
//
let date = '20210804';

let existing = [];
async function init() {
    let width = 20;

    // Availability check.
    // Split up requests so we don't get timed out
    for (let i = 0; i < words.length; i += width) {
        let slicedWords = words.slice(i, i+width);
        for (let word of slicedWords) {
            doReq(word, 0);
        }
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
    let url = `https://api.urbit.live/search?scope=spawning&query=${word}&page=1&sortBy=name&sortDir=asc`

    http(url, function(err, res, body) {
        if (err) { console.log(err); }
        try {
            let parsed = JSON.parse(body);
            for (let entry of parsed.results) 
            {
                let exists = false;
                let first_word = entry.name.substring(1, 7);
                let second_word = entry.name.substring(7, 12);
                let other_word = (first_word === word) ? second_word : first_word;
                if (wordsMap[other_word] && entry.available) {
                    existing.push(entry);
                    console.log('\x1b[36m%s\x1b[0m', entry);
                }
            }

        } catch (e) {
            console.log(e);
            console.log('retrying ' + word + ' attempt ' + attempt);
            doReq(word, attempt + 1);
        }
    });
}
