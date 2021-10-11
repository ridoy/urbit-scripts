const https = require('https')
const options = {
    hostname: 'node1.web3api.com',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'accept': '*/*',
        'authority': 'node1.web3api.com'
    }
}






function decimalToHexString(number)
{
  if (number < 0)
  {
    number = 0xFFFFFFFF + number + 1;
  }

  return number.toString(16).toUpperCase();
}
let tokenId = (num) => "0x6352211e000000000000000000000000000000000000000000000000000000000000" + decimalToHexString(num);
const start = 8008;
const end = 9576;


for (let i = start; i < end; i++) {

    const req = https.request(options, res => {
        console.log(res.statusCode);

        let body = '';
        res.on('data', d => {
            body += '';
        })
        res.on('end', () => {
            console.log(body);
        });
    })

    req.on('error', error => {
        console.error(error)
    })
    let data = JSON.stringify({
        jsonrpc: "2.0",
        id: 19,
        method: "eth_call",
        params: [
            {
                from: "0x0000000000000000000000000000000000000000",
                to: "0xce95fd8ba33dd1f394f17f5ad8100d4bc8daaa01",
                data: tokenId(i)
            },
            "latest"
        ]
    });
    req.write(data)
    req.end()
}
