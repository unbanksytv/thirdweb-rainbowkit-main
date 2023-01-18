import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useContract } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const contract = useContract("0x77F5D30Ee23D85eDa80c82cd3EA9161B15FFc8Bd", "nft-drop");
  const { address, status } = useAccount();

  const claim = async () => {
    try {
      if (contract) {
        await contract.claim(1);
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (status === "connecting" || status === "reconnecting") {
    return null;
  }

  return (
    <div className={styles.container}>
      <ConnectButton />
      {address ? (
        <button onClick={claim}>Claim</button>
      ) : (
        <p>Please connect your wallet</p>
      )}
    </div>
  );
};

export default Home;
