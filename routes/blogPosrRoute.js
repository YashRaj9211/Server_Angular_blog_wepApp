import express from 'express';
import BlogPostController from '../controller/blogPostController.js';

const router = express.Router();

// Example routes
router.post('/post-blog', BlogPostController.createBlogPost);
router.post('/like/:postId', BlogPostController.likeBlogPost);
router.get('/latest', BlogPostController.getLatestBlogPosts);
router.get('/post-by-tag', BlogPostController.getBlogPostsByTags);
router.get('/blogGet/:postId', BlogPostController.getBlogPost);
router.put('/blogUpdate/:postId', BlogPostController.updateBlogPost);
router.get('/blogUser/:userId', BlogPostController.getAllPostsByUser);
router.delete('/blogDelete/:postId', BlogPostController.deleteBlogPost);

export default router;
