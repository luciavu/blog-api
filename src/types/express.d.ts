import { JwtPayload } from 'jsonwebtoken';

interface JwtUserPayload {
  id: number;
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
