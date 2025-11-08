
const Post = require('./Post');
const User = require('../user/User');
const Comment = require('../comment/Comment');

module.exports = {
  Query: {
    posts: async () => await Post.find(),
    post: async (parent, { id }) => await Post.findById(id),
  },
  Mutation: {
    createPost: async (parent, { title, content }, context) => {
      if (!context.user) {
        throw new Error('Authentication required. Please login first.');
      }
      const newPost = new Post({ title, content, author: context.user._id });
      await newPost.save();
      return newPost;
    },
    updatePost: async (parent, { id, title, content }, context) => {
      if (!context.user) {
        throw new Error('Authentication required. Please login first.');
      }
      const post = await Post.findById(id);
      if (!post) {
        throw new Error('Post not found');
      }
      // التحقق من أن المستخدم هو صاحب الـ post
      if (post.author.toString() !== context.user._id.toString()) {
        throw new Error('You can only update your own posts');
      }
      return await Post.findByIdAndUpdate(id, { title, content }, { new: true });
    },
    deletePost: async (parent, { id }, context) => {
      if (!context.user) {
        throw new Error('Authentication required. Please login first.');
      }
      const post = await Post.findById(id);
      if (!post) {
        throw new Error('Post not found');
      }
      // التحقق من أن المستخدم هو صاحب الـ post
      if (post.author.toString() !== context.user._id.toString()) {
        throw new Error('You can only delete your own posts');
      }
      return await Post.findByIdAndDelete(id);
    },
  },
  Post: {
    author: async (parent) => await User.findById(parent.author),
    comments: async (parent) => await Comment.find({ post: parent.id }),
  },
};
