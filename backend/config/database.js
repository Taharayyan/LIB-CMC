import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// For SQLite, use storage option for file path
const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT || "sqlite",
  storage:
    process.env.DATABASE_URL || path.join(__dirname, "..", "database.sqlite"),
  logging: process.env.NODE_ENV === "development" ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export { sequelize };
