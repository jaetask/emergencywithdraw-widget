import "./App.css";

import Pools from "./components/Pools";
import MasterchefSearch from "./components/MasterchefSearch";
import { useEffect, useState } from "react";
import AddressContext from "./contexts/AddressContext";
import { ZERO_ADDRESS } from "./utils/addressHelper";
import useWeb3 from "./hooks/useWeb3";

function App() {
  const [web3, connectWeb3]  = useWeb3();
  const [masterchefAddress, setMasterchefAddress] = useState(undefined);
  const [userAddress, setUserAddress] = useState(ZERO_ADDRESS);
  useEffect(() => {
    if (
      web3 === undefined ||
      web3.currentProvider === undefined ||
      web3.currentProvider.selectedAddress === undefined
    ) {
      return;
    }

    setUserAddress(web3.currentProvider.selectedAddress);
  }, [web3, userAddress]);

  const onStart = async (masterchefAddress_) => {
    await connectWeb3();
    console.log("searching: " + masterchefAddress_)
    setMasterchefAddress(masterchefAddress_);
  };

  return (
    <AddressContext.Provider value={{ masterchefAddress, userAddress }}>
      <div className="App">
        <MasterchefSearch onStart={onStart} />
        <Pools />
      </div>
    </AddressContext.Provider>
  );
}

export default App;
