import abi from "./contract/ChaiContract.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Buy from "./components/Buy";
import Memos from "./components/Memos";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0xb898C32ab7ce1e9850032555D23C241704f811F9";
      const contractAbi = abi.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });
        }
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractAbi,
          signer
        );
        setState({
          provider,
          signer,
          contract,
        });
      } catch (error) {
        console.error(error);
      }
    };
    connectWallet();
  }, []);
  console.log(state);
  return (
    <div className="App dark:bg-gray-900 dark:text-gray-200 min-h-screen">
      <header className="App-header bg-gray-800 p-4">
        <h1 className="text-4xl font-bold dark:text-white text-center">
          PAY ME..
        </h1>
      </header>
      <div className="container mx-auto p-4">
        <Buy state={state} />
        <Memos state={state} />
      </div>
    </div>
  );
}

export default App;
