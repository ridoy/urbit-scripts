var http = require("request");
var fs = require('fs');
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

let words = [];
for (let prefix of prefixes) {
    for (let suffix of suffixes) {
        words.push(`~${prefix}${suffix}`);
    }
}

console.log(words,words.length);

let start = Date.now();
let date = new Date(start).toISOString();
let existing = [];


async function init() {
    let width = 30;

    // Availability check.
    // Split up requests so we don't get timed out
    console.log('Starting availability check.');
    for (let i = 0; i < words.length; i += width) {
        let slicedWords = words.slice(i, i+width);
        console.log(slicedWords.join(', '));
        for (let word of slicedWords) {
            doReq(word, 0);
        }
        console.log('Sleeping.');
        await sleep(30000);
    }
    console.log((Date.now() - start )/ 1000 + ' s elapsed.');
    console.log('Availability check finished. Writing file.');
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}


function doReq(word, attempt) {
    let url = `https://api.urbit.live/shipData?ship=${word}`

    http(url, function(err, res, body) {
        if (err) { console.log(err); }
        try {
            let parsed = JSON.parse(body);
            if (parsed.available) {
                console.log('\x1b[36m%s\x1b[0m',parsed);
            }
            /*
            for (let entry of parsed.results) 
            {
                let exists = false;
                let first_word = entry.name.substring(1, 7);
                let second_word = entry.name.substring(7, 12);
                let other_word = (first_word === word) ? second_word : first_word;
                if (wordsMap[other_word] && entry.available) {
                    existing.push(entry);
                    let content = `${entry.point},${entry.name}`;
                }
            }
            */
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
