# What this do

Sample application of fetching ETH_BSC logs using BSCScan API ([getLogs](https://docs.bscscan.com/api-endpoints/logs) and [getBlockNumber](https://docs.bscscan.com/api-endpoints/blocks#get-block-number-by-timestamp))

Utilizing web3.js library to decode the logs with together with the Contract Source's ABI found on BSCScan

### IF you wanna run it locally:

1. Go to https://docs.bscscan.com/getting-started/creating-an-account to Create an Account and get an API key
2. Clone the repo
3. Create a .env file in this directory, and populate your API_KEY with the key obtained from 1.
4. Install the necessary libraries required in this script.
5. Run it with `node web3_testing.js`

---

### A demo of the output:

```shell
Decoded Log: {
  '0': '0x0000000000000000000000000000000000000000',
  '1': '0xF68a4b64162906efF0fF6aE34E2bB1Cd42FEf62d',
  '2': 100000000000000000000000n,
  __length__: 3,
  from: '0x0000000000000000000000000000000000000000',
  to: '0xF68a4b64162906efF0fF6aE34E2bB1Cd42FEf62d',
  value: 100000000000000000000000n
}
Transaction Hash: 0x349dab29e5d58d25cfccac2fecc6edecfab843c84b1d10122e8743b3c8ab300c
Block Number: 7142971
From Address: 0x0000000000000000000000000000000000000000
To Address: 0xf68a4b64162906eff0ff6ae34e2bb1cd42fef62d
Amount in Ether: 100000
Event Type: Mint
Decoded Log: {
  '0': '0x0000000000000000000000000000000000000000',
  '1': '0xF68a4b64162906efF0fF6aE34E2bB1Cd42FEf62d',
  '2': 100000000000000000000000n,
  __length__: 3,
  from: '0x0000000000000000000000000000000000000000',
  to: '0xF68a4b64162906efF0fF6aE34E2bB1Cd42FEf62d',
  value: 100000000000000000000000n
}
Transaction Hash: 0x20048db108943b55bd27ec2c065e895998fe7b992407e04d520ab73d386d8019
Block Number: 11120766
From Address: 0x0000000000000000000000000000000000000000
To Address: 0xf68a4b64162906eff0ff6ae34e2bb1cd42fef62d
Amount in Ether: 100000
Event Type: Mint
```
