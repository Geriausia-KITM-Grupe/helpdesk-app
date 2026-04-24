const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const FAQ = require("./models/FAQ");

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/helpdesk",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    );
    console.log("MongoDB connected for seeding");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

const seedData = async () => {
  await connectDB();

  try {
    // Create admin user
    const adminExists = await User.findOne({ username: "admin" });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await User.create({
        username: "admin",
        password: hashedPassword,
        role: "admin",
      });
      console.log("Admin user created");
    } else {
      console.log("Admin user already exists");
    }

    // Create test client user
    const clientExists = await User.findOne({ username: "client" });
    if (!clientExists) {
      const hashedPassword = await bcrypt.hash("client123", 10);
      await User.create({
        username: "client",
        password: hashedPassword,
        role: "client",
      });
      console.log("Client user created");
    } else {
      console.log("Client user already exists");
    }

    // Create some FAQ data
    const faqCount = await FAQ.countDocuments();
    if (faqCount === 0) {
      await FAQ.create([
        {
          question: "Kaip atstatyti slaptažodį?",
          answer: "Eikite į nustatymus ir spauskite 'Atstatyti slaptažodį'",
          category: "Paskyra",
        },
        {
          question: "Kaip susisiekti su pagalba?",
          answer:
            "Galite pateikti užklausą per mūsų sistemą arba skambinti telefonu",
          category: "Pagalba",
        },
        {
          question: "Kokie yra darbo laikai?",
          answer: "Dirbame nuo pirmadienio iki penktadienio, 9:00-17:00",
          category: "Informacija",
        },
      ]);
      console.log("FAQ data created");
    } else {
      console.log("FAQ data already exists");
    }

    console.log("Seeding completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedData();
