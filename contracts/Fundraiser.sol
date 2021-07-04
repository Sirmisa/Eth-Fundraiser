pragma solidity >0.4.23 <= 0.8.0;
import "openzeppelin-solidity/contracts/access/Ownable.sol";
//This will help with issues related to Math exceptions
import "openzeppelin-solidity/contracts/utils/math/SafeMath.sol";

//Update - we inherit from Ownable with 'is Ownable'
contract Fundraiser is Ownable{
    //With this line we are declaring that we will be using a library
    using SafeMath for uint256;

    /**
     * The Donation struct will hold the donations
     * from the users to the accounts
     */
    struct Donation {
        uint256 value;
        uint256 date;
    }

    //This mapping will hold an array of donations where address is the key, Donation[] is the array of donations made by the account
    mapping(address => Donation[]) private _donations;
    // This is an event that will be triggered each time it is called
    // is marked as indexed. This means that the EVM will make it easier for subscribers
    // to filter the events that may be relevant to them. Up to three parameters can be indexed when defining an event.
    event DonationReceived(address indexed donor, uint256 value);
    event Withdraw(uint256 amount);
    //The declared state variables wont need a method to access it. It is like a class variable
    string public name;
    string public url;
    string public imageURL;
    string public description;
    //This requires to be payable to be able to receive Eth
    address payable public beneficiary;
    //address public custodian; <-- Edit: this is commented because we are gonna use openzepellin to handle this account
    uint256 public totalDonations;
    uint256 public donationsCount;

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

    function setBeneficiary(address payable _beneficiary) public onlyOwner {
        beneficiary = _beneficiary;
    }

    /** 
     * This method is to count the amount of donations that a
     * specific address made. It not the total amount of eth, it is the times it happened
     * returns - an unsigned integer
     * it is a view, it means that it will not register anything in the blockchain, it is just reading
     */
    function myDonationsCount() public view returns(uint256) {
        return _donations[msg.sender].length;
    }

    /**
     * This function will **accept** ether and therefore we need to add the payable modifier
     * to the function declaration
     */
    function donate() public payable {    
        //This line will a struct in **memory**
        Donation memory donation = Donation({
            value: msg.value,
            date: block.timestamp
        });
        //In this line we are pushing he donation to the array associated with our donor
        //the **push**  method is only available on arrays that are delcared as storage variables
        _donations[msg.sender].push(donation);
        totalDonations = totalDonations.add(msg.value);
        donationsCount++;

        //Here we are emiting our event that will be recorded as logs        
        emit DonationReceived(msg.sender, msg.value);
    }

    /**
     * This function will return the donations based on the account consulting the contract
     * The return values are 2 arrays that have a name, that means you will have to reference them
     * by name. Returning 2 objects from the same function is called Tuples
     */
     function myDonations() public view returns(uint256[] memory values, uint256[] memory dates){

        uint256 count = myDonationsCount();
        //Here we createe the array with a dynamic size based on the donations
        values = new uint256[](count);
        dates = new uint256[](count);

        for (uint256 i = 0; i < count; i++) {
            //Here, we are now referencing a struct that has already been saved to state variables of the contract
            // and not creating a new one in memory.
            Donation storage donation = _donations[msg.sender][i];
            values[i] = donation.value;
            dates[i] = donation.date;
        }

        return (values, dates);
     }

    //Here we are taking the keyword "this" as the contract instance that we are casting to an address type
    // and then getting the balance
    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        beneficiary.transfer(balance);
        emit Withdraw(balance);
    }

}