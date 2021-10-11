var http = require("request");
var fs = require('fs');


let ids = [];

let result = [];

for (let i = 0; i < 10000; i++) {
    ids.push(i +'');
}

async function init() {
    let width = 200;

    // Availability check.
    // Split up requests so we don't get timed out
    console.log('Starting availability check.');
    for (let i = 0; i < ids.length; i += width) {
        let slice =ids.slice(i, i+width);
        console.log(`${i}-${i+width}: ${slice.join(',')}`);
        for (let id of slice) {
            doReq(id, 0);
        }
        let fileContent = JSON.stringify(result);
        console.log(fileContent);
        fs.writeFileSync('wassies.csv', fileContent);
        console.log('Sleeping.');
        await sleep(10000);
    }
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}


function doReq(id, attempt) {
    let url = `https://fruuydfac2a4b4v5rip3ovqv5gg2sbaqgcgwnbnztlbt7xed7ela.arweave.net/LGlMDKAWgcDyvYoft1YV6Y2pBBAwjWaFuZrDP9yD-RY/${id}.json`

    http(url, function(err, res, body) {
        if (err) { console.log(err); }
        try {
            result.push(body);
        } catch (e) {
            console.log(e, body);
            setTimeout(() => {
                console.log('retrying ' + word + ' attempt ' + attempt);
                doReq(word, attempt + 1)
            }, 10000);
        }
    });
}

init();
