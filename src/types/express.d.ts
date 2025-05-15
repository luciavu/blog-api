import { JwtPayload } from 'jsonwebtoken';

interface JwtUserPayload {
  userId: number;
  username: string;
  isAdmin: boolean;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtUserPayload;
    }
  }
}
