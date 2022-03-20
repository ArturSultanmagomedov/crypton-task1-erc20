import {task} from "hardhat/config";
import {getAddress, parseEther} from "ethers/lib/utils";

import "@nomiclabs/hardhat-ethers";

interface Args {
  to: string;
  amount: string;
}

task("transfer", "Transfer tokens for contract")
  .addParam("spender", "Contract address")
  .addParam("amount", "Donate amount (in ETH)")
  .setAction(async (args: Args, hre) => {
    const contract = await hre.ethers.getContractAt("Arthurium", process.env.INFURA_CONTRACT_ADDRESS!);
    await contract.transfer({_to: getAddress(args.to), _value: parseEther(args.amount)});

    console.log(`Successfully transfer ${args.amount} ATM to ${args.to} from contract`);
  });

export {};