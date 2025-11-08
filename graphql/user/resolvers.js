
const User = require('./User');
const Post = require('../post/Post');
const Comment = require('../comment/Comment');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  Query: {
    users: async () => await User.find(),
    user: async (parent, { id }) => await User.findById(id),
  },
  Mutation: {
    createUser: async (parent, { name, email, password }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('User already exists');
      }
      const newUser = new User({ name, email, password });
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      newUser.password = hashedPassword;
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      newUser.token = token;
      
      await newUser.save();

      return {
        user: newUser,
        token: token,
      };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('Invalid email or password');
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error('Invalid email or password');
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return {
        user: user,
        token: token,
      };
    },
    updateUser: async (parent, { id, name, email }) => {
      return await User.findByIdAndUpdate(id, { name, email }, { new: true });
    },
    deleteUser: async (parent, { id }) => {
      return await User.findByIdAndDelete(id);
    },
  },
  User: {
    posts: async (parent) => await Post.find({ author: parent.id }),
    comments: async (parent) => await Comment.find({ author: parent.id }),
  },
};
