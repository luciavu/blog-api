import { Request, Response, RequestHandler } from 'express';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export const getPosts: RequestHandler = async (req: Request, res: Response): Promise<any> => {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { id: 'asc' },
    });
    res.status(200).json(posts);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllPosts: RequestHandler = async (req: Request, res: Response): Promise<any> => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { id: 'asc' },
    });
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

export const createPost: RequestHandler = async (req: Request, res: Response): Promise<any> => {
  const { previewImage, title, content, published } = req.body;

  if (!title || !content || !previewImage || !req.user) {
    return res.status(400).json({ message: 'Title, content and image is required' });
  }

  try {
    const newPost = await prisma.post.create({
      data: {
        previewImage,
        title,
        content,
        published,
        author: {
          connect: { id: req.user.userId },
        },
      },
    });
    res.status(201).json(newPost);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePost: RequestHandler = async (req: Request, res: Response): Promise<any> => {
  const { previewImage, title, content, published } = req.body;
  const postId = parseInt(req.params.id);

  if (isNaN(postId)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: { title, content, previewImage, published },
    });
    res.status(200).json(updatedPost);
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(500).json({ message: error.message });
  }
};

export const deletePost: RequestHandler = async (req: Request, res: Response): Promise<any> => {
  const postId = parseInt(req.params.id);

  if (isNaN(postId)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    await prisma.post.delete({
      where: { id: postId },
    });
    res.status(204).send();
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(500).json({ message: error.message });
  }
};
