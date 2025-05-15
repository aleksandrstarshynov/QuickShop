import jwt from 'jsonwebtoken';

export function getDecodedUser(req, SECRET) {
  const authorizationHeader = req.headers['authorization'];

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    throw new Error('Missing or invalid authorization header');
  }

  const token = authorizationHeader.split(' ')[1];

  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    throw new Error('Token verification failed');
  }
}



