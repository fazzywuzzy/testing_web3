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
  '2': 50000000000000000000000n,
  __length__: 3,
  from: '0x0000000000000000000000000000000000000000',
  to: '0xF68a4b64162906efF0fF6aE34E2bB1Cd42FEf62d',
  value: 50000000000000000000000n
}
Transaction Hash: 0x5a1c86452f57de103973c176d39c0318f77655eec8d0159ee31c57120d1fd9d7
Block Number: 6361047
From Address: 0x0x0000000000000000000000000000000000000000
To Address: 0x0xf68a4b64162906eff0ff6ae34e2bb1cd42fef62d
Amount in Ether: 50000
Decoded Log: {
  '0': '0x0000000000000000000000000000000000000000',
  '1': '0xF68a4b64162906efF0fF6aE34E2bB1Cd42FEf62d',
  '2': 200000000000000000000000n,
  __length__: 3,
  from: '0x0000000000000000000000000000000000000000',
  to: '0xF68a4b64162906efF0fF6aE34E2bB1Cd42FEf62d',
  value: 200000000000000000000000n
}
Transaction Hash: 0x269e0927f1bee56a18b37598b1115b2944a2c11edc6bdb84f47c1633de2aa65d
Block Number: 6391072
From Address: 0x0x0000000000000000000000000000000000000000
To Address: 0x0xf68a4b64162906eff0ff6ae34e2bb1cd42fef62d
Amount in Ether: 200000
```
