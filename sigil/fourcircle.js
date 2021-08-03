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




let phonemeJson = JSON.parse(fs.readFileSync('index.json', 'utf-8'));
//const circlePrefixes = new Set();
//const circleSuffixes = new Set();
const circlePrefixes = [];
const circleSuffixes =[]; 

for (let key of Object.keys(phonemeJson)) {
    let phoneme = phonemeJson[key];
    // iterate over children, if has circle, append to list
    if (!phoneme.children) continue;
    for (let child of phoneme.children) {
        if (child.name === "circle" && child.attributes.r === "64") {
            if (prefixMap[key]) {
 //               circlePrefixes.add(key);
                circlePrefixes.push(key);
            } else if (suffixMap[key]) {
                //circleSuffixes.add(key);
                circleSuffixes.push(key);
            }
        }
    }
}


let words = [];
let planets = [];
for (let pre of circlePrefixes) {
    for (let suf of circleSuffixes) {
        words.push(pre + suf);
    }
}

for (let word1 of words) {

    for (let word2 of words) {
        planets.push("~" + word1 + "-" + word2);
    }
}


        console.log(planets.length);
let planetStr = planets.join(',');

/*
fs.writeFileSync('circle-planets.csv', planetStr);

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
