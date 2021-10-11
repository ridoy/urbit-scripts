const fs= require('fs')

let f1 = fs.readFileSync('2021-09-23T19:15:55.028Z.csv', 'utf-8').split('\n');

let f2 = fs.readFileSync('csv/2021-09-11T15:16:19.253Z.csv', 'utf-8').split('\n');

let f1map = {};
let f2map = {};

f1.map(e => f1map[e] = true);
f2.map(e => f2map[e] = true);

console.log('items from f1 not in f2');
for (let e of f1) {
    if (!f2map[e]) {
        console.log(e);
    }
}

console.log('items from f2 not in f1');
for (let e of f2) {
    if (!f1map[e]) {
        console.log(e);
    }
}
