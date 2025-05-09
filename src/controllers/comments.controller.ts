import { Request, Response, RequestHandler } from 'express';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export const getComments: RequestHandler = async (req: Request, res: Response): Promise<any> => {
  try {
    const comments = await prisma.comment.findMany();
    res.status(200).json(comments);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCommentById: RequestHandler = async (req: Request, res: Response): Promise<any> => {
  const commentId = parseInt(req.params.id);
  if (isNaN(commentId)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const comment = await prisma.comment.findUnique({ where: { id: commentId } });
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json(comment);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
