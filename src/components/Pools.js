import { List, Divider } from "antd";
import emergencyWithdraw from "../actions/emergencyWithdraw";
import usePools from "../hooks/usePools";
import useWeb3 from "../hooks/useWeb3";

import Pool from "./Pool";

function Pools() {
  const pools = usePools();
  const { web3, chainId } = useWeb3();
  const onEmergencyWithdraw = async (item) => {
    const doEmergencyWithdraw = emergencyWithdraw(
      web3,
      chainId,
      item.mc,
      item.pid
    );
    doEmergencyWithdraw();
  };
  return (
    <>
      <Divider orientation="left">Pools</Divider>
      <List
        className="demo-loadmore-list"
        size="large"
        itemLayout="horizontal"
        dataSource={pools}
        renderItem={(item) => (
          <Pool
            name={item.name}
            symbol={item.symbol}
            amount={item.amount}
            pid={item.pid}
            chainId={chainId}
            want={item.want}
            onEmergencyWithdraw={() => onEmergencyWithdraw(item)}
          ></Pool>
        )}
      />
    </>
  );
}
export default Pools;
