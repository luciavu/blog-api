import { Request, Response, RequestHandler } from 'express';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export const getPosts: RequestHandler = async (req: Request, res: Response): Promise<any> => {
  try {
    const posts = await prisma.post.findMany();
    res.status(200).json(posts);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPostById: RequestHandler = async (req: Request, res: Response): Promise<any> => {
  const postId = parseInt(req.params.id);
  if (isNaN(postId)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
