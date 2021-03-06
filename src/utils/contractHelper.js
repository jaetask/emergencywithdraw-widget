import fetcherAbi from "../config/abi/fetcher.json";
import masterchefAbi from "../config/abi/masterchef.json";
import { getFetcherAddress } from "./addressHelper";

export const getDefaultGasPrice = (web3, chainId) => {
  const toBN = web3.utils.toBN;
  const gasPrices = {
    56: toBN(5).mul(toBN(10).pow(toBN(9))),
    137: toBN(1).mul(toBN(10).pow(toBN(9))),
  };

  return chainId in gasPrices ? gasPrices[chainId] : 0;
};
const getContract = (abi, address, web3, chainId) => {
  if (web3 === undefined) {
    return undefined;
  }
  return new web3.eth.Contract(abi, address, {
    gasPrice: getDefaultGasPrice(web3, chainId).toString(),
  });
};

export const getFetcherContract = (web3, chainId) => {
  if (web3 === undefined || web3.eth === undefined) {
    return undefined;
  }
  return getContract(
    fetcherAbi,
    getFetcherAddress(chainId, web3),
    web3,
    chainId
  );
};

export const getMasterchefContract = (web3, chainId, masterchefAddress) => {
  if (
    web3 === undefined ||
    web3.eth === undefined ||
    masterchefAddress == null
  ) {
    return undefined;
  }
  return getContract(masterchefAbi, masterchefAddress, web3, chainId);
};
