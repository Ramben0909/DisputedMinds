require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: "./.env" });  // ✅ Adjust path if needed

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: process.env.ALCHEMY_API_URL || "",  // ✅ Ensure it doesn't return undefined
      accounts: process.env.PRIVATE_KEY ? [`0x${process.env.PRIVATE_KEY}`] : [],  // ✅ Prevent empty key
    },
  },
};

