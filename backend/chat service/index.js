const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const router = express.Router();
const cors = require('cors');
const path = require("path");

dotenv.config();
var db=mongoose.connect("mongodb://localhost:27017/mabase" ,
 { useNewUrlParser: true, useUnifiedTopology: true },
() => {
  console.log("Connected to MongoDB");
});
/*
mongoose.connect(
  process.env.MONGO_URL,
  
);*/


app.use(cors());

app.use("/images", express.static(path.join(__dirname, "public/images")));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});


const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.use("/api/posts", postRoute);/*
app.use(function(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).json({ error: 'You forgot the authorization header' });
  }
  next();
});*/
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);





app.listen(8800, () => {
  console.log("Backend server is running on 8800!");
});
