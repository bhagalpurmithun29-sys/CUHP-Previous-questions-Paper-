import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config({ path: path.join(__dirname, '../../.env') });

import { User } from '../models/user.model';
import { Role } from '../models/role.model';
import { Permission } from '../models/permission.model';
import { School } from '../models/school.model';
import { Department } from '../models/department.model';
import { Course } from '../models/course.model';
import { Setting, SettingCategory } from '../models/setting.model';
import { UserRole } from '../enums/auth.enum';

const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('Connected to MongoDB.');

    // Clear existing data
    console.log('Clearing existing data...');
    await Promise.all([
      User.deleteMany({}),
      Role.deleteMany({}),
      Permission.deleteMany({}),
      School.deleteMany({}),
      Department.deleteMany({}),
      Course.deleteMany({}),
      Setting.deleteMany({})
    ]);

    // 1. Seed Permissions
    console.log('Seeding Permissions...');
    const permissionsData = [
      { name: 'VIEW_PAPERS', description: 'Can view question papers', module: 'PAPERS' },
      { name: 'DOWNLOAD_PAPERS', description: 'Can download question papers', module: 'PAPERS' },
      { name: 'UPLOAD_PAPERS', description: 'Can upload question papers', module: 'PAPERS' },
      { name: 'APPROVE_PAPERS', description: 'Can approve or reject question papers', module: 'MODERATION' },
      { name: 'MANAGE_USERS', description: 'Can manage system users', module: 'ADMIN' },
      { name: 'SYSTEM_CONFIG', description: 'Can manage system settings', module: 'ADMIN' }
    ];
    const createdPermissions = await Permission.insertMany(permissionsData);
    const permMap = createdPermissions.reduce((acc: any, p: any) => {
      acc[p.name] = p._id;
      return acc;
    }, {});

    // 2. Seed Roles
    console.log('Seeding Roles...');
    const rolesData = [

      {
        name: 'ADMIN',
        description: 'Administrative access',
        isSystem: true,
        permissions: [
          permMap['VIEW_PAPERS'], permMap['DOWNLOAD_PAPERS'], permMap['UPLOAD_PAPERS'],
          permMap['APPROVE_PAPERS'], permMap['MANAGE_USERS']
        ]
      },
      {
        name: 'MODERATOR',
        description: 'Can moderate content',
        isSystem: true,
        permissions: [permMap['VIEW_PAPERS'], permMap['DOWNLOAD_PAPERS'], permMap['UPLOAD_PAPERS'], permMap['APPROVE_PAPERS']]
      },
      {
        name: 'STUDENT',
        description: 'Standard student access',
        isSystem: true,
        permissions: [permMap['VIEW_PAPERS'], permMap['DOWNLOAD_PAPERS']]
      }
    ];
    const createdRoles = await Role.insertMany(rolesData);
    const roleMap = createdRoles.reduce((acc: any, r: any) => {
      acc[r.name] = r._id;
      return acc;
    }, {});

    // 3. Seed Schools, Departments & Courses
    console.log('Seeding Architecture...');
    const school = await School.create({
      schoolName: 'School of Mathematics, Computers and Information Sciences',
      schoolCode: 'SMCIS',
      description: 'Main school for computer sciences'
    });

    const cseDept = await Department.create({ 
      departmentName: 'Computer Science', 
      departmentCode: 'CSE', 
      schoolId: school._id,
      description: 'Department of Computer Science' 
    });
    
    const mcaCourse = await Course.create({ 
      courseName: 'Master of Computer Applications', 
      courseCode: 'MCA', 
      schoolId: school._id,
      departmentId: cseDept._id, 
      duration: 2, 
      durationUnit: 'Years',
      totalSemesters: 4
    });

    // 4. Seed Users
    console.log('Seeding Users...');
    const passwordHash = await bcrypt.hash('Password@123', 12);
    
    await User.create([

      {
        firstName: 'Normal',
        lastName: 'Admin',
        email: 'admin@cuhp.ac.in',
        password: passwordHash,
        role: UserRole.ADMIN,
        dynamicRoles: [roleMap['ADMIN']],
        status: 'ACTIVE',
        isEmailVerified: true
      },
      {
        firstName: 'John',
        lastName: 'Moderator',
        email: 'moderator@cuhp.ac.in',
        password: passwordHash,
        role: UserRole.MODERATOR,
        dynamicRoles: [roleMap['MODERATOR']],
        status: 'ACTIVE',
        isEmailVerified: true
      },
      {
        firstName: 'Test',
        lastName: 'Student',
        email: 'student@cuhp.ac.in',
        password: passwordHash,
        role: UserRole.STUDENT,
        dynamicRoles: [roleMap['STUDENT']],
        department: cseDept._id,
        course: mcaCourse._id,
        semester: 1,
        status: 'ACTIVE',
        isEmailVerified: true
      }
    ]);

    // 5. Seed Settings
    console.log('Seeding Settings...');
    await Setting.insertMany([
      { key: 'maintenance_mode', value: false, category: SettingCategory.MAINTENANCE, type: 'boolean', description: 'System wide maintenance mode', isPublic: true },
      { key: 'max_upload_size_mb', value: 20, category: SettingCategory.UPLOADS, type: 'number', description: 'Maximum PDF upload size', isPublic: false },
      { key: 'enable_registration', value: true, category: SettingCategory.AUTHENTICATION, type: 'boolean', description: 'Allow new user registrations', isPublic: true },
      { key: 'flag_recommendations', value: true, category: SettingCategory.FEATURE_FLAGS, type: 'boolean', description: 'Enable recommendation engine', isPublic: true },
      { key: 'system_name', value: 'CUHP Question Bank', category: SettingCategory.GENERAL, type: 'string', description: 'Global platform name', isPublic: true }
    ]);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
