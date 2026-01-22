export function isAuthenticated(request: Request): boolean {
  const authHeader = request.headers.get('authorization');

  if (!authHeader) return false;

  const authValue = authHeader.split(' ')[1];
  if (!authValue) return false;

  const [user, pwd] = atob(authValue).split(':');

  const validUser = process.env.ADMIN_USER || 'admin';
  const validPass = process.env.ADMIN_PASSWORD || 'numerologie2024';

  return user === validUser && pwd === validPass;
}