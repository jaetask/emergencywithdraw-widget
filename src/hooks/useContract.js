import { useMemo } from "react";
import {
  getFetcherContract,
} from "../utils/contractHelper";
import useWeb3 from "./useWeb3";

export const useFetcher = () => {
  const { web3, chainId } = useWeb3();
  return useMemo(() => getFetcherContract(web3, chainId), [web3, chainId]);
};