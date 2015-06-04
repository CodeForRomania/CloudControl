
var Post = require('../../models/post');

module.exports.addPost = function(req, res) {
   res.end();
};

module.exports.getAllPosts = function(req, res) {
    console.log(req.query);

};

module.exports.getSinglePost = function(req, res, id) {
    console.log(req.params);

};

module.exports.updatePost = function(req, res, id) {
    console.log(req.params);

};

module.exports.deletePost = function(req, res, id) {
    console.log(req.params);

};
