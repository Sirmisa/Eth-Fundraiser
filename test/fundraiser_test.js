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

  describe("initialization", () => {
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
});