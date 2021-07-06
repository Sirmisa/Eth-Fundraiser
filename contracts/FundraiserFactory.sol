pragma solidity >0.4.23 <= 0.8.0;

import "./Fundraiser.sol";

// FundraiserFactory’s primary job is to create new instances of Fundraisers.
contract FundraiserFactory {
   Fundraiser[] private _fundraisers;

   event FundraiserCreated(Fundraiser indexed fundraiser, address indexed owner);

   function fundraisersCount() public view returns(uint256) {
       return _fundraisers.length;
   }

// Here we are going to create the instance of the Fundraiser contract 
function createFundraiser(
    string memory name,
    string memory url,
    string memory imageURL,
    string memory description,
    address payable beneficiary
)
    public
{
    Fundraiser fundraiser = new Fundraiser(
        name,
        url,
        imageURL,
        description,
        beneficiary,
        msg.sender
    );// when we initialize the contracts we receive back the address of the new instance msg.sender
    _fundraisers.push(fundraiser);
    emit FundraiserCreated(fundraiser, msg.sender);
}
}