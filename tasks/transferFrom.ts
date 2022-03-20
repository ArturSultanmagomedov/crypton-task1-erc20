import {task} from "hardhat/config";
import {getAddress, parseEther} from "ethers/lib/utils";

import "@nomiclabs/hardhat-ethers";

interface Args {
  from: string;
  to: string;
  amount: string;
}

task("transferFrom", "Transfer tokens for contract")
  .addParam("spender", "Contract address")
  .addParam("amount", "Donate amount (in ETH)")
  .setAction(async (args: Args, hre) => {
    const contract = await hre.ethers.getContractAt("Arthurium", process.env.INFURA_CONTRACT_ADDRESS!);
    await contract.transferFrom({
      _from: getAddress(args.from),
      _to: getAddress(args.to),
      _value: parseEther(args.amount)
    });

    console.log(`Successfully transfer ${args.amount} ATM from ${args.from} to ${args.to}`);
  });

export {};