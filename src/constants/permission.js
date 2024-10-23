export const permissions = {
  admin: [
    'user.create',
    'user.read',
    'user.update',
    'user.delete',
    'role.create',
    'role.read',
    'role.update',
    'role.delete',
    'movie.create',
    'movie.read',
    'movie.update',
    'movie.delete',
    'rental.create',
    'rental.read',
    'rental.update',
    'rental.delete'
  ],
  user: ['user.read', 'user.update', 'role.read', 'movie.read', 'rental.read']
};
