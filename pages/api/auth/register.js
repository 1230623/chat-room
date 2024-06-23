import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { name, email, password, phonenumber } = req.body;

  if (!name || !email || !password || !phonenumber) {
    return res.status(400).json({ message: `All fields required` });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phonenumber,
      },
    });
    res.status(201).json(user);
  } catch (e) {
    res.status(500).json({ message: `User already exists` });
  }
}
