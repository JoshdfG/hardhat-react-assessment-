import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import contractABI from "./abi.json";
import "./App.css";

function App() {
  const [message, setMessage] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [walletAddress, setWalletAddress] = useState(null);

  const contractAddress = "0xd4a8f57b701cd45A174ef6Cc35eEDd3C343b78D8";

  async function connectWallet() {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setWalletAddress(accounts[0]);
    } catch (error) {
      console.error("Error connecting wallet:", error.message || error);
    }
  }

  async function getMessage() {
    let contract;
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      contract = new ethers.Contract(contractAddress, contractABI, signer);

      try {
        const getMsg = await contract.getMessage();
        setMessage(getMsg);
      } catch (err) {
        console.error("Error:", err);
      }
    } else {
      await connectWallet();
    }
  }

  const handleSubmit = async () => {
    let contract;
    await updateMessage(newMessage, contract);
    await getMessage();
    setNewMessage("");
  };

  async function updateMessage(data, contract) {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      contract = new ethers.Contract(contractAddress, contractABI, signer);

      try {
        await contract.setMessage(data);
        const getMsg = await contract.getMessage();
        setMessage(getMsg);
        await getMessage();
      } catch (err) {
        console.error("Error:", err);
      }
    } else {
      await connectWallet();
    }
  }

  useEffect(() => {
    getMessage();
  }, []);

  return (
    <div className="App">
      <button className="connect" onClick={connectWallet}>
        {walletAddress ? `Connected: ${walletAddress}` : "Connect Wallet"}
      </button>
      <h1>Message Retrieval DApp</h1>

      <form>
        <h2>
          <span>Message:</span> {message}
        </h2>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Enter new message"
        />
        <div className="btns">
          <button type="button" onClick={getMessage}>
            Get New Message
          </button>
          <button type="button" onClick={handleSubmit}>
            Set Message
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
