import bcrypt from "bcryptjs";
import { User } from "../../models/index.js";
import { generateToken } from "../../security/jwt-util.js";

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password strength validation
const validatePassword = (password) => {
  const minLength = 6;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  
  if (password.length < minLength) {
    return { isValid: false, error: `Password must be at least ${minLength} characters long` };
  }
  
  if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
    return { isValid: false, error: 'Password must contain uppercase, lowercase, and numbers' };
  }
  
  return { isValid: true };
};

const register = async (req, res) => {
  try {
    const { name, email, password, phone, address, role = 'user' } = req.body;
    
    // Enhanced validation
    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false,
        error: "Name, email, and password are required" 
      });
    }
    
    // Validate email format
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: "Please enter a valid email address"
      });
    }
    
    // Validate password strength
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return res.status(400).json({
        success: false,
        error: passwordValidation.error
      });
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        error: "User with this email already exists" 
      });
    }
    
    // Hash password
    const saltRounds = 12; // Increased from 10 for better security
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Create user
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      phone: phone?.trim() || null,
      address: address?.trim() || null,
      role
    });
    
    // Generate token
    const token = generateToken({ 
      id: user.id, 
      name: user.name, 
      email: user.email, 
      role: user.role 
    });
    
    res.status(201).json({
      success: true,
      data: { 
        user: { 
          id: user.id, 
          name: user.name, 
          email: user.email, 
          role: user.role,
          phone: user.phone,
          address: user.address
        },
        access_token: token 
      },
      message: "User registered successfully"
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false,
      error: "Failed to register user. Please try again." 
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Enhanced validation
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        error: "Email and password are required" 
      });
    }
    
    // Validate email format
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: "Please enter a valid email address"
      });
    }
    
    // Find user
    const user = await User.findOne({ 
      where: { email: email.toLowerCase().trim() } 
    });
    
    if (!user) {
      return res.status(401).json({ 
        success: false,
        error: "Invalid email or password" 
      });
    }
    
    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false,
        error: "Invalid email or password" 
      });
    }
    
    // Update last login time
    await user.update({ lastLoginAt: new Date() });
    
    // Generate token
    const token = generateToken({ 
      id: user.id, 
      name: user.name, 
      email: user.email, 
      role: user.role 
    });
    
    res.status(200).json({
      success: true,
      data: { 
        user: { 
          id: user.id, 
          name: user.name, 
          email: user.email, 
          role: user.role,
          phone: user.phone,
          address: user.address,
          lastLoginAt: user.lastLoginAt
        },
        access_token: token 
      },
      message: "Successfully logged in"
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false,
      error: "Failed to login. Please try again." 
    });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] }
    });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found"
      });
    }
    
    res.status(200).json({
      success: true,
      data: user,
      message: "User profile retrieved successfully"
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({
      success: false,
      error: "Failed to retrieve user profile"
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, phone, address } = req.body;
    
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found"
      });
    }
    
    // Update user fields
    const updateData = {};
    if (name) updateData.name = name.trim();
    if (phone) updateData.phone = phone.trim();
    if (address) updateData.address = address.trim();
    
    await user.update(updateData);
    
    res.status(200).json({
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address
      },
      message: "Profile updated successfully"
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      error: "Failed to update profile"
    });
  }
};

export const authController = {
  register,
  login,
  getCurrentUser,
  updateProfile,
};
