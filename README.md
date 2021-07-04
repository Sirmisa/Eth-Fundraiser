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
memory vs storage | Memory is for not persisting data and Storage is where the variable states are held. Every complex type, i.e. arrays and structs, has an additional annotation, the “data location”, about whether it is stored in memory or in storage.
Storage | where all the contract state variables reside. Every contract has its own storage and it is persistent between function calls and quite expensive to use.
Memory | this is used to hold temporary values. It is erased between (external) function calls and is cheaper to use.
Stack | which is used to hold small local variables. It is almost free to use, but can only hold a limited amount of values.
address payable | Its an address type that can receive ether and will have the **transfer** and **send** methods available
Structs | Structs in Solidity allow us to define a new type. The type will have properties that can be made up of different types. The structs can be initialized just passing the parameters and they will be asigned in the same order of the assignments. If we dont want to remember what parameter corresponds to what value we can use keywords to map the parameters like struct_member_variable: value_to_pass.
Mappings | Mappings allow you to associate a key to a value. In Solidity, the key types are restricted to **integers, booleans, addresses, bytes, and strings**. The value types can be anything, including another mapping. Mappings in Solidity are sadly **not enumerable**, meaning that you cannot use a for loop to iterate through the key/value pairs as you would an array.
SafeMath | Library that can help us with some problems related to Integer Overflow issues. That would be problematic for the contract. https://consensys.github.io/smart-contract-best-practices/known_attacks/#integer-overflow-and-underflow
concept | definition
concept | definition
concept | definition
concept | definition
concept | definition
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
