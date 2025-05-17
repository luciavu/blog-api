import { Request, Response, RequestHandler } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// All comments
export const getAllComments: RequestHandler = async (req: Request, res: Response): Promise<any> => {
  const postId = parseInt(req.params.postId);
  try {
    const comments = await prisma.comment.findMany({
      orderBy: { id: 'asc' },
      include: {
        author: {
          select: {
            username: true,
            isAdmin: true,
          },
        },
      },
    });
    res.status(200).json(comments);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// All comments for a post
export const getComments: RequestHandler = async (req: Request, res: Response): Promise<any> => {
  const postId = parseInt(req.params.postId);

  if (isNaN(postId)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const comments = await prisma.comment.findMany({
      where: { postId },
      orderBy: { id: 'asc' },
      include: {
        author: {
          select: {
            username: true,
            isAdmin: true,
          },
        },
      },
    });
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
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json(comment);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const createComment: RequestHandler = async (req: Request, res: Response): Promise<any> => {
  const { text } = req.body;
  const postId = req.params.postId;

  console.log(text, postId, req.user!.userId);
  if (!text || !postId || !req.user) {
    return res.status(400).json({ message: 'Content, post id and author id is required' });
  }

  try {
    const newComment = await prisma.comment.create({
      data: {
        text,
        postId: parseInt(postId),
        authorId: req.user.userId,
      },
    });
    res.status(201).json(newComment);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteComment: RequestHandler = async (req: Request, res: Response): Promise<any> => {
  const commentId = parseInt(req.params.id);

  if (isNaN(commentId)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    await prisma.comment.delete({
      where: { id: commentId },
    });
    res.status(204).send();
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(500).json({ message: error.message });
  }
};
