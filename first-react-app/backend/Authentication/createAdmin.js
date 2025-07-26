import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { sequelize } from "./src/database/index.js";
import { User } from "./src/models/index.js";

dotenv.config();

const createAdminUser = async () => {
  try {
    // Connect to database
    await sequelize.authenticate();
    console.log("Database connected successfully");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ where: { email: 'admin@grocery.com' } });
    if (existingAdmin) {
      console.log("Admin user already exists!");
      return;
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash('admin123', saltRounds);

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@grocery.com',
      password: hashedPassword,
      role: 'admin'
    });

    console.log("Admin user created successfully!");
    console.log("Email: admin@grocery.com");
    console.log("Password: admin123");
    console.log("Role: admin");

  } catch (error) {
    console.error("Error creating admin user:", error);
  } finally {
    await sequelize.close();
  }
};

createAdminUser(); 