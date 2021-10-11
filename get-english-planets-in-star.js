var fs = require('fs');

let starName = '~ribwet';
let planetsInStar = fs.readFileSync('star2planets/csv/~ribwet-planets.csv', 'utf-8').split(',');
let f = fs.readFileSync('swag-slightly.txt', 'utf-8');
let words = f.split('\n');
let wordsMap = {};
let existing = [];

words.map(w => wordsMap[w] = true);
    console.log(wordsMap);

for (let planet of planetsInStar) {
    let first_word = planet.substring(1, 7);
    let second_word = planet.substring(8, 14);
    if (wordsMap[first_word] && wordsMap[second_word]) {
        console.log(planet);
    }
}
