import {crowdsaleTemplate} from "../../../config/contractConfig";
import {getNetworkId, makeBatchCall as _makeBatchCall, sendTransaction as _sendTransaction} from "../base";

const crowdsaleTemplateAbi = crowdsaleTemplate.abi;
const crowdsaleTemplateAddress = crowdsaleTemplate.address;
let contractInstance;

const initContractInstance = () => {
  if (!contractInstance || web3.currentProvider.isMetaMask !== contractInstance.currentProvider.isMetaMask) {
    const address = crowdsaleTemplateAddress[getNetworkId()];
    contractInstance = new web3.eth.Contract(crowdsaleTemplateAbi, address);
  }
};

export const sendTransaction = async (methodName, args, options) => {
  initContractInstance();
  const method = contractInstance.methods[methodName](...args)
  return await _sendTransaction(method, options)
}

export const makeBatchCall = async (methods) => {
  initContractInstance();
  return await _makeBatchCall(contractInstance, methods)
}


export const subscribeToTokensPurchasedEvent = (fromBlock = 0, store) => {
  initContractInstance();
  return contractInstance.events.TokensPurchased({
    fromBlock: fromBlock
  });
}
