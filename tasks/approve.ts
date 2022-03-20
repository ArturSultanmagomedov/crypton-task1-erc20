import {task} from "hardhat/config";
import {getAddress, parseEther} from "ethers/lib/utils";

import "@nomiclabs/hardhat-ethers";

interface Args {
  spender: string;
  amount: string;
}

task("approve", "Approve tokens for contract")
  .addParam("spender", "Contract address")
  .addParam("amount", "Donate amount (in ETH)")
  .setAction(async (args: Args, hre) => {
    const contract = await hre.ethers.getContractAt("Arthurium", process.env.INFURA_CONTRACT_ADDRESS!);
    await contract.approve({spender: getAddress(args.spender), amount: parseEther(args.amount)});

    console.log(`Successfully approve ${args.amount} ATM for ${args.spender}`);
  });

export {};