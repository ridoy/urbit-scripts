const fs= require('fs');

let wassies= JSON.parse(fs.readFileSync('wassies.csv', 'utf-8'));

let data = {};

for (let i = 0; i<wassies.length; i++) {
    let j = JSON.parse(wassies[i]);
    if (j) {
        for (let a of j.attributes) {
            let trait = a.trait_type;
            let value = a.value;
            if (!data[trait]) {
                data[trait] = {};
            }
            if (!data[trait][value]) {
                data[trait][value] = {count: 0}
            }

            data[trait][value]['count'] += 1;
        }
    }
}


// Compute %s
let bop = [];
for (let trait of Object.keys(data)) {
    let values = data[trait];
    let sum = 0;
    for (let value of Object.keys(values)) {
        sum += values[value].count;
    }
    for (let value of Object.keys(values)) {
        let pct = values[value].count / sum;
        data[trait][value].pct = pct;
        bop.push([trait, value,pct]);
    }
    data[trait] = values;

}


// find rarest traits
//
let sorted = bop.sort(function(a,b) { return a[2] - b[2]; });

let rarest = sorted.filter(function(a) { return a[2] < .01 });


fs.writeFileSync('traits.csv', sorted.join('\n'));

// print wassie ids with rarest traits + amount


let wassie_rarity = {};

let rarity2 = [];

for (let j of wassies) {
    let w = JSON.parse(j);
    if (w) {
        for (let a of w.attributes) {
            for (let r of rarest) {
                if (r[0] === a.trait_type && r[1] === a.value) {
                    if (!wassie_rarity[w.name]) {
                        wassie_rarity[w.name] = {
                            count: 0,
                            r: []
                        };
                    }
                    wassie_rarity[w.name]['count'] += 1;
                    wassie_rarity[w.name]['r'].push(r);
                }
            }
            

        }

    }


}


for (let w of Object.keys(wassie_rarity)) {
    rarity2.push([w, wassie_rarity[w].count]);
}
console.log(rarity2.sort(function(a,b) { return a[1] - b[1] }).join('\n'));
