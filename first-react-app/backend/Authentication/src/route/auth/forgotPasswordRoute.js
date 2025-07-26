import express from 'express';
const router = express.Router();

// POST /api/v1/auth/forgot-password
router.post('/', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  // TODO: Add logic to check if user exists and send reset email
  // For now, just simulate success
  res.json({ message: 'Password reset instructions sent to your email.' });
});

export default router;