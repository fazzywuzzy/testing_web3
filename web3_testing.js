require('dotenv').config();

const apiKey = process.env.API_KEY;
const { Web3 } = require('web3');
const { ethers } = require('ethers');
const web3 = new Web3();
const axios = require('axios');

const NULL_ADDRESS = ethers.ZeroAddress;

const getBlockNumber = async (timestamp) => {
    const blockNumberURL = `https://api.bscscan.com/api?module=block&action=getblocknobytime&timestamp=${timestamp}&closest=before&apikey=${apiKey}`;

    try {
        const response = await axios.get(blockNumberURL);
        const data = response.data;
        if (data.status === "1" && data.result) {
            return data.result;
        } else {
            console.log(data);
            throw new Error("Failed to retrieve block number");
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

const getLogs = async (toBlock, fromBlock = 0, addresses) => {
    const topic0 = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";
    const topic0_1_opr = "or";
    const topic1 = "0x0000000000000000000000000000000000000000000000000000000000000000";
    const topic1_2_opr = "or";
    const topic2 = "0x0000000000000000000000000000000000000000000000000000000000000000";

    const addressesParam = addresses.join(',');

    const logsURL = `https://api.bscscan.com/api?module=logs&action=getLogs&fromBlock=${fromBlock}&toBlock=${toBlock}&address=${addressesParam}&topic0=${topic0}&topic0_1_opr=${topic0_1_opr}&topic1=${topic1}&topic1_2_opr=${topic1_2_opr}&topic2=${topic2}&apikey=${apiKey}`;

    try {
        const response = await axios.get(logsURL);
        const data = response.data;
        if (data.status === "1" && data.result) {
            return data.result;
        } else {
            console.log(data);
            throw new Error("Failed to retrieve logs");
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

const timestamp = Math.floor(Date.now() / 1000);
console.log(timestamp);
const addresses = ['0x2170Ed0880ac9A755fd29B2688956BD959F933F8']; // ETH_BSC


// ABI for ETH BSC
const abi = [
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "_decimals",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "_name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "_symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "burn",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "subtractedValue",
                "type": "uint256"
            }
        ],
        "name": "decreaseAllowance",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getOwner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "addedValue",
                "type": "uint256"
            }
        ],
        "name": "increaseAllowance",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "mint",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const decodeLogs = async () => {
    const currentDate = new Date();
    const lastMonthDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
    const timestamp = Math.floor(Date.now() / 1000);

    try {
        const blockNumber = await getBlockNumber(timestamp);
        console.log('Latest Block Number:', blockNumber);

        const logs = await getLogs(blockNumber, 0, addresses);
        // console.log('Logs:', logs);

        logs.forEach(log => {
            const eventSignature = log.topics[0];
            const event = abi.find(e => {
                if (e.type === 'event') {
                    return web3.eth.abi.encodeEventSignature(e) === eventSignature;
                }
                return false;
            });

            if (event && event.name === 'Transfer') {
                // console.log('Event:', event);
                const decodedLog = web3.eth.abi.decodeLog(
                    event.inputs,
                    log.data,
                    log.topics.slice(1) // Remove the first topic which is the event signature
                );
                console.log('Decoded Log:', decodedLog);

                // Extracting information from decoded log
                const transactionHash = log.transactionHash;
                const blockNumber = parseInt(log.blockNumber, 16); // Convert from hex
                const fromAddress = decodedLog.from.toLowerCase();
                const toAddress = decodedLog.to.toLowerCase();
                const amount = web3.utils.fromWei(decodedLog.value.toString(), 'ether');
                // Determine if it's a mint or burn event or transfer
                let operationType;
                if (fromAddress === NULL_ADDRESS) {
                    operationType = 'Mint';
                } else if (toAddress === NULL_ADDRESS) {
                    operationType = 'Burn';
                } else {
                    operationType = event.name;
                }

                console.log('Transaction Hash:', transactionHash);
                console.log('Block Number:', blockNumber);
                console.log('From Address:', fromAddress);
                console.log('To Address:', toAddress);
                console.log('Amount in Ether:', amount);
                console.log('Event Type:', operationType);
            } else {
                console.log('Event not found in ABI for log:', log);
            }
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

decodeLogs();

// // Sample log entry -- from ETH BSC can get it from API
// // based on this:
// /** @dev Creates `amount` tokens and assigns them to `account`, increasing
//   * the total supply.
//   *
//   * Emits a {Transfer} event with `from` set to the zero address.
//   *
//   * Requirements
//   *
//   * - `to` cannot be the zero address.
//   */
// //  function _mint(address account, uint256 amount) internal {
// //     require(account != address(0), "BEP20: mint to the zero address");

// //     _totalSupply = _totalSupply.add(amount);
// //     _balances[account] = _balances[account].add(amount);
// //     emit Transfer(address(0), account, amount);
// //   }