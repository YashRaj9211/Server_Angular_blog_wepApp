import express from 'express';
import CommentController from '../controller/commentController.js';

const router = express.Router();
// Example routes

router.post('/', CommentController.createComment);
router.delete('/delete/:commentId', CommentController.deleteComment); 
router.get('/like/:commentId', CommentController.likeComment);
router.get('/postId/:postId', CommentController.getCommentBypostId);
// router.get('/:commentId', CommentController.getComment);
// router.put('/:commentId', CommentController.updateComment);
// router.delete('/:commentId', CommentController.deleteComment);

export default router;
