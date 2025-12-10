import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Category from "./models/categoryModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const categories = [
  { name: "Electronics" },
  { name: "Clothing" },
  { name: "Books" },
  { name: "Home & Kitchen" },
  { name: "Sports" },
  { name: "Accessories" },
];

const products = [
  {
    name: "Wireless Headphones",
    image: "/uploads/headphones.jpg",
    description: "High-quality wireless headphones with noise cancellation",
    price: 2999,
    quantity: 50,
    brand: "TechBrand",
    countInStock: 50,
  },
  {
    name: "Smart Watch",
    image: "/uploads/smartwatch.jpg",
    description: "Fitness tracker with heart rate monitor",
    price: 5999,
    quantity: 30,
    brand: "FitTech",
    countInStock: 30,
  },
  {
    name: "Laptop Backpack",
    image: "/uploads/backpack.png",
    description: "Durable backpack with laptop compartment",
    price: 1499,
    quantity: 100,
    brand: "BagPro",
    countInStock: 100,
  },
  {
    name: "Coffee Maker",
    image: "/uploads/coffeemaker.jpg",
    description: "Automatic coffee maker with timer",
    price: 2499,
    quantity: 25,
    brand: "BrewMaster",
    countInStock: 25,
  },
  {
    name: "Yoga Mat",
    image: "/uploads/yogamat.png",
    description: "Non-slip yoga mat with carrying strap",
    price: 899,
    quantity: 75,
    brand: "FitLife",
    countInStock: 75,
  },
  {
    name: "Mouse",
    image: "/uploads/mouse.jpg",
    description: "Ergonomic wireless mouse with adjustable DPI",
    price: 799,
    quantity: 75,
    brand: "FitLife",
    countInStock: 75,
  },
];

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();

    console.log("Cleared existing data...");

    r;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("admin123", salt);

    const adminUser = await User.create({
      username: "admin",
      email: "admin@example.com",
      password: hashedPassword,
      isAdmin: true,
    });

    console.log("Admin user created!");
    console.log("Email: admin@example.com");
    console.log("Password: admin123");

    const createdCategories = await Category.insertMany(categories);
    console.log(`${createdCategories.length} categories created!`);

    const productsWithCategory = products.map((product, index) => ({
      ...product,
      category: createdCategories[index % createdCategories.length]._id,
    }));

    const createdProducts = await Product.insertMany(productsWithCategory);
    console.log(`${createdProducts.length} products created!`);

    console.log("\n✅ Data imported successfully!");
    console.log("\nYou can now login with:");
    console.log("Email: admin@example.com");
    console.log("Password: admin123");

    process.exit();
  } catch (error) {
    console.error("Error importing data:", error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();

    console.log("Data destroyed!");
    process.exit();
  } catch (error) {
    console.error("Error destroying data:", error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
