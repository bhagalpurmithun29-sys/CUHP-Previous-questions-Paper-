import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({path: './.env'});
import { User } from './src/models/user.model';
mongoose.connect(process.env.MONGO_URI as string).then(async () => { 
  const user = await User.findOne({email: 'admin@cuhp.ac.in'});
  if (user) {
    user.password = 'Admin@123';
    // Mongoose pre-save hook will hash it correctly
    await user.save();
    console.log('Password updated and correctly hashed by hook!');
  }
  process.exit(0); 
}).catch(console.error);
