const blogCategory = require("../data/blogcategories.json");
const blogs = require("../data/blogs.json");
const categories = require("../data/categories.json");
const colors = require("../data/colors.json");
const enquires = require("../data/enquires.json");
const orders = require("../data/orders.json");
const products = require("../data/products.json");
const users = require("../data/users.json");

const BlogCategory = require("../models/blogCategoryModel");
const blogModel = require("../models/blogCardModel");
const categoryModel = require("../models/categoryModel");
const colorModel = require("../models/colorModel");
const couponModel = require("../models/couponModel");
const enquiryModel = require("../models/enquiryModel");
const orderModel = require("../models/orderModel");
const productModel = require("../models/productModel");
const userModel = require("../models/userModel");

const dotenv = require("dotenv");
const connectDatabase = require("../config/dbConnect");

dotenv.config({ path: "backend/config/config.env" });
connectDatabase();

const seedProducts = async () => {
  try {
    await BlogCategory.deleteMany();
    await blogModel.deleteMany();
    await categoryModel.deleteMany();
    await colorModel.deleteMany();
    await enquiryModel.deleteMany();
    await orderModel.deleteMany();
    await productModel.deleteMany();
    await userModel.deleteMany();
    console.log("Products deleted!");
    await BlogCategory.insertMany(blogCategory);
    await blogModel.insertMany(blogs);
    await categoryModel.insertMany(categories);
    await colorModel.insertMany(colors);
    await enquiryModel.insertMany(enquires);
    await orderModel.insertMany(orders);
    await productModel.insertMany(products);
    await userModel.insertMany(users);
    console.log("All products added!");
  } catch (error) {
    console.log(error.message);
  }
  process.exit();
};

seedProducts();
