import chai, {expect} from "chai";
import {ethers} from "hardhat";
import {Contract} from "ethers";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";
import {solidity} from "ethereum-waffle";

chai.use(solidity);

describe("public view funs", async () => {
  let contract: Contract;
  let owner: SignerWithAddress;
  let user: SignerWithAddress;

  beforeEach(async () => {
    [owner, user] = await ethers.getSigners();
    const ArthuriumContractFactory = await ethers.getContractFactory("Arthurium");
    contract = await ArthuriumContractFactory.deploy();

    await contract.deployed();
  });

  it("TEST name", async () => {
    expect(`${await contract.name()}`).to.equal("Arthurium");
  });

  it("TEST symbol", async () => {
    expect(`${await contract.symbol()}`).to.equal("ATM");
  });

  it("TEST decimals", async () => {
    expect(`${await contract.decimals()}`).to.equal("18");
  });

  it("TEST totalSupply", async () => {
    expect(`${await contract.totalSupply()}`).to.equal("10000000");
  });

  it("TEST balanceOf", async () => {
    await contract.connect(owner).transfer(user.address, 100);

    expect(`${await contract.balanceOf(user.address)}`).to.equal("100");
  });
});
