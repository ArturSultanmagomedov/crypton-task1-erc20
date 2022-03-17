import chai, {expect} from "chai";
import {ethers} from "hardhat";
import {Contract} from "ethers";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";
import {solidity} from "ethereum-waffle";

chai.use(solidity);

describe("additional funs", async () => {
  let contract: Contract;
  let owner: SignerWithAddress;
  let user: SignerWithAddress;

  beforeEach(async () => {
    [owner, user] = await ethers.getSigners();
    const ArthuriumContractFactory = await ethers.getContractFactory("Arthurium");
    contract = await ArthuriumContractFactory.deploy();

    await contract.deployed();
  });

  // it("TEST mint", async () => {
  //   expect(`${await contract.totalSupply()}`).to.equal("10000000");
  //
  //   await contract.mint(owner.address, 1);
  //   expect(`${await contract.totalSupply()}`).to.equal("10000001");
  //
  //   expect(contract.mint(user.address, 1)).to.be.revertedWith("not an owner");
  // });

  it("TEST burn", async () => {
    expect(`${await contract.totalSupply()}`).to.equal("10000000");

    await contract.burn(owner.address, 1_000_000);
    expect(`${await contract.totalSupply()}`).to.equal("9000000");

    expect(contract.burn(user.address, 1)).to.be.revertedWith("not an owner");
  });
});
