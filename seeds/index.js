const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDb = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const camp = new Campground({
      author: "64f9bf4ed3a1e90558aba514",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic repellendus excepturi, necessitatibus, soluta illo ex explicabo fugiat magnam unde praesentium non debitis consequatur? Magnam distinctio beatae, aut non deleniti ut!",
      price: 20,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dhw65qkcs/image/upload/v1696401565/Yelpcamp/apjo0vc8jkuv1fdoiwyv.jpg",
          filename: "Yelpcamp/ddaluigrq46ojjfag5yd",
        },
      ],
    });
    await camp.save();
  }
};

seedDb().then(() => {
  mongoose.connection.close();
});
