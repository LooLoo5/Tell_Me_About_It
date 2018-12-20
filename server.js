const request = require('request');
const cheerio = require('cheerio');

const axios = require("axios");
const mongojs = require("mongojs");

const app = express();
const url = "https://www.nytimes.com/";

// Database configuration
const databaseUrl = "scraper";
const collections = ["scrapedData"];

axios.get("https://old.reddit.com/r/webdev").then(function(response) {

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
