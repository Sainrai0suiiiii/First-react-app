import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',// other example mysql,oracle,h2
    logging: false, // Disable SQL query logging
  }
);

export const db = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully");
    
    await sequelize.sync({ alter: true });
    console.log("Database synchronized successfully");
  } catch (error) {
    console.error("Failed to connect to database:", error.message);
    process.exit(1); // Exit if database connection fails
  }
};



