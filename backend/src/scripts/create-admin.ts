import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import path from 'path';

// Setup env
dotenv.config({ path: path.join(__dirname, '../../.env') });

import { User } from '../models/user.model';
import { UserRole } from '../enums/auth.enum';
import { AccountStatus } from '../enums/auth.enum';

const createAdmin = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('Connected to MongoDB.');

    const adminExists = await User.findOne({ role: UserRole.ADMIN });
    if (adminExists) {
      console.log(`Admin account already exists: ${adminExists.email}`);
      process.exit(0);
    }

    console.log('Creating Admin account...');
    const passwordHash = await bcrypt.hash('Admin@123', 12);
    
    const admin = await User.create({
      firstName: 'System',
      lastName: 'Admin',
      email: 'admin@cuhp.ac.in',
      password: passwordHash,
      role: UserRole.ADMIN,
      accountStatus: AccountStatus.ACTIVE,
      emailVerified: true
    });

    console.log(`Admin created successfully!`);
    console.log(`Email: ${admin.email}`);
    console.log(`Password: Admin@123`);

    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();
