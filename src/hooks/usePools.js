import { notification } from "antd";
import { useContext, useEffect, useState } from "react"
import AddressContext from "../contexts/AddressContext";
import { useFetcher } from "./useContract";
import useWeb3 from "./useWeb3";

const usePools = () => {
  const web3 = useWeb3()
  const [pools, setPools] = useState()
  const {masterchefAddress, userAddress} = useContext(AddressContext);
  const fetcher = useFetcher();
  useEffect(() => {
    const fetch = async () => {
      if (fetcher === undefined || web3 === undefined || masterchefAddress === undefined || userAddress === undefined) {
        return []
      }
      let  result = []
      let rawPools = []
      let start = 0
      const interval = 10
      try {
      do {
        rawPools = await fetcher.methods.fetchPools(masterchefAddress, userAddress, start, interval).call()
        // Currently fetcher always returns 10 pools, filter out padding ones
        rawPools = rawPools.filter(pool => pool.want !== "0x0000000000000000000000000000000000000000") 
        for(let i = 0; i < rawPools.length; i++) {
          const pool = rawPools[i]
          result.push({
            "name": pool.name, 
            "symbol": pool.symbol, 
            "amount": pool.amount, 
            "pid": start + i, 
            "want": pool.want,
            "mc": masterchefAddress})
        }
        start += interval
        
      } while(rawPools.length >= interval && start <= 200) // Give up after 200 pools
    }catch(e){
        console.error(e)
        notification.open({
          message: 'Unable to fetch masterchef',
          description: 'Are you sure the address is correct?'
        })
    }
      return result
    }
    fetch().then(pools => {
      setPools(pools);
    })
  }, [masterchefAddress, userAddress, fetcher, web3])

  return pools
}

export default usePools