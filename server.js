const request = require('request');
const cheerio = require('cheerio');
const axios = require("axios");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();
const url = "https://www.nytimes.com/";

app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });

axios.get("https://www.nytimes.com/").then(function(response) {

  const $ = cheerio.load(response.data);

  const results = [];

  $("p.title").each(function(i, element) {

    const title = $(element).text();

    const link = $(element).children().attr("href");

    results.push({
      title: title,
      link: link
    });
  });


  console.log(results);
});
