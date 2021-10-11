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


let el = "M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z";
let er = "M0 127.946C0.0292286 57.2783 57.3256 3.08928e-06 128 0C128 70.6823 70.7089 127.984 0.0305092 128C0.0203397 128 0.01017 128 2.36469e-09 128L0 127.946Z";
let faceWord = "padryc";


let phonemeJson = JSON.parse(fs.readFileSync('index.json', 'utf-8'));

let els = [];
let ers = [];

for (let key of Object.keys(phonemeJson)) {
    let phoneme = phonemeJson[key];
    // iterate over children, if has circle, append to list
    if (!phoneme.children) continue;
    for (let child of phoneme.children) {
        if (!child.name === "path") continue;
        let path = child.attributes.d;
        if (path === el && prefixMap[key]) els.push(key);
        else if (path === er && suffixMap[key]) ers.push(key);
    }
}

let earWords = [];
for (let a of els) {
for (let b of ers) {
    earWords.push(a+b);
}
}

let planets = [];
for (let word1 of earWords) {
    planets.push(`~${word1}-${faceWord}`);
}

console.log(planets);
fs.writeFileSync('playboy-bunny-planets.csv', planets.join(','));


