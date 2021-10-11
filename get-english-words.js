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

// I just got the words from the first google result for "every english word github". Below command filters this down to the 6 letter ones
// curl https://raw.githubusercontent.com/dwyl/english-words/master/words.txt | awk '{ if (length == 6) print }' > 6letter.txt
// UPDATE: new list: https://raw.githubusercontent.com/first20hours/google-10000-english/master/google-10000-english-no-swears.txt
let wordsFromFile = fs.readFileSync('new6letter.txt', 'utf-8').split('\n');

String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}


let validWords= [];
let vowels = ['a', 'e', 'i', 'o', 'u', 'y'];
for (let word of wordsFromFile) {
    word = word.replaceAll('-', '');
    word = word.replaceAll('\'', '');
    if(isUrbitWord(word)) validWords.push(word);
    /*
    var pre = word.substring(0, 3);
    var suf = word.substring(3, 6);
    if (!hasMiddleVowel(pre) || !hasMiddleVowel(suf)) {
        continue;
    }
    for (let i = 0; i < vowels.length; i++) {
        for (let j = 0; j < vowels.length; j++) {
            let permutation = pre.replaceAt(1, vowels[i]) + suf.replaceAt(1, vowels[j]);
            if(isUrbitWord(permutation)) { 
                console.log(word, permutation);
                validWords.push(permutation) 
            }

        }
    }
    */
}

function hasMiddleVowel(phoneme) {
    return vowels.includes(phoneme.charAt(1));

}

fs.writeFileSync('swag-slightly.txt', validWords.join('\n'), 'utf-8');

function isUrbitWord(word) {
    var pre = word.substring(0, 3);
    var suf = word.substring(3, 6);
    if (!prefixMap[pre])return false;
    if (!suffixMap[suf])return false;
    return true;
}

