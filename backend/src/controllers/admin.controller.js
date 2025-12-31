const User = require("../models/user.model");
const News = require("../models/news.model");

exports.dashboard = async (req, res) => {
  const users = await User.countDocuments();
  const news = await News.countDocuments();
  res.json({ users, news });
};
