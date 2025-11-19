const BlogPost = require('../models/BlogPost');

class BlogController {
    async getAllPosts(req, res) {
        try {
            const posts = await BlogPost.find().sort({ createdAt: -1 });
            res.render('blog', { posts });
        } catch (err) {
            console.error(err);
            res.status(500).render('error', { message: 'Error fetching blog posts' });
        }
    }

    async getPostById(req, res) {
        try {
            const post = await BlogPost.findById(req.params.id);
            if (!post) {
                return res.status(404).render('error', { message: 'Post not found' });
            }
            res.render('blogDetail', { post });
        } catch (err) {
            console.error(err);
            res.status(500).render('error', { message: 'Error fetching post' });
        }
    }
}

module.exports = BlogController;