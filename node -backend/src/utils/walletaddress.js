// walletAddress.js
import { ethers } from "ethers";
import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

// Use your environment variables
const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_API_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

console.log("Your Wallet Address:", wallet.address);
