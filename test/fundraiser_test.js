//Here we require the Fundraiser contract to create the tests
const FundraiserContract = artifacts.require("Fundraiser");

/**
 * Here we use the contract function to set a new clean room to test the contract
 * invoking the contract method guarantees that your contract will be isolated
 * it will let you test without intervention from other actions in the accounts
 * 
 * -- accounts - we are receiving this parameter that will contain the accounts
 */
contract("Fundraiser", accounts => {
  let fundraiser;
  const name = "Beneficiary Name";
  const url = "beneficiaryname.org";
  const imageURL = "https://placekitten.com/600/350";
  const description = "Beneficiary description";
  const beneficiary = accounts[1];
  //const custodian = accounts[0];//edited to be the owner instead of the custodian
  const owner = accounts[0];//variable that will be instead of the custodian

  //BeforeEach is used to run the repetitive tasks for each test
  beforeEach (async () => {
    fundraiser = await FundraiserContract.new(
      name,
      url,
      imageURL,
      description,
      beneficiary,
      owner
    );
  });

  describe("initialization", () => {
     /**
     * Here our test is asserting that the name of our fundraiser should match the name we passed in to the constructor.
     */
     it("gets the beneficiary name", async () => {
      const actual = await fundraiser.name();
      assert.equal(actual, name, "names should match");
    });

    it("gets the beneficiary url", async () => {
      const actual = await fundraiser.url();
      assert.equal(actual, url, "url should match");
    });

    it("gets the beneficiary image url", async () => {
      const actual = await fundraiser.imageURL();
      assert.equal(actual, imageURL, "imageURL should match");
    });

    it("gets the beneficiary description", async () => {
      const actual = await fundraiser.description();
      assert.equal(actual, description, "description should match");
    });

    it("gets the beneficiary", async () => {
      const actual = await fundraiser.beneficiary();
      assert.equal(actual, beneficiary, "beneficiary addresses should match");
    });

    it("gets the owner", async () => {
      const actual = await fundraiser.owner();//this method will be available from the Ownable contract OpenZepellin
      assert.equal(actual, owner, "owner addresses should match");
    });
  });

  describe("setBeneficiary", () => {
    const newBeneficiary = accounts[2];

    it("updated beneficiary when called by owner account", async () => {
      await fundraiser.setBeneficiary(newBeneficiary, {from: owner});
      const actualBeneficiary = await fundraiser.beneficiary;
      assert(actualBeneficiary, newBeneficiary, "beneficiaries should match");
    });

    it("throws an error when called from a different account", async () =>{
      try {
        // This method receives 2 parameters - Truffle allows you to override the default transaction params 
        // by specifying the overrides in the last argument, after you've passed all arguments defined in the Solidity function.
        // https://www.trufflesuite.com/docs/truffle/getting-started/interacting-with-your-contracts#making-a-transaction
        // https://stackoverflow.com/questions/68241377/understanding-truffle-test
        await fundraiser.setBeneficiary(newBeneficiary, {from: accounts[3]});
        assert.fail("withdraw was not restricted to owners")
      } catch(err) {
        const expectedError = "Ownable: caller is not the owner"
        const actualError = err.reason;
        assert.equal(actualError, expectedError, "should not be permitted")
      }
    })

  });

  describe("making donations", () => {
    //we are using here web3 to help us to convert the value and we will avoid to type a lot of 0's
    const value = web3.utils.toWei('0.0289');
    //we will be using a different account, different from the default one which tends to be the 0x
    const donor = accounts[2];

    it("increases myDonationsCount", async () => {
      const currentDonationsCount = await fundraiser.myDonationsCount(
        {from: donor}
      );
    
      await fundraiser.donate({from: donor, value});
    
      const newDonationsCount = await fundraiser.myDonationsCount(
        {from: donor}
      );
    
      assert.equal(
        1,
        newDonationsCount - currentDonationsCount,
        "myDonationsCount should increment by 1");
    })

    it("includes donation in myDonations", async () => {
      // here we make a donation from the donor
      await fundraiser.donate({from: donor, value});
      const {values, dates} = await fundraiser.myDonations(
        {from: donor}
      );
    
      assert.equal(
        value,
        values[0],
        "values should match"
      );
      assert(dates[0], "date should be present");
    });

    it("increases the totalDonations amount", async () => {
      //totalDonations is a state variable but it is accessed like a method here in thet tests
      const currentTotalDonations = await fundraiser.totalDonations();
      await fundraiser.donate({from: donor, value});
      const newTotalDonations = await fundraiser.totalDonations();
    
      const diff = newTotalDonations - currentTotalDonations;
    
      assert.equal(
        diff,
        value,
        "difference should match the donation value"
      )
    });

    it("increases donationsCount", async () => {
      const currentDonationsCount = await fundraiser.donationsCount();
      await fundraiser.donate({from: donor, value});
      const newDonationsCount = await fundraiser.donationsCount();
    
      assert.equal(
        1,
        newDonationsCount - currentDonationsCount,
        "donationsCount should increment by 1");
    });
  });
});