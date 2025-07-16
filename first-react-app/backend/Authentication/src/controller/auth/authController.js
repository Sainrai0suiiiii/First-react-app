import bcrypt from "bcryptjs";
import { User } from "../../models/index.js";
import { generateToken } from "../../security/jwt-util.js";

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false,
        error: "All fields are required" 
      });
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        error: "User already exists" 
      });
    }
    
    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });
    
    // Generate token
    const token = generateToken({ user: user.toJSON() });
    
    res.status(201).json({
      success: true,
      data: { 
        user: { id: user.id, name: user.name, email: user.email },
        access_token: token 
      },
      message: "User registered successfully"
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false,
      error: "Failed to register user" 
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        error: "Email and password are required" 
      });
    }
    
    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ 
        success: false,
        error: "Invalid credentials" 
      });
    }
    
    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false,
        error: "Invalid credentials" 
      });
    }
    
    // Generate token
    const token = generateToken({ user: user.toJSON() });
    
    res.status(200).json({
      success: true,
      data: { 
        user: { id: user.id, name: user.name, email: user.email },
        access_token: token 
      },
      message: "Successfully logged in"
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false,
      error: "Failed to login" 
    });
  }
};

const init = async (req, res) => {
  try {
    const user = req.user.user;
    delete user.password;
    res.status(200).json({ 
      success: true,
      data: user, 
      message: "Successfully fetched current user" 
    });
  } catch (error) {
    console.error('Init error:', error);
    res.status(500).json({ 
      success: false,
      error: "Failed to fetch user" 
    });
  }
};

export const authController = {
  register,
  login,
  init,
};
