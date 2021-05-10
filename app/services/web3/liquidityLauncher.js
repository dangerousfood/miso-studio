import { liquidityLauncher } from "@/constants/contractConfig";
import { sendTransaction as _sendTransaction, makeBatchCall as _makeBatchCall, getNetworkId } from "./base";

const liquidityLauncherAbi = liquidityLauncher.abi;
const liquidityLauncherAddress = liquidityLauncher.address;
let contractInstance;

const initContractInstance = () => {
  if (!contractInstance || web3.currentProvider.isMetaMask !== contractInstance.currentProvider.isMetaMask) {
    const address = liquidityLauncherAddress[getNetworkId()];
    contractInstance = new web3.eth.Contract(liquidityLauncherAbi, address);
  }
}

export const sendTransaction = async (methodName, args, options) => {
  initContractInstance();
  const method = contractInstance.methods[methodName](...args)
  return await _sendTransaction(method, options)
}

export const makeBatchCall = async (methods) => {
  initContractInstance();
  return await _makeBatchCall(contractInstance, methods)
}

export const subscribeToLiquidityLauncherCreatedEvent = (fromBlock = 0, store) => {
  initContractInstance();
  return contractInstance.events.LiquidityLauncherCreated({
    fromBlock: fromBlock
  });
}
