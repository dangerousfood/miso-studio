import { tokenFactory } from "@/config/contractConfig"
import { sendTransaction, getEvents, getNetworkId, toWei, unix2datetime } from "./base";

const tokenFactoryAbi = tokenFactory.abi;
const tokenFactoryAddress = tokenFactory.address;
let contractInstance;

const initContractInstance = () => {
    if (!contractInstance || web3.currentProvider.isMetaMask !== contractInstance.currentProvider.isMetaMask) {
        const address = tokenFactoryAddress[getNetworkId()];
        contractInstance = new web3.eth.Contract(tokenFactoryAbi, address);
    }
}

export const deployToken = async (data, from) => {
    initContractInstance();
    const method = contractInstance.methods.deployTokenContract(
        data.symbol,
        data.name,
        18,
        toWei(data.totalSupply, "ether"));

    const txHash = await sendTransaction(method, from, data.deploymentFee);

    return txHash;
}

export const getCreatedTokens = async (fromBlock) => {
    initContractInstance();
    const events = await getEvents(contractInstance, "TokenCrated", fromBlock);
    let tokens = [];
    for (let i = 0; i < events.length; i++) {
        const token = await getFixedTokenDetailFromEvent(events[i]);
        tokens.push(token);
    }
    return tokens;
}

export const subscribeToTokenDeployedEvent = (fromBlock = 0, store) => {
    initContractInstance();
    return contractInstance.events.TokenDeployed({
        fromBlock: fromBlock
    });
}

const getFixedTokenDetailFromEvent = async (event) => {
    // const symbol = event.returnValues.symbol;
    // const name = event.returnValues.name;
    const totalSupply = event.returnValues.totalSupply;
    const address = event.returnValues.token;
    const blockNumber = event.blockNumber;
    const block = await web3.eth.getBlock(blockNumber);
    const createdAt = unix2datetime(block.timestamp);

    const token = { address, totalSupply, createdAt, blockNumber };
    return token;
}
