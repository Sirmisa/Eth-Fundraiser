pragma solidity >0.4.23 <= 0.8.0;

import "./Fundraiser.sol";

// FundraiserFactory’s primary job is to create new instances of Fundraisers.
contract FundraiserFactory {
   Fundraiser[] private _fundraisers;

   event FundraiserCreated(Fundraiser indexed fundraiser, address indexed owner);

   // most items that can be returned from fundraisers function
    uint256 constant maxLimit = 20;

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

function fundraisers(uint256 limit, uint256 offset) public view 
    returns(Fundraiser[] memory coll) {
    // this method triggers an index out of bounds exception, the EVM will throw an opcode
    // to handle this before that error occurs we can add a validation to avoid that EVM error
    // but consider that even doing that it is possible that inside the function we still chack values that dont exist
    require(offset <= fundraisersCount(), "offset out of bounds");

    // size should be the smaller of the count or the limit
    uint256 size = fundraisersCount() - offset;
    size = size < limit ? size : limit;
    // size should not exceed the maxLimit
    size = size < maxLimit ? size : maxLimit;
    coll = new Fundraiser[](size);
    
    for(uint256 i = 0; i < size; i++) {
        // here we are assigning values from the actual fundraisers, instead of 0x000... accounts
        // In the case where the offset is larger than our fundraisersCount, 
        // our application will need to exit with an out-of-bounds message.
        coll[i] = _fundraisers[offset + i];
    }
    return coll;
}
}