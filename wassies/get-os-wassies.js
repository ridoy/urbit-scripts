const fs = require('fs');
// Compute total ETH value of NFTs/ERC721 tokens owned by this address.
// // TODO pass attempt
async function openSeaApiOwnerAssetsRequest(address, page, ethSum) {
    if (!page) page = 0;
    if (!ethSum) ethSum = 0;
    console.log(`${address}: Processing page ${page}`);
    await sleep(1100);
    return new Promise((resolve, reject) => {
        const params = {
            host: 'api.opensea.io',
            method: "GET",
            path: '/api/v1/assets?asset_contract_address=0x1d20a51f088492a0f1c57f047a9e30c9ab5c07ea&order_direction=desc&offset=' + (page*50) + '&limit=50'
        };
        let req = http.request(params, (res) => {
            if (res.statusCode < 200 || res.statusCode >= 300) {
                console.log(`${address}: Retrying failed request for page ${page}. HTTP status code: ${res.statusCode}`);
                return openSeaApiOwnerAssetsRequest(address, page, ethSum)
                    .then(resolve);
            }
            var body = '';
            res.setEncoding('utf8');
            res.on('data', function(chunk) {
                body += chunk;
            });
            res.on('end', function() {
                try {
                    let assets = JSON.parse(body).assets;
                    console.log(`${address} : Found ${page*50 + assets.length} assets total`);
                    ethSum += getTotalAssetValueEth(assets);
                    if (assets.length === 50) {
                        return openSeaApiOwnerAssetsRequest(address, page + 1, ethSum)
                            .then(resolve);
                    } else {
                        let query = `INSERT INTO addresses (address, eth) values ($1, $2)`;
                        let values = [address, ethSum];
                        pgClient.query(query, values)
                            .then(resolve);
                    }
                } catch(e) {
                    console.log(`${address}: Retrying failed request for page ${page}. Error: ${e}`);
                    return openSeaApiOwnerAssetsRequest(address, page, ethSum)
                        .then(resolve);
                }
            });
        });
        req.on('error', (err) => {
            console.log(`${address}: Retrying failed request for page ${page}. Error: ${err}`);
            return openSeaApiOwnerAssetsRequest(address, page, ethSum)
                .then(resolve);
        });
        req.end();
    });

}

// For each address, get opensea wallet
async function getAllWalletValues() {
    let results = [];
    let width = 1;

    // Availability check.
    // Split up requests so we don't get timed out
    console.log('Starting wallet value check.');
    for (let i = 0; i < 12345; i += width) {
        let subset = addresses.slice(i, i+width);
        if (i % 100 === 0) { 
            console.log('\x1b[36m%s\x1b[0m', `${i} addresses have now been processed.`);
        }
        for (let address of subset) {
            openSeaApiOwnerAssetsRequest(address)
                .catch((err) => {
                    console.log('Error: ' + err);
                });
        }
        await sleep(1100);
        //console.log('Sleeping.');

    }
}
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
