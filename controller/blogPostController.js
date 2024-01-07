import BlogPost from '../schema/blogPostSchema.js';
import Users from '../schema/userSchema.js';

const BlogPostController = {
  createBlogPost: async (req, res) => {
    try {
      const { author_id, blog_content, tags } = req.body;
      const blogPost = new BlogPost({ author_id, blog_content, tags });
      await blogPost.save();
      console.log("Successfully")
      res.status(201).json({ message: 'Blog post created successfully', blogPost });
    } catch (error) {
      console.error('Error creating blog post:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  getBlogPost: async (req, res) => {
    try {
      console.log("Get post" + req.params.postId);
      const postId = req.params.postId;
      const blogPost = await BlogPost.findById(postId).populate('author_id', 'userName'); 
      if (!blogPost) {
        return res.status(404).json({ message: 'Blog post not found' });
      }
      res.status(200).json(blogPost);
    } catch (error) {
      console.error('Error getting blog post:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  updateBlogPost: async (req, res) => {
    try {
      const postId = req.params.postId;
      const { blog_content, tags } = req.body;
      const updatedBlogPost = await BlogPost.findByIdAndUpdate(
        postId,
        { blog_content, tags, date_modified: Date.now() },
        { new: true }
      );
      if (!updatedBlogPost) {
        return res.status(404).json({ message: 'Blog post not found' });
      }
      res.status(200).json({ message: 'Blog post updated successfully', updatedBlogPost });
    } catch (error) {
      console.error('Error updating blog post:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  deleteBlogPost: async (req, res) => {
    try {
      const postId = req.params.postId;
      console.log(postId);
      const deletedBlogPost = await BlogPost.findOneAndDelete(postId);

      const findPost = await BlogPost.findById(postId);
      if (!findPost) {
        res.status(200).json({ message: 'Blog post deleted successfully', deletedBlogPost })
      };
    } catch (error) {
      console.error('Error deleting blog post:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  getAllPostsByUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const blogPosts = await BlogPost.find({ author_id: userId });
      res.status(200).json(blogPosts);
    } catch (error) {
      console.error('Error fetching blog posts by user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  getLatestBlogPosts: async (req, res) => {
    try {
      const latestBlogPosts = await BlogPost.find({})
        .populate('author_id', 'userName') // This will get author's userName
        .select('_id blog_content.title author_id date_created tags') // Select specific fields
        .sort({ date_created: -1 })
        .limit(20);
  
      // Prepare the response with desired structure
      const response = latestBlogPosts.map(post => ({
        _id: post._id,
        title: post.blog_content.title,
        authorName: post.author_id.userName,
        authorId: post.author_id._id,
        dateCreated: post.date_created,
        tags: post.tags
      }));
  
      res.status(200).json(response);
    } catch (error) {
      console.error('Error fetching latest blog posts:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  

  getBlogPostsByTags: async (req, res) => {
    try {
      // console.log(req.query.tags);
      const tags = req.query.tags;
      const blogPosts = await BlogPost.find({ tags: `${tags}` });
      res.status(200).json(blogPosts);
    } catch (error) {
      console.error('Error fetching blog posts by tags:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  likeBlogPost: async (req, res) => {
    const postId = req.params.postId;
    const userId = req.body.userId;
    // console.log("Req body: " + JSON.stringify(userId));
    // console.log("User Id: "+userId);
    try {
      const blogPost = await BlogPost.findById(postId);
  
      if (!blogPost) {
        return res.status(404).json({ message: 'Blog post not found' });
      }
      const hasLiked = blogPost.likes.includes(userId);
  
      if (hasLiked) {
        // User already liked, remove like
        blogPost.likes.pull(userId); // Remove the userId from the likes array
        await Users.updateOne({ _id: userId }, { $pull: { liked_articles: postId } });
      } else {
        // Add new like
        blogPost.likes.push(userId); // Add the userId to the likes array
        await Users.updateOne({ _id: userId }, { $push: { liked_articles: postId } });
      }
  
      // Update total_likes to match the length of the likes array
      blogPost.total_likes = blogPost.likes.length;
      await blogPost.save();
  
      res.status(200).json({ message: hasLiked ? 'Like removed' : 'Liked successfully', totalLikes: blogPost.total_likes });
    } catch (error) {
      console.error('Error liking blog post:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }  
};


export default BlogPostController;
