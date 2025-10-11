#!/usr/bin/env node

import { sequelize } from "../backend/config/database.js";
import {
  User,
  Book,
  Meeting,
  ChatMessage,
  Bookmark,
} from "../backend/models/index.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "..", "backend", ".env") });

async function seedDatabase() {
  try {
    console.log("🔄 Connecting to database...");
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully.");

    console.log("�� Seeding database with sample data...");

    const adminPassword = await bcrypt.hash("admin123", 10);
    const userPassword = await bcrypt.hash("password123", 10);

    const [admin] = await User.findOrCreate({
      where: { email: "admin@cmc-library.com" },
      defaults: {
        username: "admin",
        email: "admin@cmc-library.com",
        password_hash: adminPassword,
        role: "admin",
      },
    });

    const [john] = await User.findOrCreate({
      where: { email: "john@example.com" },
      defaults: {
        username: "john_doe",
        email: "john@example.com",
        password_hash: userPassword,
        role: "user",
      },
    });

    const [jane] = await User.findOrCreate({
      where: { email: "jane@example.com" },
      defaults: {
        username: "jane_smith",
        email: "jane@example.com",
        password_hash: userPassword,
        role: "user",
      },
    });

    const [bob] = await User.findOrCreate({
      where: { email: "bob@example.com" },
      defaults: {
        username: "bob_wilson",
        email: "bob@example.com",
        password_hash: userPassword,
        role: "user",
      },
    });

    console.log("✅ Users seeded successfully.");

    // Create books using Sequelize models
    const [book1] = await Book.findOrCreate({
      where: { title: "Introduction to Computer Science" },
      defaults: {
        title: "Introduction to Computer Science",
        author: "Dr. Sarah Johnson",
        category: "Education",
        description: "A comprehensive guide to computer science fundamentals.",
        pdf_path: "/uploads/pdfs/intro-cs.pdf",
        file_size: 2048000,
        uploaded_by: admin.id,
        downloads_count: 45,
      },
    });

    const [book2] = await Book.findOrCreate({
      where: { title: "The Art of Programming" },
      defaults: {
        title: "The Art of Programming",
        author: "Robert Martin",
        category: "Technology",
        description:
          "Clean code principles and best practices for software development.",
        pdf_path: "/uploads/pdfs/art-programming.pdf",
        file_size: 1536000,
        uploaded_by: john.id,
        downloads_count: 32,
      },
    });

    const [book3] = await Book.findOrCreate({
      where: { title: "Data Structures and Algorithms" },
      defaults: {
        title: "Data Structures and Algorithms",
        author: "Thomas Cormen",
        category: "Science",
        description:
          "Essential algorithms and data structures for computer science students.",
        pdf_path: "/uploads/pdfs/dsa.pdf",
        file_size: 3072000,
        uploaded_by: admin.id,
        downloads_count: 28,
      },
    });

    const [book4] = await Book.findOrCreate({
      where: { title: "Machine Learning Basics" },
      defaults: {
        title: "Machine Learning Basics",
        author: "Andrew Ng",
        category: "Technology",
        description:
          "Introduction to machine learning concepts and applications.",
        pdf_path: "/uploads/pdfs/ml-basics.pdf",
        file_size: 2560000,
        uploaded_by: jane.id,
        downloads_count: 19,
      },
    });

    const [book5] = await Book.findOrCreate({
      where: { title: "Web Development Guide" },
      defaults: {
        title: "Web Development Guide",
        author: "Mozilla Developer Network",
        category: "Technology",
        description: "Complete guide to modern web development technologies.",
        pdf_path: "/uploads/pdfs/web-dev.pdf",
        file_size: 1792000,
        uploaded_by: john.id,
        downloads_count: 67,
      },
    });

    console.log("✅ Books seeded successfully.");

    // Create meetings using Sequelize models
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const in2Days = new Date();
    in2Days.setDate(in2Days.getDate() + 2);

    const in3Days = new Date();
    in3Days.setDate(in3Days.getDate() + 3);

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const [meeting1] = await Meeting.findOrCreate({
      where: { title: "Weekly Team Standup" },
      defaults: {
        title: "Weekly Team Standup",
        description: "Daily standup meeting to discuss progress and blockers.",
        scheduled_at: tomorrow,
        duration: 30,
        created_by: admin.id,
        room_url: "room_standup_001",
        status: "scheduled",
      },
    });

    const [meeting2] = await Meeting.findOrCreate({
      where: { title: "Project Planning Session" },
      defaults: {
        title: "Project Planning Session",
        description: "Planning session for the new library features.",
        scheduled_at: in2Days,
        duration: 90,
        created_by: john.id,
        room_url: "room_planning_001",
        status: "scheduled",
      },
    });

    const [meeting3] = await Meeting.findOrCreate({
      where: { title: "Code Review Meeting" },
      defaults: {
        title: "Code Review Meeting",
        description: "Review recent code changes and discuss improvements.",
        scheduled_at: in3Days,
        duration: 60,
        created_by: jane.id,
        room_url: "room_review_001",
        status: "scheduled",
      },
    });

    const [meeting4] = await Meeting.findOrCreate({
      where: { title: "Completed: Sprint Retrospective" },
      defaults: {
        title: "Completed: Sprint Retrospective",
        description: "Retrospective meeting for the completed sprint.",
        scheduled_at: yesterday,
        duration: 45,
        created_by: admin.id,
        room_url: "room_retro_001",
        status: "completed",
      },
    });

    console.log("✅ Meetings seeded successfully.");

    // Create chat messages using Sequelize models
    await ChatMessage.findOrCreate({
      where: {
        meeting_id: meeting1.id,
        user_id: admin.id,
        message: "Welcome everyone to today's standup!",
      },
      defaults: {
        meeting_id: meeting1.id,
        user_id: admin.id,
        message: "Welcome everyone to today's standup!",
        message_type: "text",
      },
    });

    await ChatMessage.findOrCreate({
      where: {
        meeting_id: meeting1.id,
        user_id: john.id,
        message: "Thanks! Ready to discuss my progress.",
      },
      defaults: {
        meeting_id: meeting1.id,
        user_id: john.id,
        message: "Thanks! Ready to discuss my progress.",
        message_type: "text",
      },
    });

    await ChatMessage.findOrCreate({
      where: {
        meeting_id: meeting1.id,
        user_id: jane.id,
        message: "I've completed the user authentication module.",
      },
      defaults: {
        meeting_id: meeting1.id,
        user_id: jane.id,
        message: "I've completed the user authentication module.",
        message_type: "text",
      },
    });

    await ChatMessage.findOrCreate({
      where: {
        meeting_id: meeting2.id,
        user_id: john.id,
        message: "Let's start with the agenda for today's planning session.",
      },
      defaults: {
        meeting_id: meeting2.id,
        user_id: john.id,
        message: "Let's start with the agenda for today's planning session.",
        message_type: "text",
      },
    });

    console.log("✅ Chat messages seeded successfully.");

    // Create bookmarks using Sequelize models
    await Bookmark.findOrCreate({
      where: {
        user_id: john.id,
        book_id: book1.id,
      },
      defaults: {
        user_id: john.id,
        book_id: book1.id,
        page_number: 15,
      },
    });

    await Bookmark.findOrCreate({
      where: {
        user_id: john.id,
        book_id: book2.id,
      },
      defaults: {
        user_id: john.id,
        book_id: book2.id,
        page_number: 42,
      },
    });

    await Bookmark.findOrCreate({
      where: {
        user_id: jane.id,
        book_id: book3.id,
      },
      defaults: {
        user_id: jane.id,
        book_id: book3.id,
        page_number: 8,
      },
    });

    await Bookmark.findOrCreate({
      where: {
        user_id: jane.id,
        book_id: book4.id,
      },
      defaults: {
        user_id: jane.id,
        book_id: book4.id,
        page_number: 23,
      },
    });

    console.log("✅ Bookmarks seeded successfully.");

    console.log("🎉 Database seeding completed successfully!");
    console.log("\n📊 Sample data created:");
    console.log("   👥 4 users (1 admin, 3 regular users)");
    console.log("   📚 5 books across different categories");
    console.log("   📅 4 meetings (3 scheduled, 1 completed)");
    console.log("   💬 4 chat messages");
    console.log("   🔖 4 bookmarks");
    console.log("\n🔑 Test credentials:");
    console.log("   Admin: admin@cmc-library.com / admin123");
    console.log("   User: john@example.com / password123");
    console.log("   User: jane@example.com / password123");
    console.log("   User: bob@example.com / password123");
  } catch (error) {
    console.error("❌ Error seeding database:", error.message);
    console.error(error);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
}

seedDatabase();
