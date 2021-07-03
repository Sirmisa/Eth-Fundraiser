pragma solidity >0.4.23 <= 0.8.0;
import "openzeppelin-solidity/contracts/access/Ownable.sol";

//Update - we inherit from Ownable with 'is Ownable'
contract Fundraiser is Ownable{

    //The declared state variables wont need a method to access it. It is like a class variable
    string public name;
    string public url;
    string public imageURL;
    string public description;
    //This requires to be payable to be able to receive Eth
    address payable public beneficiary;
    //address public custodian; <-- Edit: this is commented because we are gonna use openzepellin to handle this account

    /**
     * memory - keyword that defines a variable to live during runtime
     * if not declared like that, then solidity will try to make room
     * for that variable to live in the contract.
     * Declare the variable like that when its value is used temporarly
     * https://medium.com/coinmonks/ethereum-solidity-memory-vs-storage-which-to-use-in-local-functions-72b593c3703a
     */
    constructor(
    string memory _name,
    string memory _url,
    string memory _imageURL,
    string memory _description,
    address payable _beneficiary,
    address _custodian
)
    public
{
    name = _name;
    url = _url;
    imageURL = _imageURL;
    description = _description;
    beneficiary = _beneficiary;
    transferOwnership(_custodian);//this will be invoked from the Ownable contract from OpenZepellin
}

}