// import { Router } from "express";
// import { listNews } from "../controllers/news.controller.js";
// const router = Router();
// router.get("/", listNews);
// export default router;

const express = require("express");
const router = express.Router();
const { getNews } = require("../controllers/news.controller");

// MUST be a function
router.get("/", getNews);

// 👇 THIS LINE IS MANDATORY
module.exports = router;

