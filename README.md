# This project is to learn Solidity for ETH development

## This is the list of software
Software | Purpose
------------ | -------------
Truffle | TBD
Node | TBD
Openzepellin | TBD
Ganache | TBD
Metamask | TBD
Goerli testnet | This testnet is compatible with Parity and Geth
Truffle HD wallet | This will work as a provider with Web3
Infura | is a service provider for managed Ethereum nodes.

## This is a glosary

Concept | Definition/Meaning/Explanation
------------ | -------------
ABI (Application Binary Interface) | Describes the functions and events of our contract. The ABI will be the basis for the client-side abstraction used to interact with our contract. They are created after the compilation process and is part of a .json file in the **build/contracts** folder
Bytecode | The bytecode field contains the result of compiling your contract. This is the code the Ethereum network will execute when our contract has been invoked from a client. They are created after the compilation process and is part of a .json file in the **build/contracts** folder
Testnets | Testnets are nets where we can try our Eth developments. There are many nets and clients to interact. Hyperledger has Besu
Web3 Provider | A provider is a component of Web3 that manages how to connect to the Ethereum network.
concept | definition

## Here is the place for some definitions

### What happens during a contract deployment?
- We submit a transaction to the ethereum network
- The deployment transaction will need to set the receiving address to the **0x0 address**
- The deployment transaction includes the **bytecode** from the compilation and it will be sent as the **transaction data**
- The contract has to be mined before we will be able to interact with it.
- When the contract is mined it will execute the code in its constructor and will set the initial state for the contract


## Here is the place for the command line instructions
### Initializing a new project with Truffle boxes
- Install Truffle React Box
```
$ truffle unbox react
```
### The basic environment for the contracts
- Install Truffle
```
$ npm install -g truffle
```
- Install Truffle HDWallet Provider
```
$ npm install @truffle/hdwallet-provider
```
- Install OpenZepellin
```
$ npm install openzeppelin-solidity
```
### The UI environment
- Compile and install the react/app
```
$ cd client
$ npm install
```
- Run the react app
```
$ npm run start
```
- Migrating the contracts to Ganache in local/dev environment
```
$ truffle migrate --network development
```
### Truffle HD wallet provider for Web3
- Install the **HDWalletProvider**
```
$ npm install truffle-hdwallet-provider --save-dev
```
- Set the **mnemonic** environment variable (we do this to not expose that information in the code)
```
$ export MNEMONIC="_YOUR MNEMONIC PHRASE GOES HERE_"
```
### Infura - configuration to migrate and run the contracts
- Set the project ID in the SO environment
```
$ export INFURA_PROJECT_ID=<PROJECT_ID>
```
- Migrate the the contract to the selected network
```
$ truffle migrate --network rinkeby
```
- Run the UI client
```
$ cd client
$ npm run start
```

## Here some additional configurations to 3rd party software

### Metamask and Truffle network configurations
- **Local development** - configuration to run with **Ganache**
    - **Network name**: Ganache
    - **RCP URL**: http://127.0.0.1:7545
    - **Chain ID**: 1337
- **Goerli testnet development**
    - Visit https://goerli-faucet.slock.it/
    - Copy the metamask account, paste it in the input box and click in the request button
    - Swith to the Goerli testnet in metamask
- **Rinkeby testnet development and Infura**
    - Create a new project
    - Select a network in this case Rinkeby
    - Visit https://faucet.rinkeby.io/ to get eth from the faucet
    - 

### Infura
