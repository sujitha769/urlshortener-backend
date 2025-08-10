const express = require("express");
const { nanoid } = require("nanoid");
const validUrl = require("valid-url");
const Url = require("../models/url");

const router = express.Router();

// POST /api/shorten - create short URL
router.post("/shorten", async (req, res) => {
  const { originalUrl } = req.body;

  if (!validUrl.isWebUri(originalUrl)) {
    return res.status(400).json({ error: "Invalid original URL" });
  }

  try {
    // check if it already exists
    let url = await Url.findOne({ originalUrl });
    if (url) {
      return res.json(url);
    }

    const shortId = nanoid(8); // 8 characters
    const newUrl = new Url({ originalUrl, shortId });
    await newUrl.save();

    res.json(newUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /:shortId - redirect to original URL
router.get("/:shortId", async (req, res) => {
  const { shortId } = req.params;

  try {
    const url = await Url.findOne({ shortId });

    if (url) {
      return res.redirect(url.originalUrl);
    } else {
      return res.status(404).json({ error: "URL not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
