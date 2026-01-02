const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

exports.register = async (req, res) => {
  try {
    const { email, password, fullName } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate default username from email
    const defaultUsername = email.split('@')[0].toLowerCase().replace(/[^a-z0-9_]/g, '_');
    
    // Check if username already exists, if so append random number
    let username = defaultUsername;
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      username = `${defaultUsername}_${Math.floor(Math.random() * 10000)}`;
    }

    const user = await User.create({
      email,
      password: hashedPassword,
      username: username,
      fullName: fullName || '',
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Return user without password
    const userResponse = {
      _id: user._id,
      email: user.email,
      username: user.username,
      fullName: user.fullName,
      bio: user.bio,
      website: user.website,
      location: user.location,
      profileImage: user.profileImage,
      followers: user.followers,
      following: user.following,
      postsCount: user.postsCount,
      profileViews: user.profileViews,
      totalLikes: user.totalLikes,
      socialLinks: user.socialLinks,
      isVerified: user.isVerified,
      isPrivate: user.isPrivate,
      createdAt: user.createdAt,
    };

    res.status(201).json({
      success: true,
      token,
      user: userResponse,
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Registration failed" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Return user without password
    const userResponse = {
      _id: user._id,
      email: user.email,
      username: user.username,
      fullName: user.fullName,
      bio: user.bio,
      website: user.website,
      location: user.location,
      phone: user.phone,
      pronouns: user.pronouns,
      profileImage: user.profileImage,
      followers: user.followers,
      following: user.following,
      postsCount: user.postsCount,
      profileViews: user.profileViews,
      totalLikes: user.totalLikes,
      socialLinks: user.socialLinks,
      isVerified: user.isVerified,
      isPrivate: user.isPrivate,
      preferences: user.preferences,
      createdAt: user.createdAt,
    };

    res.json({ success: true, token, user: userResponse });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed" });
  }
};
