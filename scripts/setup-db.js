#!/usr/bin/env node

import { sequelize } from "../backend/config/database.js";
import {
  User,
  Book,
  Meeting,
  ChatMessage,
  Bookmark,
} from "../backend/models/index.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from backend directory
dotenv.config({ path: path.join(__dirname, "..", "backend", ".env") });

async function setupDatabase() {
  try {
    console.log("🔄 Connecting to database...");
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully.");

    console.log("🔄 Creating database tables from Sequelize models...");

    // Sync all models - this creates the tables based on the model definitions
    await sequelize.sync({ force: false, alter: false });

    console.log("✅ Database tables created successfully.");

    console.log("🎉 Database setup completed successfully!");
    console.log(
      `📍 Database location: ${
        process.env.DATABASE_URL ||
        path.join(__dirname, "..", "backend", "database.sqlite")
      }`
    );
  } catch (error) {
    console.error("❌ Error setting up database:", error.message);
    console.error(error);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
}

setupDatabase();
