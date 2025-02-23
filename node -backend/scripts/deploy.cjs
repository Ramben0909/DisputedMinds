const { ethers } = require("hardhat");

async function main() {
    const UserHashStorage = await ethers.getContractFactory("UserHashStorage");

    const userHashStorage = await UserHashStorage.deploy();  // ✅ Deployment happens here

    console.log(`Contract deployed at: ${userHashStorage.target}`); // ✅ Correct way to get address
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
