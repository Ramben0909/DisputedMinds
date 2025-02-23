import { ethers } from "ethers";
import dotenv from "dotenv";
import contractData from "../../artifacts/contracts/UserHashStorage.sol/UserHashStorage.json" assert { type: "json" };

dotenv.config();

const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_API_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new ethers.Contract(contractAddress, contractData.abi, wallet);

/**
 * Store a user's hash on the blockchain using their email as the key.
 * @param {string} email - User's email address as the key
 * @param {string} userHash - Data hash to store
 * @returns {Promise<string>} - Transaction hash
 */
export async function storeUserHash(email, userHash) {
    try {
        const tx = await contract.storeHash(email, userHash);
        await tx.wait();
        console.log(`Hash stored for email ${email}: ${userHash}`);
        return tx.hash;
    } catch (error) {
        console.error("Error storing user hash:", error);
        throw error;
    }
}

/**
 * Retrieve a user's hash from the blockchain using their email.
 * @param {string} email - User's email address
 * @returns {Promise<string>} - Stored hash
 */
export async function getUserHash(email) {
    try {
        const hash = await contract.getHash(email);
        console.log(`Retrieved hash for email ${email}: ${hash}`);
        return hash;
    } catch (error) {
        console.error("Error retrieving user hash:", error);
        throw error;
    }
}
