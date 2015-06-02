var express = require('express');
var router = express.Router();

var posts = require('./api/post');

/* Posts routes */
router.route('/posts')
    .post(function(req,res) { posts.addPost(req,res) })
    .get(function(req,res) { posts.getAllPosts(req,res) });

/* Single post routes */
router.route('/posts/:post_id')
    .get(function(req, res) { posts.getSinglePost(req, res, req.params.post_id) })
    .put(function(req, res) { posts.updatePost(req, res, req.params.post_id) })
    .delete(function(req, res) { posts.deletePost(req, res, req.params.post_id) });

module.exports = router;
