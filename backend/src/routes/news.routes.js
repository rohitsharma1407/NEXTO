// import { Router } from "express";
// import { listNews } from "../controllers/news.controller.js";
// const router = Router();
// router.get("/", listNews);
// export default router;

const express = require("express");
const router = express.Router();
const { getNews, createLocalNews, getMyLocalNews, toggleLike, addComment, getPersonalizedFeed, searchNews } = require("../controllers/news.controller");
const auth = require("../utils/auth.middleware");

// Public routes
router.get("/", getNews);
router.get("/search", searchNews);

// Protected routes (require authentication)
router.get("/personalized", auth, getPersonalizedFeed);
router.post("/local", auth, createLocalNews);
router.get("/my-news", auth, getMyLocalNews);
router.post("/:newsId/like", auth, toggleLike);
router.post("/:newsId/comment", auth, addComment);

// 👇 THIS LINE IS MANDATORY
module.exports = router;

