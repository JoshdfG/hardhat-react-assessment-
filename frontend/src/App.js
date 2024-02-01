import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import contractABI from "./abi.json";
import "./App.css";

function App() {
  const [message, setMessage] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  //address
  const contractAddress = "0xd4a8f57b701cd45A174ef6Cc35eEDd3C343b78D8";

  // async function for accessing metamask in our browser
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  //getMessage function using ethers
  async function getMessage() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      try {
        const getMsg = await contract.getMessage();
        setMessage(getMsg);
      } catch (err) {
        console.error("Error:", err);
      }
    } else {
      await requestAccount();
    }
  }

  const handleSubmit = async () => {
    await updateMessage(newMessage);

    await getMessage();

    setNewMessage("");
  };

  //set message function using ethers
  async function updateMessage(data) {
    if (typeof window.ethereum !== "undefined") {
      // await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      try {
        await contract.setMessage(data);
        const getMsg = await contract.getMessage();
        setMessage(getMsg);
        await getMessage();
      } catch (err) {
        console.error("Error:", err);
      }
    } else {
      await requestAccount();
    }
  }

  useEffect(() => {
    getMessage();
  }, []);

  return (
    <div className="App">
      <button className="connect" onClick={requestAccount}>Connect Wallet</button>
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
