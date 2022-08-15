import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";

describe("DrugMinter", () => {
  let drugMinterContract: Contract;
  let owner: SignerWithAddress;
  let recipientAddress: SignerWithAddress;

  beforeEach(async () => {
    const DrugMinter = await ethers.getContractFactory("DrugMinter");
    [owner, recipientAddress] = await ethers.getSigners();
    drugMinterContract = await DrugMinter.deploy();
  });

  describe("Init", () => {
    it("Should create token", async () => {
      expect(
        await drugMinterContract.mintProduct(
          owner.address,
          "https://locationofnftmetadata.com"
        )
      ).to.equal(1);
    });
  });
});
