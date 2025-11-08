
const Comment = require('./Comment');
const User = require('../user/User');
const Post = require('../post/Post');

module.exports = {
  Query: {
    comments: async () => await Comment.find(),
    comment: async (parent, { id }) => await Comment.findById(id),
  },
  Mutation: {
    createComment: async (parent, { text, post }, context) => {
      if (!context.user) {
        throw new Error('Authentication required. Please login first.');
      }
      const newComment = new Comment({ text, post, author: context.user._id });
      await newComment.save();
      return newComment;
    },
    updateComment: async (parent, { id, text }, context) => {
      if (!context.user) {
        throw new Error('Authentication required. Please login first.');
      }
      const comment = await Comment.findById(id);
      if (!comment) {
        throw new Error('Comment not found');
      }
      // التحقق من أن المستخدم هو صاحب الـ comment
      if (comment.author.toString() !== context.user._id.toString()) {
        throw new Error('You can only update your own comments');
      }
      return await Comment.findByIdAndUpdate(id, { text }, { new: true });
    },
    deleteComment: async (parent, { id }, context) => {
      if (!context.user) {
        throw new Error('Authentication required. Please login first.');
      }
      const comment = await Comment.findById(id);
      if (!comment) {
        throw new Error('Comment not found');
      }
      // التحقق من أن المستخدم هو صاحب الـ comment
      if (comment.author.toString() !== context.user._id.toString()) {
        throw new Error('You can only delete your own comments');
      }
      return await Comment.findByIdAndDelete(id);
    },
  },
  Comment: {
    author: async (parent) => await User.findById(parent.author),
    post: async (parent) => await Post.findById(parent.post),
  },
};
