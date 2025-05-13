import { Request, Response, RequestHandler } from 'express';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export const getUsers: RequestHandler = async (req: Request, res: Response): Promise<any> => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        isAdmin: true,
      },
    });
    res.status(200).json(users);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUserById: RequestHandler = async (req: Request, res: Response): Promise<any> => {
  const userId = parseInt(req.params.id);
  if (isNaN(userId)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
        isAdmin: true,
      },
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
