const hre = require("hardhat");

async function getBalance(address) {
  const balance = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balance);
}

async function consoleBalances(addresses) {
  let counter = 0;
  for (const address of addresses) {
    console.log(`Address ${counter} balance:`, await getBalance(address));
    counter++;
  }
}

async function consoleMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const name = memo.name;
    const from = memo.address;
    const message = memo.message;
    console.log(
      `Memo from ${name} at ${timestamp}: ${message} address: ${from}`
    );
  }
}

async function main() {
  const [owner, from1, from2, from3] = await hre.ethers.getSigners();
  const chai = await hre.ethers.getContractFactory("chai");
  const chaiContract = await chai.deploy();
  await chaiContract.deployed();

  console.log("Address of contract:", chaiContract);

  const addresses = [owner.address, from1.address];
  console.log("Balances before transfer:");
  await consoleBalances(addresses);

  const amount = hre.ethers.utils.parseEther("1.0");
  await chaiContract.connect(from1).buyChai("from1", "very nice chai", amount);
  await chaiContract
    .connect(from2)
    .buyChai("from2", "very nice course", amount);
  await chaiContract
    .connect(from3)
    .buyChai("from3", "very nice information", amount);

  console.log("Balances after transfer:");
  await consoleBalances(addresses);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
