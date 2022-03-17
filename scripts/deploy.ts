import {ethers} from "hardhat";

async function main() {
  const Arthurium = await ethers.getContractFactory("Arthurium");
  const contract = await Arthurium.deploy();

  await contract.deployed();

  console.log("Deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
