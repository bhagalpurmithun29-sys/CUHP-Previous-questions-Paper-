import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({path: './.env'});
import { User } from './src/models/user.model';
mongoose.connect(process.env.MONGO_URI as string).then(async () => { 
  const user = await User.findOne({email: 'admin@cuhp.ac.in'}).select('+password'); 
  console.log('User found: ', user);
  if(user) {
     const isMatch = await user.matchPassword('Admin@123');
     console.log('Password Match: ', isMatch);
  }
  process.exit(0); 
}).catch(console.error);
