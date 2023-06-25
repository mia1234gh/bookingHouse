const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/User.js");
const Place = require("./models/Place.js");
const Booking = require("./models/Booking.js");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");

dotenv.config();
const app = express();

const jwtSecret = "ajklfsdhf53sf5e75rf7e35rfwsfw";
// 长传单张图片至uploads
const uploadSingle = multer({ dest: "uploads" });

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(`${__dirname}/uploads`));
const configOptions = {
  credentials: true,
  origin: "http://localhost:3000",
};
app.use(cors(configOptions));
// mongoose
//pwd:CMU9D3BfzwX6umm2
// mongodb+srv://bantians:<password>@cluster0.andplso.mongodb.net/
mongoose.connect(process.env.MONGO_URL);

function getUserDataFromRequest(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
}

app.get("/test", (req, res) => {
  res.json("ok");
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashPwd = await bcrypt.hash(password, salt);
    const userInfo = await User.create({ name, email, password: hashPwd });

    res.json(userInfo);
  } catch (error) {
    res.status(422).json({ error: err.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userInfo = await User.findOne({ email });
  if (userInfo) {
    const checkPassword = await bcrypt.compare(password, userInfo.password);
    if (checkPassword) {
      // set-cookie & token
      jwt.sign(
        { email: userInfo.email, id: userInfo._id, name: userInfo.name },
        jwtSecret,
        {},
        function (err, token) {
          if (err) throw err;
          res.cookie("token", token).json(userInfo);
        }
      );
    } else {
      res.status(422).json("pwd not ok");
    }
  } else {
    res.json("not found");
  }
});

app.get("/profile", async (req, res) => {
  const { token } = req.cookies;

  if (token) {
    // 验证token
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) throw err;
      // 通过id获取用户完整信息，去除多余信息
      const { name, email, _id } = await User.findById(user.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

// 通过链接上传图片
app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  const options = {
    url: link,
    dest: `${__dirname}/uploads/${newName}`, // will be saved to /path/to/dest/image.jpg
  };
  await imageDownloader.image(options);
  res.json(newName);
});

app.post("/upload", uploadSingle.array("photos", 100), (req, res) => {
  // rename photos
  const uploadFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const extension = parts[parts.length - 1];
    const newPath = `${path}.${extension}`;
    fs.renameSync(path, newPath);
    uploadFiles.push(newPath.replace("uploads", "").replace("\\", ""));
  }
  res.json(uploadFiles);
});

// places
app.post("/places", (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    addPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeInfo = await Place.create({
      owner: userData.id,
      title,
      address,
      photos: addPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });
    res.json(placeInfo);
  });
});

// get id single place
app.get("/place/:id", async (req, res) => {
  const { id } = req.params;
  const userId = await Place.findById(id);
  res.json(userId);
});

// get user-places
app.get("/user-places", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const { id } = userData;
    const userPlaces = await Place.find({ owner: id });
    res.json(userPlaces);
  });
});

// put places
app.put("/places", async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    addPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeInfo = await Place.findById(id);
    if (userData.id === placeInfo.owner.toString()) {
      placeInfo.set({
        title,
        address,
        photos: addPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      await placeInfo.save();
      res.json("ok");
    }
  });
});

// get places
app.get("/places", async (req, res) => {
  const places = await Place.find();
  res.json(places);
});

// booking one place
app.post("/booking", async (req, res) => {
  const userData = await getUserDataFromRequest(req);
  const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
    req.body;
  Booking.create({
    place,
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    phone,
    price,
    user: userData.id,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/booking", async (req, res) => {
  const userData = await getUserDataFromRequest(req);
  const info = await Booking.find({ user: userData.id }).populate("place");
  res.json(info);
});
app.listen(5000);
