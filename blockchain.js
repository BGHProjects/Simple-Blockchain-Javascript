// Adapted from code by NeuralNine 
// (https://www.youtube.com/watch?v=pYasYyjByKI)

const crypto = require('crypto');

function simpleCoinBlock(previousBlockHash, transactionList)
{
    let cDate = new Date();
    let cDateString = (cDate.getDate() + "/" + cDate.getMonth() + "/" + cDate.getFullYear() + " " + cDate.getHours() + ":" + cDate.getMinutes() + ":" + cDate.getSeconds()).toString();
    let blockData = transactionList + "," + previousBlockHash + "," + cDateString;
    let blockHash = crypto.createHash('sha256').update(blockData).digest('hex');

    return {blockData: blockData, blockHash: blockHash};
}

function generateRandomTransactionList(names, numberOfTransactions, transactionRange)
{
    let transactionList = []
    for (let i = 0; i < numberOfTransactions; i++)
    {
        let firstName = names[Math.floor(Math.random() * names.length - 1) + 1];
        let copyOfNames = names.filter(e => e !== firstName);
        let secondName = copyOfNames[Math.floor(Math.random() * copyOfNames.length - 1) + 1];
        let transaction = firstName + " sends " + (Math.floor(Math.random() * transactionRange) + Math.random()).toFixed(2) + " SimpleCoin to " + secondName;
        transactionList[i] = transaction;
    }

    return transactionList;
}

function generateBlockChain(transactionList)
{
    let blockchainElements = [];
    let transactions = [];
    for(let i = 0; i < transactionList.length-1; i++)
    {
        let block;
        if (i === 0)
        {
            transactions.push(transactionList[0]);
            transactions.push(transactionList[1]);
            block = simpleCoinBlock("Initial Hash", transactions);
        }
       else
        {
            transactions.push(transactionList[i+1]);
            block = simpleCoinBlock(blockchainElements[i-1].blockHash, transactions);
        }
        blockchainElements.push(block)
    }

    return blockchainElements
}

/**
 * Example Implementation
 */

let names = ['Thor', 'Odysseus',
'Tolkien', 'Atreides', 'Roskolnikov', 'Asimov', 'Einstein', 'Newton', 'Turing', 'Zimmer'];
let numberOfTransactions = Math.floor(Math.random() * 15) + 1;
let transactionRange = Math.floor(Math.random() * (50 - 1))+1;
let transactions = generateRandomTransactionList(names, numberOfTransactions, transactionRange);
let blockchain = generateBlockChain(transactions);

for(let i = 0; i < blockchain.length; i++)
{
    console.log("\tBlock Data " + (i + 1) + "\n", blockchain[i].blockData.split(',') );
    console.log("\tBlock Hash " + (i + 1) + "\n", blockchain[i].blockHash, "\n");
}