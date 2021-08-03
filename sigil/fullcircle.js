
const fs = require('fs');

let prefixString = `dozmarbinwansamlitsighidfidlissogdirwacsabwissib
rigsoldopmodfoglidhopdardorlorhodfolrintogsilmir
holpaslacrovlivdalsatlibtabhanticpidtorbolfosdot
losdilforpilramtirwintadbicdifrocwidbisdasmidlop
rilnardapmolsanlocnovsitnidtipsicropwitnatpanmin
ritpodmottamtolsavposnapnopsomfinfonbanmorworsip
ronnorbotwicsocwatdolmagpicdavbidbaltimtasmallig
sivtagpadsaldivdactansidfabtarmonranniswolmispal
lasdismaprabtobrollatlonnodnavfignomnibpagsopral
bilhaddocridmocpacravripfaltodtiltinhapmicfanpat
taclabmogsimsonpinlomrictapfirhasbosbatpochactid
havsaplindibhosdabbitbarracparloddosbortochilmac
tomdigfilfasmithobharmighinradmashalraglagfadtop
mophabnilnosmilfopfamdatnoldinhatnacrisfotribhoc
nimlarfitwalrapsarnalmoslandondanladdovrivbacpol
laptalpitnambonrostonfodponsovnocsorlavmatmipfip`.replaceAll('\n', '');

let suffixString = `zodnecbudwessevpersutletfulpensytdurwepserwylsun
rypsyxdyrnuphebpeglupdepdysputlughecryttyvsydnex
lunmeplutseppesdelsulpedtemledtulmetwenbynhexfeb
pyldulhetmevruttylwydtepbesdexsefwycburderneppur
rysrebdennutsubpetrulsynregtydsupsemwynrecmegnet
secmulnymtevwebsummutnyxrextebfushepbenmuswyxsym
selrucdecwexsyrwetdylmynmesdetbetbeltuxtugmyrpel
syptermebsetdutdegtexsurfeltudnuxruxrenwytnubmed
lytdusnebrumtynseglyxpunresredfunrevrefmectedrus
bexlebduxrynnumpyxrygryxfeptyrtustyclegnemfermer
tenlusnussyltecmexpubrymtucfyllepdebbermughuttun
bylsudpemdevlurdefbusbeprunmelpexdytbyttyplevmyl
wedducfurfexnulluclennerlexrupnedlecrydlydfenwel
nydhusrelrudneshesfetdesretdunlernyrsebhulryllud
remlysfynwerrycsugnysnyllyndyndemluxfedsedbecmun
lyrtesmudnytbyrsenwegfyrmurtelreptegpecnelnevfes`.replaceAll('\n', '');


let prefixes = prefixString.match(/.{1,3}/g);
let suffixes = suffixString.match(/.{1,3}/g);
// optimize checking by using a map
let prefixMap = {};
let suffixMap = {};
prefixes.map(p => prefixMap[p] = true);
suffixes.map(p => suffixMap[p] = true);


let ul = "M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z";
let ur = "M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z";
let bl = "M0 0C0 70.6925 57.3075 128 128 128V0H0Z";
let br = "M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z";


let phonemeJson = JSON.parse(fs.readFileSync('index.json', 'utf-8'));

let uls = [];
let urs = [];
let bls = [];
let brs = [];

for (let key of Object.keys(phonemeJson)) {
    let phoneme = phonemeJson[key];
    // iterate over children, if has circle, append to list
    if (!phoneme.children) continue;
    for (let child of phoneme.children) {
        if (!child.name === "path") continue;
        let path = child.attributes.d;
        if (path === ul && prefixMap[key]) uls.push(key);
        else if (path === ur && suffixMap[key]) urs.push(key);
        else if (path === bl && prefixMap[key]) bls.push(key);
        else if (path === br && suffixMap[key]) brs.push(key);
    }
}


let tops = [];
let bots = [];

let planets = [];

for (let a of uls) {
    for (let b of urs) {
        tops.push(a + b);
    }
}

for (let a of bls) {
    for (let b of brs) {
        bots.push(a + b);
    }
}



for (let a of tops) {
for (let b of bots) {
    planets.push('~' + a + '-' + b);
}
}
console.log(planets.length);

let planetStr = planets.join(',');

fs.writeFileSync('full-circle-planets.csv', planetStr);

/*
let rib = fs.readFileSync('../~ribwet-planets.csv', 'utf-8').split(',');
let ribMap = {}
rib.map(p => ribMap[p] = true);

let count = 0;
for (let planet of planets) {
    if (ribMap[planet]) {
        console.log(planet);
    }
    //if (count % 1000 === 0) { console.log(count); }
    count++;

}
*/
