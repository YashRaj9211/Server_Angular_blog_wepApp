// UserController.js
import Comment from '../schema/commentSchema.js';
import BlogPost from '../schema/blogPostSchema.js';

const CommentController = {
    createComment: async (req, res) => {
        try {
            const { user_id, blog_id, comment_content } = req.body;
            const comment = new Comment({ user_id, blog_id, comment_content });
            const saveStat = await comment.save();

            if (saveStat) {
                await BlogPost.updateOne({_id: blog_id}, {$push: { comments: saveStat._id }})                
                res.status(200).json(saveStat);
            }

        }
        catch (err) {
            res.status(500).json({ message: "Internal Server Error", error: err.message });
        }
    },

    deleteComment: async (req, res) => {
        try {
            const commentId = req.params.commentId;
            const deletedComment = await Comment.findByIdAndDelete(commentId);

            if (deletedComment) {
                res.status(200).json({ message: "Comment deleted" });
            } else {
                res.status(404).json({ message: "Comment not found" });
            }
        } catch (err) {
            res.status(500).json({ message: "Internal Server Error", error: err });
        }
    },

    likeComment: async (req, res) => {
        try {
            const commentId = req.params.commentId;
            console.log(commentId);
            const comment = await Comment.find(commentId);

            if (comment) {
                comment.comment_likes += 1;
                await comment.save(); // Save the updated comment

                res.status(200).json({ message: "Comment liked", total_like: comment.comment_likes });
            } else {
                res.status(404).json({ message: "Comment not found" });
            }
        } catch (err) {
            res.status(500).json({ message: "Internal Server Error", error: err });
        }
    },

    getCommentBypostId: async(req,res)=>{
        try{
            const postId = req.params.postId;

            const comment = await Comment.find({ blog_id: postId }).populate('user_id', 'userName');


            res.status(200).json(comment);
        }catch(err){
            res.status(500).json({ message: "Internal Server Error", error: err});
        };
    }
};

export default CommentController;
