const FundraiserFactoryContract = artifacts.require("FundraiserFactory");

contract("FundraiserFactory: deployment", () => {
  it("has been deployed", async () => {
    const fundraiserFactory = FundraiserFactoryContract.deployed();
    assert(fundraiserFactory, "fundraiser factory was not deployed");
  });
});

// REMEMBER: creating multiple contracts functions will make Truffle 
// to deploy a new instance of our contract when we use the contract 
// function; this will prevent state from being maintained between test 
// groups and prevent ordering issues on test runs.
contract("FundraiserFactory: createFundraiser", (accounts) => {
    let fundraiserFactory;
    // fundraiser args
    const name =  "Beneficiary Name";
    const url = "beneficiaryname.org";
    const imageURL = "https://placekitten.com/600/350"
    const description = "Beneficiary Description"
    const beneficiary = accounts[1];
  
    it("increments the fundraisersCount", async () => {
      fundraiserFactory = await FundraiserFactoryContract.deployed();
      const currentFundraisersCount = await fundraiserFactory.fundraisersCount();
      await fundraiserFactory.createFundraiser(
        name,
        url,
        imageURL,
        description,
        beneficiary
      );
      const newFundraisersCount = await fundraiserFactory.fundraisersCount();
  
      assert.equal(
        newFundraisersCount - currentFundraisersCount,
        1,
        "should increment by 1"
      )
    });

    it("emits the FundraiserCreated event", async () => {
        fundraiserFactory = await FundraiserFactoryContract.deployed();
        const tx = await fundraiserFactory.createFundraiser(
          name,
          url,
          imageURL,
          description,
          beneficiary
        );
        const expectedEvent = "FundraiserCreated";
        const actualEvent = tx.logs[0].event;
      
        assert.equal(
          actualEvent,
          expectedEvent,
          "events should match"
        );
    });
});