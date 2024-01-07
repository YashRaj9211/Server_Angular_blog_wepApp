// UserController.js
import Users from '../schema/userSchema.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import "dotenv/config";

const UserController = {
  register: async (req, res) => {
    try {
      const { name, userName, email, password } = req.body;

      const existingUser = await Users.findOne({ userName });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new Users({ name, userName, email, password: hashedPassword });
      await user.save();
      res.status(201).json({ message: 'User added successfully' });
    } catch (error) {
      console.error('Error adding user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  login: async (req, res) => {
    try {
      const { userName, password } = req.body;

      const findExistingUser = await Users.findOne({ userName });
      if (!findExistingUser) {
        return res.status(400).json({ message: 'User do not exists' });
      }

      const isMatch = await bcrypt.compare(password, findExistingUser.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid password' });
      }

      const token = jwt.sign(
        { userId: findExistingUser._id, userName: findExistingUser.userName },
        process.env.JWT_SECERET, 
        { expiresIn: '1h' } 
      );

      // console.log(token);

      res.status(200).json({ message: 'Login successful', token: token});
    } catch (error) {
      console.error('Error login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  getUserProfile: async (req, res) => {
    // Implement logic to get user profile
  },

  saveLiked: async (req, res) => {
    try{
      const article = req.query.param('article');
    }
    catch (error) {
      console.error('Error saving:- ', error);
    }
  }
};


export default UserController;
