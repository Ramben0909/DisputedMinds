import { storeUserHash, getUserHash } from "./blockchainService.js";

async function testClient() {
    const userEmail = "test@example.com"; // Email address as the key
    const userHash = "sample-hash-data";
    
    try {
        // Store the hash using email as the key
        const txHash = await storeUserHash(userEmail, userHash);
        console.log(`Transaction hash: ${txHash}`);
        
        // Retrieve the hash using the same email
        const retrievedHash = await getUserHash(userEmail);
        console.log(`Retrieved hash for email ${userEmail}: ${retrievedHash}`);
        
        // Verify the retrieved hash matches what we stored
        if (retrievedHash === userHash) {
            console.log("✅ Test passed: Stored and retrieved hash match");
        } else {
            console.log("❌ Test failed: Hash mismatch");
        }
    } catch (error) {
        console.error("Test failed:", error);
    }
}

testClient();