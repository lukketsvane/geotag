// pages/api/auth/signup.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email, password, username } = req.body;
    console.log('Attempting to sign up user', email);

    // Basic validation
    if (!email || !password || !username) {
      console.log('Missing fields', { email, username });
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      console.log('User already exists', email);
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash the password and create the user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    console.log('User created successfully', newUser);

    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ message: 'Signup failed. Please try again.' });
  }
}
