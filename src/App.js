import React, { useState, useEffect } from "react";
import CricketCollectibleArtifact from "../artifacts/CricketCollectible.json";
import getWeb3 from "./getWeb3";

function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const init = async () => {
      const web3Instance = await getWeb3();
      const accounts = await web3Instance.eth.getAccounts();
      const networkId = await web3Instance.eth.net.getId();
      const deployedNetwork = CricketCollectibleArtifact.networks[networkId];
      const contractInstance = new web3Instance.eth.Contract(
        CricketCollectibleArtifact.abi,
        deployedNetwork && deployedNetwork.address
      );

      setWeb3(web3Instance);
      setAccounts(accounts);
      setContract(contractInstance);
    };

    init();
  }, []);

  const mintCollectible = async () => {
    const tokenId = await contract.methods
      .mintCollectible(accounts[0], "https://path-to-metadata.json")
      .send({ from: accounts[0] });
    console.log("Minted Token ID:", tokenId);
  };

  if (!web3 || !accounts || !contract) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Cricket Collectibles NFT Marketplace</h1>
      <button onClick={mintCollectible}>Mint Collectible</button>
    </div>
  );
}

export default App;