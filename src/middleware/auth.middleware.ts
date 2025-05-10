import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { JwtUserPayload } from '../types/express';
dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers['authorization'];
  if (typeof authHeader === 'undefined') {
    res.status(403).json({ message: 'Authorization header missing' });
    return;
  }
  const token = authHeader.split(' ')[1];

  if (!token) {
    res.status(403).json({ message: 'Token missing' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY) as JwtUserPayload;
    req.user = decoded; // Attach decoded payload to request
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export const isAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (!req.user || !req.user.isAdmin) {
    res.status(403).json({ message: 'You are unauthorised to view this resource' });
    return;
  }
  next();
};
