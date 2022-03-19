import chai, {expect} from "chai";
import {ethers} from "hardhat";
import {Contract} from "ethers";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";
import {solidity} from "ethereum-waffle";

chai.use(solidity);

describe("public funs", async () => {
  let contract: Contract;
  let owner: SignerWithAddress;
  let user: SignerWithAddress;
  let user2: SignerWithAddress;

  beforeEach(async () => {
    [owner, user, user2] = await ethers.getSigners();
    const ArthuriumContractFactory = await ethers.getContractFactory("Arthurium");
    contract = await ArthuriumContractFactory.deploy();

    await contract.deployed();
  });

  it("TEST transfer", async () => {
    const tx = await contract.connect(owner).transfer(user.address, 1);

    // expect(tx).to.be.emit(await contract, "Transfer");
    expect(`${await contract.balanceOf(owner.address)}`).to.equal("9999999");
    expect(`${await contract.balanceOf(user.address)}`).to.equal("1");
  });

  it("Test transferFrom", async function () {
    await contract.connect(owner).approve(user.address, 100);
    const tx = await contract.connect(user).transferFrom(owner.address, user2.address, 1);

    expect(tx).to.be.emit(await contract, "Transfer");
    expect(`${await contract.balanceOf(owner.address)}`).to.equal("9999999");
    expect(`${await contract.balanceOf(user2.address)}`).to.equal("1");
    expect(`${await contract.allowance(owner.address, user.address)}`).to.equal("99");
  });

  it("Test approve", async function () {
    const tx = await contract.connect(owner).approve(user.address, 10);

    await expect(tx).to.be.emit(contract, "Approval");
    expect(`${await contract.allowance(owner.address, user.address)}`).to.equal("10");
  });

  it("Test allowance", async function () {
    // овнер дает юзеру права на 10 монет
    await contract.connect(owner).approve(user.address, 10);
    // юзер переводит 1 монету овнера себе
    await contract.connect(user).transferFrom(owner.address, user.address, 1);

    // у юзера в распоряжении остается еще 9 монет овнера
    expect(`${await contract.allowance(owner.address, user.address)}`).to.equal("9");
  });
});

// TODO: доделать тесты с ревертами
