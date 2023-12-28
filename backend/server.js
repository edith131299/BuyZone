const express = require("express");

const connectDatabase = require("./config/dbConnect");

const app = express();

const cors = require("cors");

const dotenv = require("dotenv");

const path = require("path");

const cookieParser = require("cookie-parser");

const morgan = require("morgan");

//Route module import
const authRouter = require("./routes/authRoute");

const productRouter = require("./routes/productRoute");

const blogRouter = require("./routes/blogRoute");

const categoryRouter = require("./routes/categoryRoute");

const blogCategoryRouter = require("./routes/blogCategoryRoute");

const brandRouter = require("./routes/brandRoute");

const couponRouter = require("./routes/couponRoute");

const colorRouter = require("./routes/colorRoute");

const enquiryRouter = require("./routes/enquiryRoute");

//Middlewares
const { errorHandler, notFound } = require("./middleware/errorHandler");

dotenv.config({ path: path.join(__dirname, "config", "config.env") });

connectDatabase();

app.use(
  cors({
    origin: "*",
    credentials: true,
    allowcredentials: true,
  })
);

app.use(morgan("dev"));

app.use(express.json());

app.use(cookieParser());

app.use("/upload", express.static(path.join(__dirname, "upload")));

//Routes

app.use("/api", authRouter);

app.use("/api/product", productRouter);

app.use("/api/blog", blogRouter);

app.use("/api/category", categoryRouter);

app.use("/api/blogCategory", blogCategoryRouter);

app.use("/api/brand", brandRouter);

app.use("/api/coupon", couponRouter);

app.use("/api/color", colorRouter);

app.use("/api/enquiry", enquiryRouter);

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) =>{
      res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
  })
}

//Error Handlers
app.use(errorHandler);

app.use(notFound);

app.listen(process.env.PORT, () => {
  console.log(`Server running at port: ${process.env.PORT}`);
});
