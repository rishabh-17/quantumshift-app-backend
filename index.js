// Important modules import
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

// middleware import
const AuthMiddleware = require("./middleware/auth.js");

// mongo db connection import
const connectDB = require("./models/connect.js");

// routes import
const BlogRoutes = require("./routes/blog.routes.js");
const SectionRoutes = require("./routes/section.routes.js");
const UserRoutes = require("./routes/user.routes.js");

const app = express();

// middlewares
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// Routes connection
app.use("/api/v1/auth", UserRoutes);
app.use("/api/v1/blog", BlogRoutes);
app.use("/api/v1/section", SectionRoutes);

app.use("/", (req, res) => {
  console.log(req.url === "/");
  res.sendFile(
    path.join(
      __dirname,
      `client/build/${req.url !== "/" ? req.url : "index.html"}`
    )
  );
});
// Global error handling
app.use("*", async (req, res) => {
  res.status(404).json({
    message: "Page not found",
  });
});

// server and mongodb connection
const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    app.listen(8000, () => console.log("Server started on port 8000"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
