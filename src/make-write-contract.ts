import {
  Contract,
  JsonRpcProvider,
  Wallet,
  formatEther,
  parseEther,
} from "ethers";
import PoolCurveAbi from "./abi/PoolCurve.json";

const PROVIDER_URL = "";

const provider = new JsonRpcProvider(PROVIDER_URL);


const contractAddress = "0x21e27a5e5513d6e65c4f830167390997aa84843a";

const walletAddress = "";
const privateKey =
  "";

const wallet = new Wallet(privateKey, provider);


// Connecting to smart contract
const contract = new Contract(contractAddress, PoolCurveAbi, provider);

const main = async () => {
  console.log("==Initial==");
  console.log({
    senderBalance: formatEther(await provider.getBalance(walletAddress)),
  });

  const contractWithWallet = contract.connect(wallet);

  const tx = await (contractWithWallet as Contract).add_liquidity(
    [parseEther("0.1"), parseEther("0.09691")],
    parseEther("0.09691"),
    walletAddress,
    {
      value: parseEther("0.1"),
      
    }
  );
  console.log("Transaction Hash:", tx.hash);

  await tx.wait();
  console.log(tx);
  console.log("Transaction is mined");

  console.log("==Final==");
  console.log({
    senderBalance: formatEther(await provider.getBalance(walletAddress)),
  });
};

main();
