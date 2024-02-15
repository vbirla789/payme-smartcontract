const hre = require("hardhat");

async function main() {
  const chai = await hre.ethers.getContractFactory("ChaiContract");
  const chaiContract = await chai.deploy();
  await chaiContract.deployed();

  console.log("Address of contract:", chaiContract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
