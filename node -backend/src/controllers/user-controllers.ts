import { NextFunction, Request, Response } from "express";
import crypto from "crypto";
import User from "../models/User.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";
import { storeUserHash, getUserHash } from "../utils/blockchainService.js";
import { getCookieOptions } from '../utils/cookieconfig.js';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find();
    return res.status(200).json({ message: "OK", users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: (error as Error).message });
  }
};
const hashSHA256 = (data: string): string => {
  return crypto.createHash("sha256").update(data).digest("hex");
};

export const userSignup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("Received Signup Request:");
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already registered" });
    }
    
    // Hash password using bcrypt for database storage
    const hashedPassword = await hash(password, 10);
    
    // Generate SHA-256 hash of user data for blockchain storage
    const userData = JSON.stringify({ name, email });
    const userDataHash = hashSHA256(userData);

    // Store user data hash on blockchain with email as key
    const txHash = await storeUserHash(email, userDataHash);
    if (!txHash) {
      console.log("Blockchain storage failed for:", email);
      return res.status(500).json({ error: "Blockchain storage failed" });
    }

    console.log(`User data hash stored on blockchain for ${email}, tx: ${txHash}`);

    // Save user in database with bcrypt hashed password
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = createToken(user.id, user.email, "7d");
    res.cookie(COOKIE_NAME, token, getCookieOptions());

    return res.status(201).json({ message: "Signup successful", token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: (error as any).message });
  }
};

export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    
    // Fetch user from database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "User not registered" });
    }
    
    // Verify password against bcrypt hash stored in the database
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({ error: "Incorrect Password" });
    }
    
    // Retrieve stored user data hash from blockchain using email as key
    const storedUserData = await getUserHash(email);
    if (!storedUserData) {
      console.log("Failed to retrieve data from blockchain for:", email);
      return res.status(500).json({ error: "Blockchain verification failed" });
    }
    
    console.log(`Retrieved user data hash from blockchain for ${email}: ${storedUserData}`);
    
    // Generate expected SHA-256 hash from stored user details
    const userData = JSON.stringify({ name: user.name, email: user.email });
    const expectedUserDataHash = hashSHA256(userData);

    // Compare blockchain-stored hash with locally generated hash
    if (storedUserData !== expectedUserDataHash) {
      console.log(`Blockchain data verification failed for ${email}`);
      console.log(`Stored: ${storedUserData}`);
      console.log(`Expected: ${expectedUserDataHash}`);
      return res.status(403).json({ error: "Identity verification failed" });
    }

    console.log("Successfully authenticated with blockchain verification");
    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });

    return res.status(200).json({
      message: "OK",
      name: user.name,
      email: user.email,
      token, // ✅ Include token in response
    });
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: (error as Error).message });
  }
};

export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");

    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }

    return res.status(200).json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: (error as Error).message });
  }
};


export const userLogout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }

    // Properly expire the cookie
    res.cookie(COOKIE_NAME, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",  // Secure in production
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      signed: true,
      path: "/",
      expires: new Date(0) // Forces immediate expiration
    });

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: (error as Error).message });
  }
};


