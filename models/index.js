//import models....
const Post = require('./Post');
const User = require('./User');
const Comments = require('./Comment');

User.hasMany(Post, {
  foreignKey: 'user_id'
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Comments.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Comments.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'SET NULL'
});

User.hasMany(Comments, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Post.hasMany(Comments, {
  foreignKey: 'post_id'
});

module.exports = { User, Post, Comments };