import { Request, Response, RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '../generated/prisma';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

export const register: RequestHandler = async (req: Request, res: Response): Promise<any> => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, password } = req.body;

    // Check username not taken
    const existing = await prisma.user.findUnique({ where: { username } });
    if (existing) {
      return res.status(409).json({ message: 'User exists' });
    }

    // Create user
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, passwordHash },
    });
    res.status(201).json({ message: 'User created', userId: user.id });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const login: RequestHandler = async (req: Request, res: Response): Promise<any> => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({ where: { username } });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.passwordHash);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate JWT
      const token = jwt.sign(
        { userId: user.id, username: user.username, isAdmin: user.isAdmin },
        JWT_SECRET_KEY,
        { expiresIn: '1h' }
      );
      return res.json({ token });
    }
    return res.status(401).json({ message: 'Invalid credentials' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
