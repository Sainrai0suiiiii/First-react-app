const jwtUtil = require('../security/jwt-util');

describe('JWT Utility', () => {
  const payload = { userId: 123, role: 'admin' };
  let token;

  test('should generate a valid JWT token', () => {
    token = jwtUtil.generateToken(payload);
    expect(typeof token).toBe('string');
    expect(token.split('.').length).toBe(3); // JWT has 3 parts
  });

  test('should verify a valid JWT token', () => {
    const decoded = jwtUtil.verifyToken(token);
    expect(decoded.userId).toBe(payload.userId);
    expect(decoded.role).toBe(payload.role);
  });

  test('should throw error for invalid token', () => {
    expect(() => jwtUtil.verifyToken('invalid.token.here')).toThrow();
  });
});