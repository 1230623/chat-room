import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    console.log("Finding user with email:", email);
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.log("User not found");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log("User found:", user);

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      console.log("Invalid password");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log("Password valid, generating token");

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("Token generated:", token);

    res.status(200).json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
