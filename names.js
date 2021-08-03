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
let words6 = fs.readFileSync('6letter.txt', 'utf-8').split('\n');


let  validWords= [];
for (let word of words6) {
    word = word.replaceAll('-', '');
    word = word.replaceAll('\'', '');
    if(isUrbitWord(word)) { validWords.push(word) }
}

fs.writeFileSync('swag.txt', validWords.join('\n'), 'utf-8');

function isUrbitWord(word) {
    var pre = word.substring(0, 3);
    var suf = word.substring(3, 6);
    if (!prefixMap[pre])return false;
    if (!suffixMap[suf])return false;
    return true;
}

