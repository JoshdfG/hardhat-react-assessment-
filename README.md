
# Decentralized Application (Dapp) - Message Setter and Getter

<img width="100%" src="https://github.com/Signor1/A-Set-And-Get-Message-Dapp/blob/55ca38ab32e961812724dc9c8f94c09ae49b85f3/Screenshot%202024-01-31%20at%208.29.09%20PM.png"/>

This decentralized application (Dapp) allows users to get and set messages on the Ethereum blockchain. It utilizes React for the frontend, Solidity for smart contract development, and Hardhat as the development environment.


## Getting Started

Follow the steps below to set up and run the Dapp on your local machine.

### Prerequisites

Make sure you have the following tools installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Hardhat](https://hardhat.org/)
- [MetaMask](https://metamask.io/)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository_url>
   cd <repository_directory>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Compile the smart contracts:

   ```bash
   npx hardhat compile
   ```

4. Start the local development blockchain:

   ```bash
   npx hardhat node
   ```

5. Deploy the smart contract to the local blockchain:

   ```bash
   npx hardhat run scripts/deploy.js --network localhost
   ```

6. Copy the contract address and update it in the `App.js` file.

### Usage

1. Start the React app:

   ```bash
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000/`. Connect your MetaMask wallet to the local blockchain.

3. Use the Dapp to set and get messages on the Ethereum blockchain.

### Smart Contracts

- **MyMessage.sol**: Solidity smart contract for getting and setting messages.

### Frontend

- **src/App.js**: React component for interacting with the smart contract.

## Contributing

Feel free to contribute to the development of this Dapp. Fork the repository, make your changes, and submit a pull request.
